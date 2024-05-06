import Dispatcher from '../dispatcher/dispatcher';

export const actionGoogle = {
    getGoogleLink() {
        Dispatcher.dispatch({
            actionName: 'getGoogleLink',
            options: null,
        });
    },
    sendGoogleToken(code: string) {
        Dispatcher.dispatch({
            actionName: 'sendGoogleToken',
            options: { code },
        });
    },
};
