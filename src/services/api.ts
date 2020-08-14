import axios from "axios"

const api = axios.create({
  baseURL: "http://192.168.78.57:3333"
})

export default api;