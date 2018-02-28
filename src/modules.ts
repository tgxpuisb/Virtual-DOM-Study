export type Props = Record<string, any> // 构造一个类型为String属性为any的类型
export type Attrs = Record<string, string | number | boolean>
export type Classes = Record<string, boolean>
export type VNodeStyle = Record<string, string> & {
    delayed?: Record<string, string>,
    remove?: Record<string, string>
}
export type Dataset = Record<string, string>


export type Key = string | number