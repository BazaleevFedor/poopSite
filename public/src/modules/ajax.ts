const apiUrls = {
    FILES_GET: '/api/',
    FILES_ADD: '/api/',
    FILES_REMOVE: '/api/',

    USER_SIGN_IN: '/api/',
    USER_SIGN_UP: '/api/',
    USER_SIGN_OUT: '/api/',

    USER_ADD_GOOGLE: '/api/',
} as const;

const requestType = {
    GET: 'GET',
    POST: 'POST',
} as const;

class Ajax {
    private _backendHostname: string;
    private _backendPort: string;
    private _backendUrl: string;

    constructor() {
        this._backendHostname = 'localhost';
        this._backendPort = '8080';
        this._backendUrl = 'http://' + this._backendHostname + ':' + this._backendPort;
    }

    _request(apiUrlType: string, requestType: string, body?: string) {
        const requestUrl = this._backendUrl + apiUrlType;

        return fetch(requestUrl, {
            method: requestType,
            mode: "cors",
            credentials: "include",
            headers: {
                'X-Csrf-Token': localStorage.getItem('X-Csrf-Token'),
            },
            body,
        });
    }

    async signIn({ login, password }) {
        try {
            const response = await this._request(apiUrls.USER_SIGN_IN, requestType.POST, JSON.stringify({
                login,
                password
            }));

            const csrfToken = response.headers.get('X-Csrf-Token');
            if (csrfToken) localStorage.setItem('X-Csrf-Token', csrfToken);

            return response.status === 200;
        } catch (e) {
            return false;
        }
    }

    async getFiles() {
        return false;
    }
}

export default new Ajax();
