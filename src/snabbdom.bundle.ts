import { init } from './snabbdom'
import { attributesModule } from './modules/attributes' // 管理dom的属性
import { classModule } from './modules/class' // 管理dom的class=""
import { propsModule } from './modules/props' // 设置元素属性
import { styleModule } from './modules/style' // 管理style
import { eventListenersModule } from './modules/eventlisteners' // 绑定事件
import { h } from './h'

const patch = init([
    attributesModule,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule
]) as (oldVNode: any, vnode: any) => any

export const snabbdomBundle = {
    patch,
    h: h as any
}

export default snabbdomBundle
