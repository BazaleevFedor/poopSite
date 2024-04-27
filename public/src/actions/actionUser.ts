import Dispatcher from "../dispatcher/dispatcher";

export const actionUser = {
    signIn(options: { login: string, password: string }) {
        Dispatcher.dispatch({
            actionName: 'signIn',
            options,
        });
    },
};
