import { useState, useEffect } from 'react'
import axios from 'axios'

const useUserList = (URL, PARAMS) => {
  const [users, setUsers] = useState([])
  const [skip, setSkip] = useState(0)

  const loadMore = () => {
    axios({
      url: URL,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      params: { skip: (skip + 1) * 10, ...PARAMS }
    })
      .then(response => {
        setUsers(prevState => {
          const newState = []
          newState.push(...prevState)
          newState.push(...response.data.users)
          return newState
        })
        setSkip(prevState => prevState + 1)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    axios({
      url: URL,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      params: { skip: 0, ...PARAMS }
    })
      .then(res => {
        if (res.data.users.length !== 0) {
          setUsers(res.data.users)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return [users, loadMore, setUsers]
}

export default useUserList
