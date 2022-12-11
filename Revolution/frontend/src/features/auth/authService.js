import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  console.log(response.data)

  return response.data
}

const registerClient = async (userData) => {
  console.log(userData)
  const response = await axios.post(API_URL + 'registerClient', userData)
  console.log("what")
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//getClients

const getClients = async () => {
  const response = await axios.get(API_URL + 'getClients')

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  registerClient,
  logout,
  getClients,
  login,
}

export default authService
