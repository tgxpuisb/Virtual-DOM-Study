import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

export type Dataset = Record<string, string>

const CAPS_REGEX = /[A-Z]/g

function updateDataset (oldVnode: VNode, vnode: VNode): void {

}

export const datasetModule = {
    create: updateDataset,
    update: updateDataset
} as Module
export default datasetModule