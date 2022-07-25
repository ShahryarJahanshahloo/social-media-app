import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import List from '../../components/List/List'
import TopBar from '../../components/TopBar/TopBar'
import Avatar from '../../components/Avatar/Avatar'
import s from './Explore.module.css'
import { GetSearch } from '../../api/api'

import {
  BiSearchAlt as SearchIcon,
  BiDotsHorizontalRounded as DotsIcon,
} from 'react-icons/bi'

const Explore = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer)

  const [users, setUsers] = useState([])
  const [skip, setSkip] = useState(0)
  const [emptyRes, setEmptyRes] = useState(false)

  const searchButtonHandler = () => {
    axios({
      url: '/api/search',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      params: { skip: 0, query },
    })
      .then(res => {
        if (res.data.users.length !== 0) {
          setUsers(() => {
            return res.data.users
          })
          setSkip(() => 0)
        } else if (res.data.users.length == 0) {
          setEmptyRes(true)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const searchInputOnChange = e => {
    setQuery(() => {
      return e.target.value
    })
  }

  const loadMore = () => {
    axios({
      url: '/api/search',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      params: { skip: (skip + 1) * 10, query: query },
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

  return (
    <>
      <TopBar
        desktop
        Left={<Avatar username={user.username} size='32' wrap />}
        Middle={
          <div className={s.search}>
            <input
              className={s.input}
              onChange={searchInputOnChange}
              placeholder='Search User'
            ></input>
            <div onClick={searchButtonHandler} style={{ paddingRight: '5px' }}>
              <SearchIcon style={{ color: '#a9a9a9' }} />
            </div>
          </div>
        }
        Right={
          <div>
            <DotsIcon style={{ fontSize: '24px' }} />
          </div>
        }
      />
      <List
        items={users}
        alt={
          emptyRes
            ? {
                big: 'No results found!',
                small: `The term you entered did not bring up any results. You may
                    have The term you entered did not bring up any results. You
                    may have The term you entered did not bring up any results.
                    You may have mistyped your term or the username you are
                    looking for doesn't exist.`,
              }
            : null
        }
        type='user'
      />
      {users.length < 10 ? null : (
        <button className='load-more' onClick={loadMore}>
          load more users
        </button>
      )}
    </>
  )
}

export default Explore
