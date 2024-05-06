const apiUrls = {
    FILES_GET: '/files',
    FILES_ADD: '/api/',
    FILES_REMOVE: '/api/',

    USER_SIGN_IN: '/sign-in',
    USER_GET_NAME: '/get-username',
    USER_SIGN_UP: '/sign-up',
    USER_SIGN_OUT: '/api/', // ToDo

    GOOGLE_GET_LINK: '/add-account',
    GOOGLE_SEND_LINK: '/Callback',
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

        const headers = {
            'Content-Type': 'application/json',
        };

        if (localStorage.getItem('jwtToken')) {
            headers['Authorization'] = `Bearer ${ localStorage.getItem('jwtToken') }`;
        }

        return fetch(requestUrl, {
            method: requestType,
            mode: 'cors',
            headers,
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

    async getFiles(options: { searchQuery: string; nextPageToken: string; parentFolder: string; pageSize: string; sortOrder: string; owner: string }) {
        // return [{name: 'awd1', id: 1}, {name: 'awd2', id: 2}, {name: 'awd3', id: 3}, {name: 'awd4', id: 4}, {name: 'awd5', id: 5}, {name: 'awd6', id: 6}, {name: 'awd7', id: 7}, {name: 'awd8', id: 8}];
        try {
            const response = await this._request(apiUrls.FILES_GET, RequestType.POST, JSON.stringify(options));

            const data = await response.json();
            return data || null;
        } catch (e) {
            return null;
        }
    }

    async getGoogleLink() {
        try {
            const response = await this._request(apiUrls.GOOGLE_GET_LINK, RequestType.GET);
            const data = await response.json();
            return data?.url || null;
        } catch (e) {
            return null;
        }
    }

    async sendGoogleToken({ code }) {
        try {
            const response = await this._request(apiUrls.GOOGLE_SEND_LINK + `?code=${code}`, RequestType.GET);
            return response.status === 200;
        } catch (e) {
            return null;
        }
    }
}

export default new Ajax();
