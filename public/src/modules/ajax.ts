const apiUrls = {
    FILES_GET: '/files',
    FOLDER_GET: '/folder',
    FILES_VIEW_LINK: '/get-view-link',
    FILES_LINK: '/get-share-link',
    FILES_UPLOAD: '/upload',
    FILES_REMOVE: '/del-files',
    FILES_DOWNLOAD: '/downloadFile',

    USER_SIGN_IN: '/api/sign-in',
    USER_GET_NAME: '/api/get-username',
    USER_SIGN_UP: '/sign-up',
    USER_SIGN_OUT: '/api/',

    GOOGLE_GET_LINK: '/add-account',
    GOOGLE_SEND_LINK: '/Callback',
} as const;

const RequestType = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
} as const;

class Ajax {
    private readonly backendUrl: string;

    constructor() {
        this.backendUrl = process.env.IS_DEVELOPMENT ? 'http://45.14.165.46:8080' : 'https://a97b-45-14-165-46.ngrok-free.app'
    }

    _request(apiUrlType: string, requestType: string, body?: string | FormData) {
        const requestUrl = this.backendUrl + apiUrlType;

        const headers = {
        };

        if (apiUrlType !== apiUrls.FILES_UPLOAD) {
            headers['Content-Type'] = 'application/json';
        }

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

    async getFiles(options: { searchQuery: string; nextPageToken: string; pageSize: string; sortOrder: string; nextOwnerIndex: string; parentFolder: string }) {
        try {
            const response = await this._request(apiUrls.FILES_GET, RequestType.POST, JSON.stringify(options));

            const data = await response.json();
            return data || null;
        } catch (e) {
            return null;
        }
    }

    async getFolder(options: { searchQuery: string; nextPageToken: string; pageSize: string; sortOrder: string; nextOwnerIndex: string; parentFolder: string }) {
        try {
            const response = await this._request(apiUrls.FOLDER_GET, RequestType.POST, JSON.stringify(options));

            const data = await response.json();
            return data || null;
        } catch (e) {
            return null;
        }
    }

    async uploadsFiles(options: any, owner: string, id: string) {
        const formData = new FormData();
        formData.append('files', options);

        if (owner) formData.append('owner', owner);
        if (id) formData.append('fileId', id);

        try {
            const response = await this._request(apiUrls.FILES_UPLOAD, RequestType.POST, formData);

            const data = await response.json();
            return data || null;
        } catch (e) {
            return null;
        }
    }

    async removeFiles(options: any) {
        try {
            const response = await this._request(apiUrls.FILES_REMOVE, RequestType.DELETE, JSON.stringify(options));

            const data = await response.json();
            return data || null;
        } catch (e) {
            return null;
        }
    }

    async downloadFiles(options: any) {
        try {
            const response = await this._request(apiUrls.FILES_DOWNLOAD, RequestType.POST, JSON.stringify(options));

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = options.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            return response.ok;
        } catch (e) {
            return null;
        }
    }

    async getViewLink(options: { id: string }) {
        try {
            const response = await this._request(apiUrls.FILES_VIEW_LINK, RequestType.POST, JSON.stringify(options));

            const data = await response.json();
            return data || null;
        } catch (e) {
            return null;
        }
    }

    async getLink(options: { id: string; owner: string }) {
        try {
            const response = await this._request(apiUrls.FILES_LINK, RequestType.POST, JSON.stringify(options));

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
