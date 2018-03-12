var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) {
    raf(function () {
        raf(fn);
    });
};
function setNextFrame(obj, prop, val) {
    nextFrame(function () {
        obj[prop] = val;
    });
}
function updateStyle(oldVnode, vnode) {
}
function applyDestroyStyle(vnode) {
}
function applyRemoveStyle(vnode, rm) {
}
export var styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: updateStyle,
    remove: applyRemoveStyle
};
export default styleModule;
//# sourceMappingURL=style.js.map