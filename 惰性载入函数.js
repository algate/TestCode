// 惰性单例
let getSingle = function(fn) {
    let result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

// eg:
let bindEvent = getSingle(function() {
    document.querySelector('div').onclick = function() {
        alert('click');
    }
    return true;
});
let render = function () {
    console.log(开始渲染列表);
    bindEvent();
}
render();render();render();
// 解释：render和bindEvent函数都分别执行了3次，但div实际上只被绑定了一次事件。


// 函数的缺点是每次调用addEvent都会执行里边的if条件分支
let addEvent = function(elem, type, handle) {
    if (window.addEventListener) {
        return elem.addEventListener(type, handle, false);
    } else if (window.attachEvent) {
        return elem.attachEvent('on' + type, handle);
    }
};
// 自执行函数进如页面方法执行了一次。如果没用到此方法就显示的多余了；
addEvent = (function() {
    console.log(1);
    if (window.addEventListener) {
        return function(elem, type, handle) {
            elem.addEventListener(type, handle, false);
        }
    } else if (window.attachEvent) {
        return function(elem, type, handle) {
            elem.attachEvent('on' + type, handle);
        }
    }
})();
// 不自执行方法 —— 惰性载入函数方案
addEvent = function(elem, type, handle) {
    if (window.addEventListener) {
        addEvent = function(elem, type, handle) {
            elem.addEventListener(type, handle, false);
        }
    } else if (window.attachEvent) {
        addEvent = function(elem, type, handle) {
            elem.attachEvent('on' + type, handle);
        }
    }
    addEvent(elem, type, handle);
};
