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