import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

export type Classes = Record<string, boolean>

function updateClass (oldVnode: VNode, vnode: VNode): void {

}

export const classModule = {
    create: updateClass,
    update: updateClass
} as Module
export default classModule
