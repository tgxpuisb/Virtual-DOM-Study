"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key;
    if (data === undefined) {
        key = undefined;
    }
    else {
        key = data.key;
    }
    return {
        sel: sel,
        data: data,
        children: children,
        text: text,
        elm: elm,
        key: key
    };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map