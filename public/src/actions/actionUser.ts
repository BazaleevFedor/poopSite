import Dispatcher from '../dispatcher/dispatcher';

export const actionUser = {
    signIn(options: { username: string; password: string }) {
        Dispatcher.dispatch({
            actionName: 'signIn',
            options,
        });
    },
    getUsername() {
        Dispatcher.dispatch({
            actionName: 'getUsername',
            options: null,
        });
    },
    signUp(options: { username: string; password: string }) {
        Dispatcher.dispatch({
            actionName: 'signUp',
            options,
        });
    },
    signOut() {
        Dispatcher.dispatch({
            actionName: 'signOut',
            options: null,
        });
    },
};
