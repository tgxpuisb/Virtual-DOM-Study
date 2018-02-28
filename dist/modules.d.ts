export declare type Props = Record<string, any>;
export declare type Attrs = Record<string, string | number | boolean>;
export declare type Classes = Record<string, boolean>;
export declare type VNodeStyle = Record<string, string> & {
    delayed?: Record<string, string>;
    remove?: Record<string, string>;
};
export declare type Dataset = Record<string, string>;
export declare type Key = string | number;
