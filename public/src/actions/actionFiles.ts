import Dispatcher from '../dispatcher/dispatcher';

export const actionFiles = {
    getFiles(isNewPage: boolean) {
        Dispatcher.dispatch({
            actionName: 'getFiles',
            options: {
                isNewPage,
            },
        });
    },
    getViewLink(id: string) {
        Dispatcher.dispatch({
            actionName: 'getViewLink',
            options: {
                id,
            },
        });
    },
    getLink(id: string) {
        Dispatcher.dispatch({
            actionName: 'getLink',
            options: {
                id,
            },
        });
    },
    uploadsFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'uploadsFiles',
            options,
        });
    },
    removeFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'removeFiles',
            options,
        });
    },
    downloadFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'downloadFiles',
            options,
        });
    },
};
