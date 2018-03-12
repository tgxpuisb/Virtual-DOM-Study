import { PreHook, CreateHook, UpdateHook, DestoryHook, RemoveHook, PostHook } from '../hooks';
export interface Module {
    pre: PreHook;
    create: CreateHook;
    update: UpdateHook;
    destroy: DestoryHook;
    remove: RemoveHook;
    post: PostHook;
}
