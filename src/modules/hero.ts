import { VNode, VNodeData } from '../vnode'
import { Module } from './module'

export type Hero = { id: string }

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout
var nextFrame = function (fn: any) {
    raf(function(){
        raf(fn)
    })
}

function setNextFrame (obj: any, prop: string, val: any): void {

}

function getTextNodeRect (textNode: Text): ClientRect | undefined {
    var rect: ClientRect | undefined
    return rect
}

function calcTransformOrigin (isTextNode: boolean, textRect: ClientRect | undefined, boundingRect: ClientRect): string {
    return ''
}

function getTextDx (oldTextRect: ClientRect | undefined, newTextRect: ClientRect | undefined): number {
    return 0
}

function getTextDy (oldTextRect: ClientRect | undefined, newTextRect: ClientRect | undefined): number {
    return 0
}

function isTextElement (elm: Element | Text): elm is Text {
    return true
}

var removed: any, created: any

function pre () {
    removed = {}
    created = []
}

function create (oldVnode: VNode, vnode: VNode): void {

}

function destroy (vnode: VNode): void {

}

function post () {}

export const heroModule = {
    pre,
    create,
    destroy,
    post
} as Module
export default heroModule