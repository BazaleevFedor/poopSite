export function throttle(func: Function, timeout: number) {
    let timer: any = null;
    return function (this: object) {
        if (timer) return;
        const context = this,
            args = arguments;
        const later = function () {
            func.apply(context, args);
            clearTimeout(timer);
            timer = null;
        };
        timer = window.setTimeout(later, timeout);
    };
}

export let lastTimout: number;
export function debounce(func: Function, timeout: number) {
    let _timeout: number;
    return function (this: object) {
        const context = this,
            args = arguments;
        const later = function () {
            _timeout = -1;
            func.apply(context, args);
        };
        clearTimeout(_timeout);
        _timeout = window.setTimeout(later, timeout);
        lastTimout = _timeout;
    };
}
