import Dispatcher from '../dispatcher/dispatcher';

export const actionFiles = {
    getFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'getFiles',
            options,
        });
    },
};
