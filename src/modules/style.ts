import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

export type VNodeStyle = Record<string, string> & {
    delayed?: Record<string, string>
    remove?: Record<string, string>
}

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout
var nextFrame = function (fn: any) {
    raf(function(){
        raf(fn)
    })
}

function setNextFrame (obj: any, prop: string, val: any): void {
    nextFrame(function () {
        obj[prop] = val
    })
}

function updateStyle (oldVnode: VNode, vnode: VNode): void {

}

function applyDestroyStyle (vnode: VNode): void {

}

function applyRemoveStyle (vnode: VNode, rm: () => void): void {

}

export const styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: updateStyle,
    remove: applyRemoveStyle
} as Module
export default styleModule