export class Api {
    constructor(options) {
        const { baseUrl, headers } = options;
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._headers
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    addCard({ name, link }) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {
            headers: this._headers
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }

    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about })
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
            }
            return res.json();
        });
    }
}