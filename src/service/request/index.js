import { BASE_URL, TIME_OUT } from './config'
import axios from 'axios'

class JFRequest {
  constructor(baseURL = BASE_URL, timeout = TIME_OUT) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res)
      }).catch(reject)
    })
  }

  get(config) {
    return this.request({ ...config, methods: 'GET' })
  }

  post(config) {
    return this.request({ ...config, methods: 'POST' })
  }
}

export default new JFRequest()