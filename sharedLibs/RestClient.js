const axios = require('axios')

class RestClient {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl
    }

    request(...args) {
        const { path } = args
        axios({ url: `${this.baseUrl}${path}`, ...args })
    }

    get(path, ...args) {
        return axios.get(`${this.baseUrl}${path}`, ...args)
    }

    post(path, ...args) {
        return axios.post(`${this.baseUrl}${path}`, ...args)
    }

    put(path, ...args) {
        return axios.put(`${this.baseUrl}${path}`, ...args)
    }

    patch(path, ...args) {
        return axios.patch(`${this.baseUrl}${path}`, ...args)
    }

    remove(path, ...args) {
        return axios.delete(`${this.baseUrl}${path}`, ...args)
    }
}

module.exports = RestClient
