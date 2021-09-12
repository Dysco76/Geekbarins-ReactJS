import axios from "axios"

class Request {
  get(url) {
    return axios.get(url)
  }

  post(url, data) {
    return axios.post(url, data)
  }
}

export const request = new Request()
