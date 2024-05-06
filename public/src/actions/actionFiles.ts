import Dispatcher from '../dispatcher/dispatcher';

export const actionFiles = {
    getFiles() {
        Dispatcher.dispatch({
            actionName: 'getFiles',
            options: null,
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
