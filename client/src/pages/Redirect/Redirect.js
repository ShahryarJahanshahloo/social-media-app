import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostAuthenticate } from '../../api/api'

const Redirect = props => {
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    async function fetch() {
      if (jwt !== null) {
        try {
          const res = await PostAuthenticate()
          if (res.data.isAuthenticated) {
            navigate('/home')
          } else {
            navigate('/login')
          }
        } catch (e) {
          navigate('/login')
        }
      } else {
        navigate('/login')
      }
    }
    fetch()
  }, [])

  return <div>please wait...</div>
}

export default Redirect
