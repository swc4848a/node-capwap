import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = ''

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        // authStore.logout()
    }
    return err
};

const responseBody = res => res.body

const requests = {
    get: url =>
        superagent
        .get(`${API_ROOT}${url}`)
        .end(handleErrors)
        .then(responseBody)
}

const Options = {
    all: () =>
        requests.get(`/Timezone`)
}

export default {
    Options
}