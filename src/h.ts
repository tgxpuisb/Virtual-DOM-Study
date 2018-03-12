import {
    vnode, VNode, VNodeData
} from './vnode'

export type VNodes = Array<VNode>
export type VNodeChildElement = VNode | string | number | undefined | null
export type ArrayOrElement<T> = T | T[]
export type VNodeChildren = ArrayOrElement<VNodeChildElement>

import * as is from './is'

function addNS () {}

function h () {}

export default h