const DEFAULT_REALM = 'api'
const REALMS_ENDPOINTS = {
  api: '/api'
}

export default defineNuxtPlugin(() => {
  // const snackbar = useSnackbar()
  const createFullPath = (pathParams: TApiParams) => {
    if (typeof pathParams !== 'object') {
      throw new TypeError('Invalid path specified')
    }

    const endpoint = pathParams.isFullPath
      ? ''
      : REALMS_ENDPOINTS[pathParams.realm || DEFAULT_REALM]
    const path = pathParams.path || ''

    return `${endpoint}${path}`
  }

  const fetch = $fetch.create({})

  const fetchService = {
    get: (path: TApiParams, params?: TAnyObject) => fetch(createFullPath(path), { method: 'get', params }),
    post: (path: TApiParams, body?: TAnyObject) => fetch(createFullPath(path), { method: 'post', body })
  }

  return {
    provide: {
      fetchService
    }
  }
})
