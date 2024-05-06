import Dispatcher from '../dispatcher/dispatcher';

export const actionFiles = {
    getFiles(searchQuery: string = undefined, nextPageToken: string = undefined, parentFolder: string = undefined, pageSize: string = undefined, sortOrder: string = undefined, owner: string = undefined) {
        Dispatcher.dispatch({
            actionName: 'getFiles',
            options: {
                searchQuery,
                nextPageToken,
                parentFolder,
                pageSize,
                sortOrder,
                owner,
            },
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
