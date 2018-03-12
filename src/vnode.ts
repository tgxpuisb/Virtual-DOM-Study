import {
    Props,
    Key,
    Attrs,
    Classes,
    VNodeStyle,
    Dataset
} from './modules'


export interface VNode {
    sel: string | undefined
    data: VNodeData | undefined
    children: Array<VNode | string> | undefined
    elm: Node | undefined
    text: string | undefined
    key: Key | undefined
}

export interface VNodeData {
    props?: Props
    attrs?: Attrs
    class?: Classes
    style?: VNodeStyle
    dataset?: Dataset
    [key: string]: any
}

export function vnode (
    sel: string | undefined,
    data: any | undefined,
    children: Array<VNode | string> | undefined,
    text: string | undefined,
    elm: Element | Text | undefined 
): VNode {
    let key: Key | undefined
    if (data === undefined) {
        key = undefined
    } else {
        key = data.key
    }
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}

export default vnode