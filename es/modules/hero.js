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
export var heroModule = {
    pre: pre,
    create: create,
    destroy: destroy,
    post: post
};
export default heroModule;
//# sourceMappingURL=hero.js.map