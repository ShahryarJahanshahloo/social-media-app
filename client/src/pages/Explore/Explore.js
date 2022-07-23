import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import UserList from '../components/userList'
import Navbar from '../components/navbar'
import FollowSuggestion from '../components/followSuggestion'
import TopBar from '../components/topBar'
import Avatar from '../components/avatar'

import {
  BiSearchAlt as SearchIcon,
  BiDotsHorizontalRounded as DotsIcon,
} from 'react-icons/bi'

const Explore = () => {
  const [query, setQuery] = useState('')
  const history = useHistory()
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
    <div className='main-app'>
      <div className='side-section-left-wrapper'>
        <div className='side-section left'>
          <Navbar />
        </div>
      </div>
      <div className='middle-section'>
        <div className='middle-sections-container'>
          <div className='middle-section-left'>
            <TopBar
              needsDesktop={true}
              Left={
                <div className='avatar-box'>
                  <Avatar username={user.username} size='32' />
                </div>
              }
              Middle={
                <div className='search-box'>
                  <input
                    onChange={searchInputOnChange}
                    placeholder='Search User'
                  ></input>
                  <div
                    onClick={searchButtonHandler}
                    style={{ paddingRight: '5px' }}
                  >
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
            <UserList
              users={users}
              alt={
                emptyRes ? (
                  <div className='alt-container'>
                    <div className='alt-flex'>
                      <div className='alt-item-wrapper'>
                        <span className='alt-item-big'>No results found!</span>
                      </div>
                      <div className='alt-item-wrapper'>
                        <span className='alt-item-small'>
                          The term you entered did not bring up any results. You
                          may have The term you entered did not bring up any
                          results. You may have The term you entered did not
                          bring up any results. You may have mistyped your term
                          or the username you are looking for doesn't exist.
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null
              }
            />
            {users.length < 10 ? null : (
              <button className='load-more' onClick={loadMore}>
                load more users
              </button>
            )}
          </div>
          <div className='middle-section-right'>
            <div className='side-section right'>
              <FollowSuggestion />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore
