import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { PostAuthenticate } from '../../api/api'

const Redirect = props => {
  const history = useHistory()
  const jwt = localStorage.getItem('jwt')

  useEffect(async () => {
    if (jwt !== null) {
      try {
        const res = await PostAuthenticate()
        if (res.data.isAuthenticated) {
          history.push('/home')
        } else {
          history.push('/login')
        }
      } catch (e) {
        history.push('/login')
      }
    } else {
      history.push('/login')
    }
  }, [])

  return <div>please wait...</div>
}

export default Redirect
