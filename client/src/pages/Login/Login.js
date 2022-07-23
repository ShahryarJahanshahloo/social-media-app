import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Login = props => {
  let history = useHistory()
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const dispatch = useDispatch()

  const handleRedirectClick = () => {
    history.push('/signup')
  }

  const handleLogin = () => {
    axios
      .post('/api/signin', {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      })
      .then(res => {
        dispatch({
          type: 'updateLoginStatus',
        })
        dispatch({
          type: 'setUser',
          payload: {
            username: res.data.username,
            displayName: res.data.displayName,
          },
        })
        localStorage.setItem('jwt', res.data.token)
        history.push('/home')
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className='login-box-container'>
      <div className='login-box'>
        <label className='topic'>Sign In</label>

        <div className='form'>
          <input type='text' ref={emailInput} placeholder='Email' />
          <input type='text' ref={passwordInput} placeholder='Password' />
          <input type='submit' value='Sign in' onClick={handleLogin} />
        </div>

        <div className='signup-link'>
          <label>no account?</label>
          <button onClick={handleRedirectClick}> Signup </button>
        </div>
      </div>
    </div>
  )
}

export default Login
