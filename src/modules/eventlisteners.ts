import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

export type On = {
    [N in keyof HTMLElementEventMap]?: (ev: HTMLElementEventMap[N]) => void
} & {
    [event: string]: EventListener
}
function invokeHandler (handler: any, vnode?: VNode, event?: Event): void {

}

function handleEvent (event: Event, vnode: VNode) {}

function createListener () {}

function updateEventListeners (oldVnode: VNode, vnode?: VNode): void {

}

export const eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
} as Module
export default eventListenersModule