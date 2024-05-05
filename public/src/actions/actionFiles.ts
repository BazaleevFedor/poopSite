import Dispatcher from '../dispatcher/dispatcher';

export const actionFiles = {
    getFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'getFiles',
            options,
        });
    },
    addFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'addFiles',
            options,
        });
    },
    removeFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'removeFiles',
            options,
        });
    },
};
