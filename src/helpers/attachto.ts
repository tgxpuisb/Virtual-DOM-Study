import { VNode, VNodeData } from '../vnode'

export interface AttachData {
    [key: string]: any
    [i: number]: any
    placeholder?: any
    real?: Node
}

interface VNodeDataWithAttach extends VNodeData {
    attachData: AttachData
}

interface VNodeWithAttachData extends VNode {
    data: VNodeDataWithAttach
}

function pre (vnode: VNodeWithAttachData, newVnode: VNodeWithAttachData): void {

}

function post (_: any, vnode: VNodeWithAttachData): void {

}

function destroy (vnode: VNodeWithAttachData): void {

}

function create (_: any, vnode: VNodeWithAttachData): void {

}

export function attachTo (target: Element, vnode: VNode): VNode {
    return vnode
}

export default attachTo