import axios from 'axios'
const API_URL = '/api/users/'

//get Policies
const getPolicies = async (user) => {

  const response = await axios.post(API_URL + 'getPolicies', user)
  if(response){
    localStorage.setItem("policies", response)
  }
  return response.data;
};
//add policy
const addPolicy = async (formData) => {
  const response = await axios.post(API_URL + 'addPolicy', formData)
   
  return response.data;
};
//Add pdf
const addPdf = async (formData) => {
  const response = await axios.post(API_URL + 'addPdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};
const getPdfs = async (client) => {
  const response = await axios.post(API_URL + 'getPdfs', client)
  if(response){
  localStorage.setItem('pdfs', response.data);
}
  return response.data;
};
// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const registerClient = async (userData) => {
  console.log("here")
  const response = await axios.post(API_URL + 'registerClient', userData)
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

//Get Clients for requested rep
const getClients = async (user) => {
  const response = await axios.post(API_URL + 'getClients',user)
  return response.data
}

//Change current client
const changeClient = async (client) => {
  const response = await axios.post(API_URL + 'changeClient',client)
  localStorage.removeItem('pdfs')
  localStorage.removeItem('client')
  if (response.data) {
    localStorage.setItem('client', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => {
  localStorage.clear()
}

const authService = {
  getPolicies,
  addPolicy,
  getPdfs,
  addPdf,
  register,
  registerClient,
  changeClient,
  logout,
  getClients,
  login,
}

export default authService
