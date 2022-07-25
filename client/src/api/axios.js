import axios from 'axios'

const baseURL = 'http://localhost:8000/'

const request = axios.create({
  baseURL,
  timeout: 50000
})

request.interceptors.response.use(
  response => {
    console.log(`response for ${response.config.url}`, response)
    return response
  },
  error => {
    console.log(error.response)
    return Promise.reject(error)
  }
)

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwt')
    if (token) {
      if (config.headers) {
        config.headers.Authorization = 'Bearer ' + String(token)
      }
    }
    console.log(`${config.url}`)
    return config
  },
  error => Promise.reject(error)
)

export default request
