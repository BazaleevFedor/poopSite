import Dispatcher from '../dispatcher/dispatcher';

export const actionFiles = {
    getFiles(isNewPage: boolean, searchQuery: string = undefined, sortOrder: string = undefined, parentFolder: string = undefined) {
        Dispatcher.dispatch({
            actionName: 'getFiles',
            options: {
                isNewPage,
                searchQuery,
                sortOrder,
                parentFolder,
            },
        });
    },
    removeFiles(options: any) {
        Dispatcher.dispatch({
            actionName: 'removeFiles',
            options,
        });
    },
};
