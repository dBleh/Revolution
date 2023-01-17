import axios from 'axios'

const API_URL = '/api/users/'

//Representative Service Section
//Delete Calendar Event
const deleteCalendarEvent = async (eventId) => {
  const response = await axios.delete(API_URL +eventId)
  return response.data
}
//Get Calendar Events
const getCalendarEvents = async(user) => {  
  const response = await axios.post(API_URL + 'getCalendarEvents', user)
  if(response){
    localStorage.setItem("events", response)
  }
  return response.data
}
//Add Calendar Data
const addCalendarEvent = async(formData) => {
  console.log(formData)
  const response = await axios.post(API_URL + 'addCalendarEvent', formData)
  return response.data
}

// Register Representative Data 
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//Representative to Client Service Section


const addContactInfo = async (formData) => {
  const response = await axios.post(API_URL + 'addContactInfo', formData)
   
  return response.data;
};

//Get Client Contact Info
const getClientContactInfo = async(client) =>{
  const response = await axios.post(API_URL + 'getClientContactInfo', client)
  if(response.data){
    localStorage.setItem('contacts',JSON.stringify(response))

  }
  return response.data
}
  
// Add Company Information Form
const addCompanyInformation = async (formData) => {
  const response = await axios.post(API_URL + 'addCompanyInformation', formData)
  return response.data;
};
//Get All Policies for all of Representatives Clients
const getPolicies = async (user) => {
  const response = await axios.post(API_URL + 'getPolicies', user)
  if(response){
    localStorage.setItem("policies", response)
  }
  return response.data;
};
//Add a Policy to a Client Account
const addPolicy = async (formData) => {
  const response = await axios.post(API_URL + 'addPolicy', formData)
   
  return response.data;
};
//Add a Pdf to a Client Account
const addPdf = async (formData) => {
  const response = await axios.post(API_URL + 'addPdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};
//Get all Pdf's for selected Client
const getPdfs = async (client) => {
  const response = await axios.post(API_URL + 'getPdfs', client)
  if(response){
  localStorage.setItem('pdfs', response.data);
}
  return response.data;
};
//Register New Client under Current Representative
const registerClient = async (userData) => {
  const response = await axios.post(API_URL + 'registerClient', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
//Get Clients for Requested Representative
const getClients = async (user) => {
  const response = await axios.post(API_URL + 'getClients',user)
  return response.data
}

//Change the Current Focused Client
const changeClient = async (client) => {
  const response = await axios.post(API_URL + 'changeClient',client)
  localStorage.removeItem('pdfs')
  localStorage.removeItem('client')
  if (response.data) {
    localStorage.setItem('client', JSON.stringify(response.data))
  }
  return response.data
}

//Client Service Section

//Client/Representative Service Section 

// Log User Out
const logout = () => {
  localStorage.clear()
}

// Login User In
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  addContactInfo,
  getClientContactInfo,
  deleteCalendarEvent,
  getCalendarEvents,
  addCalendarEvent,
  addCompanyInformation,
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
