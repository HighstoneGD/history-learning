import axios from 'axios'

const defaultInstance = axios.create({
  baseURL: 'http://localhost:8080'
})

export default defaultInstance
