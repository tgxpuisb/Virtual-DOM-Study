// 入口文件
import { Module } from './modules/module'
import { Hooks } from './hooks'
import vnode, { VNode, VNodeData, Key } from './vnode'
import * as is from './is'
import htmlDomApi, { DOMAPI } from './htmldomapi'

function isUndef (s: any): boolean {
    return s === undefined
}

function isDef (s: any): boolean {
    return s !== undefined
}

type VNodeQueue = Array<VNode>

const emptyNode = vnode('', {}, [], undefined, undefined)

function sameVnode (vnode1: VNode, vnode2: VNode): boolean {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}

function isVnode (vnode: any): vnode is VNode {
    return vnode.sel !== undefined
}

type KeyToIndexMap = {[key: string]: number}

type ArraysOf<T> = {
    [K in keyof T]: (T[K])[]
}

type ModuleHooks = ArraysOf<Module>

function createKeyToOldIdx (children: Array<VNode>, beginIdx: number, endIdx: number): KeyToIndexMap {
    let i: number, map: KeyToIndexMap = {}, key: Key | undefined, ch
    for (i = beginIdx; i <= endIdx; i++) {
        ch = children[i]
        if (ch != null) {
            key = ch.key
            if (key !== undefined) {
                map[key] = i
            }
        }
    }
    return map
}

const hooks: (keyof Module)[] = ['create', 'update', 'remove', 'destroy', 'pre', 'post']

export { h } from './h'
export { thunk } from './thunk'

export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI): (oldVNode: any, vnode: any) => any {
    let i: number, j: number, cbs = ({} as ModuleHooks)

    const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi // 这个设计真巧妙, 为weex和今后的可能用其他方式操作dom的api提供了机会,不再局限于浏览器中的dom

    // 把module的钩子储存起来,然后在适当的时候调用钩子
    for (i = 0; i < hooks.length; i++) {
        cbs[hooks[i]] = []
        for (j = 0; j < modules.length; j++) {
            const hook = modules[j][hooks[i]]
            if (hook !== undefined) {
                (cbs[hooks[i]] as Array<any>).push(hook)
            }
        }
    }

    // 把一个真实节点转化成vnode
    function emptyNodeAt(elm: Element) {
        const id = elm.id ? '#' + elm.id : ''
        const c = elm.className ? '.' + elm.className.split(' ').join('.') : ''
        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm)
    }

    // 所有的remove钩子触发完之后才会移除节点
    function createRmCb (childElm: Node, listeners: number) {
        return function rmCb () {
            if (--listeners === 0) {
                const parent = api.parentNode(childElm)
                api.removeChild(parent, childElm)
            }
        }
    }

    // 创建元素
    function createElm (vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
        let i: any, data = vnode.data
        if (data !== undefined/*小tips 知道这里为什么不写isDef(data)么?因为TS*/) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                // 判断isDef的同时还把i赋值了 触发init钩子
                i(vnode)
                data = vnode.data
            }
        }
        let children = vnode.children, sel = vnode.sel
        if (sel === '!') {
            // 注释
            if (isUndef(vnode.text)) {
                vnode.text = ''
            }
            vnode.elm = api.createComment(vnode.text as string)
        } else if (sel !== undefined) {
            // 解析 selector
            const hashIdx = sel.indexOf('#')
            const dotIdx = sel.indexOf('.', hashIdx)
            // 获取#排序
            const hash = hashIdx > 0 ? hashIdx : sel.length
            // 获取.排序
            const dot = dotIdx > 0 ? dotIdx : sel.length
            // 获取标签
            const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel
            const elm = vnode.elm = isDef(data) && isDef(i = (data as VNodeData).ns) ? api.createElementNS(i, tag) : api.createElement(tag)

            if (hash < dot) {
                elm.setAttribute('id', sel.slice(hash + 1 + dot))
            }
            if (dotIdx > 0) {
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '))
            }
            // 触发create钩子
            for (i = 0; i < cbs.create.length; i++) {
                cbs.create[i](emptyNode, vnode)
            }
            if (is.array(children)) {
                // 如果有children则递归调用生成元素
                for (i = 0; i < children.length; i++) {
                    const ch = children[i]
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue))
                    }
                }
            } else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text))
            }

            i = (vnode.data as VNodeData).hook //调用create钩子
            if (isDef(i)) {
                if (i.create) {
                    i.create(emptyNode, vnode)
                }
                if (i.insert) {
                    insertedVnodeQueue.push(vnode)
                }
            } else {
                vnode.elm = api.createTextNode(vnode.text as string)
            }
            return vnode.elm
        }
    }

    // 添加一个节点
    function addVnodes (
        parentElm: Node,
        before: Node | null,
        vnodes: Array<VNode>,
        startIdx: number,
        endIdx: number,
        insertedVnodeQueue: VNodeQueue
    ) {
        for (; startIdx <= endIdx; startIdx++) {
            const ch = vnodes[startIdx]
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before)
            }
        }
    }

    // 销毁一个node
    function invokeDestroyHook (vnode: VNode) {
        let i: any, j: number, data = vnode.data
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy)) {
                i(vnode)
            }
            for (i = 0; i < cbs.destroy.length; i++) {
                cbs.destroy[i](vnode)
            }
            // 递归销毁节点
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; j++) {
                    i = vnode.children[j]
                    if (i != null && typeof i !== 'string') {
                        invokeDestroyHook(i)
                    }
                }
            }
        }
    }

    // 移除nodes
    function removeVnodes (
        parentElm: Node,
        vnodes: Array<VNode>,
        startIdx: number,
        endIdx: number
    ): void {
        for (; startIdx <= endIdx; startIdx++) {
            let i: any, listeners: number, rm: () => void, ch = vnodes[startIdx]
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch)
                    listeners = cbs.remove.length + 1
                    rm = createRmCb(ch.elm as Node, listeners)
                    for (i = 0; i < cbs.remove.length; i++) {
                        cbs.remove[i](ch, rm)
                    }
                    if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
                        i(ch, rm)
                    } else {
                        rm()
                    }
                } else {
                    // 文本节点
                    api.removeChild(parentElm, ch.elm as Node)
                }
            }
        }
    }

    // 通过key的形式来更新子节点,更新子节点算法
    function updateChildren (
        parentElm: Node,
        oldCh: Array<VNode>,
        newCh: Array<VNode>,
        insertedVnodeQueue: VNodeQueue
    ) {}

    // 节点相似之后的对比
    function patchVnode (oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
        let i: any, hook: any
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode)
        }
        const elm = vnode.elm = (oldVnode.elm as Node)
        let oldCh = oldVnode.children
        let ch = vnode.children
        if (oldVnode === vnode) {
            return
        }

        if (vnode.data !== undefined) {
            // 调用update钩子
            for (i = 0; i < cbs.update.length; i++) {
                cbs.update[i](oldVnode, vnode)
            }
            i = vnode.data.hook
            if (isDef(i) && isDef(i = i.update)) {
                i(oldVnode, vnode)
            }
        }

        // 比较子节点
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch) {
                    updateChildren(elm, oldCh as Array<VNode>, ch as Array<VNode>, insertedVnodeQueue)
                }
            } else if (isDef(ch)) {
                if (isDef(oldVnode.text)) {
                    api.setTextContent(elm, '')
                }
                addVnodes(elm, null, ch as Array<VNode>, 0, (ch as Array<VNode>).length - 1, insertedVnodeQueue)
            } else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh as Array<VNode>, 0, (ch as Array<VNode>).length - 1)
            } else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '')
            }
        } else if (oldVnode.text !== vnode.text) {
            // 比较文本节点
            api.setTextContent(elm, vnode.text as string)
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode)
        }
    }

    return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {
        let i: number, elm: Node, parent: Node
        const insertedVnodeQueue: VNodeQueue = []
        for (i = 0; i < cbs.pre.length; i++) {
            cbs.pre[i]()
        }

        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode)
        }

        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue)
        } else {
            elm = oldVnode.elm as Node
            parent = api.parentNode(elm)

            createElm(vnode, insertedVnodeQueue)

            if (parent !== null) {
                api.insertBefore(parent, vnode.elm as Node, api.nextSibling(elm))
                removeVnodes(parent, [oldVnode], 0, 0)
            }
        }

        for (i = 0; i < insertedVnodeQueue.length; i++) {
            (((insertedVnodeQueue[i].data as VNodeData).hook as Hooks).insert as any)(insertedVnodeQueue[i])
        }

        for (i = 0; i < cbs.post.length; i++) {
            cbs.post[i]()
        }

        return vnode
    }
}