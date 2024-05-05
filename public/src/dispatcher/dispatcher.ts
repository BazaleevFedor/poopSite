/**
 * класс, реализующий диспетчер
 */
class Dispatcher {
    private _callbacks: any[];
    private _isDispatching: boolean;
    private _pendingPayload: any;
    /**
     * @constructor
     * конструктор метода
     */
    constructor() {
        this._callbacks = [];
        this._isDispatching = false;
        this._pendingPayload = null;
    }

    /**
     * метод, регистрирующий новый коллбек в диспетчере
     * @param {Function} callback функция-коллбек
     */
    register(callback: any) {
        this._callbacks.push(callback);
    }

    /**
     * метод, удаляющий регистрацию коллбека
     * @param {int} id
     */
    unregister(id: string | number) {
        delete this._callbacks[id];
    }

    /**
     * метод, организующий рассылку
     * @param {Object} payload
     */
    dispatch(payload: { actionName: string; options: any }) {
        if (this._isDispatching) {
            throw new Error('Cannot dispatch in the middle of a dispatch');
        }
        this._isDispatching = true;
        this._pendingPayload = payload;
        try {
            this._callbacks.forEach((callback) => {
                if (callback) {
                    callback(this._pendingPayload);
                }
            });
        } finally {
            this._pendingPayload = null;
            this._isDispatching = false;
        }
    }
}

export default new Dispatcher();
