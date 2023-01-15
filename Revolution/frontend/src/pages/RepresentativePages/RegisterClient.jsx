import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {registerClient, changeClient, reset} from '../../features/Auth/authSlice'

function RegisterClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    primaryBroker: '',
    userType: '',
  })
  const { name, email, password, password2, } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, message } = useSelector(
    (state) => state.auth
  )
  const {client} = useSelector((state)=>state.auth)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
  })
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        brokerId: user._id,
        userType: "Client",
      }
      dispatch(registerClient(userData))
      dispatch(changeClient(client))
      navigate("/repdashboard")
      return () => {
        dispatch(reset())
    }
    }
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter Company Name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter Company Email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password for company to use'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password for company to use'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default RegisterClient
