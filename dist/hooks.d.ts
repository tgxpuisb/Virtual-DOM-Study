import { VNode } from './vnode';
export declare type PreHook = () => any;
export declare type InitHook = (vNode: VNode) => any;
export declare type CreateHook = (emptyVNode: VNode, vNode: VNode) => any;
export declare type InsertHook = (vNode: VNode) => any;
export declare type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any;
export declare type UpdateHook = (oldVNode: VNode, vNode: VNode) => any;
export declare type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any;
export declare type DestoryHook = (vNode: VNode) => any;
export declare type RemoveHook = (vNode: VNode, removeCallback: () => void) => any;
export declare type PostHook = () => any;
export interface Hooks {
    pre?: PreHook;
    init?: InitHook;
    create?: CreateHook;
    insert?: InsertHook;
    prepatch?: PrePatchHook;
    update?: UpdateHook;
    postpatch?: PostPatchHook;
    destory?: DestoryHook;
    remove?: RemoveHook;
    post?: PostHook;
}
