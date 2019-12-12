import _         from 'lodash'
import axios     from 'axios'
import Bluebird  from 'bluebird'
import config    from './config'
import Store     from './store'


let SERVER = config

let configAxios = {
    'FORM': {
        'headers': { 'Content-Type': 'application/x-www-form-urlencoded'}
    },
    'BLOB': {
        'responseType': 'blob' 
    },
    'JSON': {
        'headers': { 'Content-Type': 'application/json;charset=utf-8'}
    },
    'FORMDATA' : {
        'headers': { 'Content-Type': 'multipart/form-data'}
    }
}

const VERBS_HTTP = 'put post get delete'
    .split(' ')

    const encodeFuncs = {
        urlSearch: params => {
            let newParams = new URLSearchParams()
            for (var key in params)
                newParams.append(key, params[key])
            return newParams
        },
    
        getByUrl: params => ({
            'params': params
        }),
    
        formData: params => {
            let formData = new FormData()
            _.forEach(params, (value, key) => formData.append(key, value))
            return formData
        },
        raw: params => params
    }

    const factoryClaim = (method) => {
        let defaultEncodeFunc = _.includes('get delete'.split(' '), method) ? encodeFuncs.getByUrl : encodeFuncs.urlSearch
        return (controller, action, data, config = configAxios.FORM, encodeFunc = defaultEncodeFunc) => {
            //axios.defaults.headers.common['Authorization'] = store.state.user.token
            return Bluebird.resolve(axios[ method ](`${SERVER.SERVER_API_ADDRESS}/${controller}/${action}`, encodeFunc(data), config))       
        }
    }

    const claim = (function () {
        let claims = {}
        VERBS_HTTP.forEach(verb => claims[verb] = factoryClaim(verb))
        return claims
    })()

claim['config'] = configAxios
claim['encode'] = encodeFuncs

export default claim