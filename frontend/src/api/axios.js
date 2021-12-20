import axios from 'axios'

const ENDPOINT_URL = process.env.REACT_APP_ENDPOINT_URL

const request = axios.create({
  baseURL: `${ENDPOINT_URL}/`,
})

export default request