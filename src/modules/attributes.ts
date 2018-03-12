import {
    VNode, VNodeData
} from '../vnode'
import { Module } from './module'

export type Attrs = Record<string, string | number | boolean>

const xlinkNS = 'http://www.w3.org/1999/xlink'
const xmlNS = 'http://www.w3.org/XML/1998/namespace'
const colonChar = 58
const xChar = 120

function updateAttrs (oldVnode: VNode, vnode: VNode): void {

}

export const attributesModule = {
    create: updateAttrs,
    update: updateAttrs
} as Module
