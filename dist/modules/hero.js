"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) {
    raf(function () {
        raf(fn);
    });
};
function setNextFrame(obj, prop, val) {
}
function getTextNodeRect(textNode) {
    var rect;
    return rect;
}
function calcTransformOrigin(isTextNode, textRect, boundingRect) {
    return '';
}
function getTextDx(oldTextRect, newTextRect) {
    return 0;
}
function getTextDy(oldTextRect, newTextRect) {
    return 0;
}
function isTextElement(elm) {
    return true;
}
var removed, created;
function pre() {
    removed = {};
    created = [];
}
function create(oldVnode, vnode) {
}
function destroy(vnode) {
}
function post() { }
exports.heroModule = {
    pre: pre,
    create: create,
    destroy: destroy,
    post: post
};
exports.default = exports.heroModule;
//# sourceMappingURL=hero.js.map