import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import s from '../SignUp/SignUp.module.css'

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
    <div className={s.container}>
      <div className={s.box}>
        <label className={s.topic}>Sign In</label>

        <div className={s.form}>
          <input
            type='text'
            ref={emailInput}
            placeholder='Email'
            className={s.input}
          />
          <input
            type='text'
            ref={passwordInput}
            placeholder='Password'
            className={s.input}
          />
          <input
            type='submit'
            value='Sign in'
            onClick={handleLogin}
            className={s.submit}
          />
        </div>

        <div className={s.alt}>
          <label className={s.altText}>no account?</label>
          <button onClick={handleRedirectClick} className={s.altButton}>
            {' '}
            Signup{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
