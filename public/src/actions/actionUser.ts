import Dispatcher from '../dispatcher/dispatcher';

export const actionUser = {
    signIn(options: { username: string; password: string }) {
        Dispatcher.dispatch({
            actionName: 'signIn',
            options,
        });
    },
    signUp(options: { username: string; password: string }) {
        Dispatcher.dispatch({
            actionName: 'signUp',
            options,
        });
    },
    signOut(options: { username: string; password: string }) {
        Dispatcher.dispatch({
            actionName: 'signOut',
            options,
        });
    },
};
