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
