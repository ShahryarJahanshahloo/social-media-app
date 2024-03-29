import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import s from './SignUp.module.css'
import { PostSignUp } from '../../api/api'
import { login } from '../../redux/slices/LoginSlice'
import { setUser } from '../../redux/slices/UserSlice'

const Signup = props => {
  let navigate = useNavigate()
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [displayName, setDisplayName] = useState()
  const [password, setPassword] = useState()
  // const [password2, setPassword2] = useState()
  const dispatch = useDispatch()

  const handleRedirectClick = () => {
    navigate('/login')
  }

  const handleSignup = async () => {
    const data = {
      email,
      username,
      displayName,
      password
    }
    const res = await PostSignUp(data)
    dispatch(login())
    dispatch(
      setUser({
        username: res.data.username,
        displayName: res.data.displayName
      })
    )
    localStorage.setItem('jwt', res.data.token)
    navigate('/home')
  }

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const onUsernameChange = e => {
    setUsername(e.target.value)
  }

  const onDisplayNameChange = e => {
    setDisplayName(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const onPassword2Change = e => {
    // setPassword2(e.target.value)
  }

  return (
    <div className={s.container}>
      <div className={`${s.box} ${s.boxSignUp}`}>
        <label className={s.topic}>Sign Up</label>

        <div className={s.form}>
          <input type="text" onChange={onEmailChange} placeholder="Email" className={s.input} />
          <input
            type="text"
            onChange={onUsernameChange}
            placeholder="Username"
            className={s.input}
          />
          <input
            type="text"
            onChange={onDisplayNameChange}
            placeholder="Display Name"
            className={s.input}
          />
          <input
            type="text"
            onChange={onPasswordChange}
            placeholder="Password"
            className={s.input}
          />
          <input
            type="text"
            onChange={onPassword2Change}
            placeholder="Repeat Password"
            className={s.input}
          />
          <input type="submit" value="create account" onClick={handleSignup} className={s.submit} />
        </div>

        <div className={s.alt}>
          <label onClick={handleRedirectClick} className={s.altButton}>
            already have an account?{' '}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Signup
