const apiUrls = {
    FILES_GET: '/api/',
    FILES_ADD: '/api/',
    FILES_REMOVE: '/api/',

    USER_SIGN_IN: '/sign-in',
    USER_GET_NAME: '/get-username',
    USER_SIGN_UP: '/sign-up',
    USER_SIGN_OUT: '/api/',

    USER_ADD_GOOGLE: '/api/',
} as const;

const RequestType = {
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
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            },
            body,
        });
    }

    async signIn({ username, password }) {
        try {
            const response = await this._request(apiUrls.USER_SIGN_IN, RequestType.POST, JSON.stringify({
                username,
                password
            }));

            const data = await response.json();
            if (data.jwtToken) localStorage.setItem('jwtToken', data.jwtToken);

            return response.status === 200;
        } catch (e) {
            return false;
        }
    }

    async getUsername() {
        try {
            const response = await this._request(apiUrls.USER_GET_NAME, RequestType.GET);
            const data = await response.json();

            return data?.username;
        } catch (e) {
            return null;
        }
    }

    async signUp({ username, password }) {
        try {
            const response = await this._request(apiUrls.USER_SIGN_UP, RequestType.POST, JSON.stringify({
                username,
                password
            }));

            const data = await response.json();
            if (data.jwtToken) localStorage.setItem('jwtToken', data.jwtToken);

            return response.status === 200;
        } catch (e) {
            return false;
        }
    }

    async getFiles() {
        return [{name: 'awd', id: 1}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    }
}

export default new Ajax();
