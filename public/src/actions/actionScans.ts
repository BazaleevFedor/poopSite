import Dispatcher from '../dispatcher/dispatcher';

export const actionScans = {
    getScans() {
        Dispatcher.dispatch({
            actionName: 'getScans',
            options: null,
        });
    },
    getViewLink(id: string) {
        Dispatcher.dispatch({
            actionName: 'getViewLinkScan',
            options: {
                id,
            },
        });
    },
};
