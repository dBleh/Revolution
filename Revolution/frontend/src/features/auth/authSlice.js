import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


// Get User from localStorage
const user = JSON.parse(localStorage.getItem('user'))
// Get Client from localStorage
const client = JSON.parse(localStorage.getItem('client'))

const initialState = {
  clients:[],
  pdfs:[],
  policies:[],
  client: client ? client : null,
  user: user ? user : null,
  accessedUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPolicies = createAsyncThunk(
  'auth/getPolicies',
  async (user, thunkAPI) => {
    try {
    
      return await authService.getPolicies(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addPolicy = createAsyncThunk(
  'auth/addPolicy',
  async (formData, thunkAPI) => {
    try {
      return await authService.addPolicy(formData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)
export const addCompanyInformation = createAsyncThunk(
  'auth/addCompanyInformation',
  async (formData, thunkAPI) => {
    try {
      return await authService.addCompanyInformation(formData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addPdf = createAsyncThunk(
  'auth/addPdf',
  async (formData, thunkAPI) => {
    try {
      return await authService.addPdf(formData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)
export const getPdfs = createAsyncThunk(
  'auth/getPdfs',
  async (client, thunkAPI) => {
    try {
      return await authService.getPdfs(client)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Register Client
export const registerClient = createAsyncThunk(
  'auth/registerClient',
  async (user, thunkAPI) => {
    try {
      return await authService.registerClient(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


//Get Clients for requested rep
export const getClients = createAsyncThunk(
  'auth/getClients',
  async (user,thunkAPI) => {
    try {
      return await authService.getClients(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Change Client for requested rep
export const changeClient = createAsyncThunk(
  'auth/changeClient',
  async (client, thunkAPI) => {
    try {
      return await authService.changeClient(client)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  }
)

// Login user
export const login = createAsyncThunk(
    'auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
      console.log(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
 
  authService.logout()
 
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.pdfs = false
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.clients = action.payload
        
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPdfs.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(getPdfs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pdfs = action.payload
        
      })
      .addCase(getPdfs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPolicies.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(getPolicies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.policies = action.payload
        
      })
      .addCase(getPolicies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(changeClient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeClient.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.client = action.payload
      })
      .addCase(changeClient.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
     
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.client = null
       
        state.pdfs = null
        state.policies = null
        state.rep = null
      })
      
      
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
