import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

export type Props = Record<string, any>

function updateProps (oldVnode: VNode, vnode: VNode): void {

}

export const propsModule = {
    create: updateProps,
    update: updateProps
} as Module
export default propsModule