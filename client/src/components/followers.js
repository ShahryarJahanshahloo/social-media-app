import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import Navbar from './navbar'
import UserList from './userList'
import FollowSuggestion from './followSuggestion'
import TopBar from './topBar'
import useUserList from '../hooks/useUserList'

import { BiArrowBack as BackIcon } from 'react-icons/bi'

const Followers = () => {
  const history = useHistory()
  const [profile, setProfile] = useState({
    displayName: '',
  })
  let profileUsername = useParams().username
  const user = useSelector(state => state.userReducer)
  const isUserProfile = profileUsername == user.username
  const [users, loadMore] = useUserList('/api/followers', {
    username: profileUsername,
  })

  const backButtonHandler = () => {
    history.goBack()
  }

  useEffect(() => {
    axios({
      url: '/api/profileInfo',
      method: 'get',
      params: {
        username: profileUsername,
      },
    })
      .then(res => {
        setProfile(prevState => {
          return {
            displayName: res.data.displayName,
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

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
              Left={
                <div className='back-button-wrapper'>
                  <div className='back-button' onClick={backButtonHandler}>
                    <BackIcon style={{ fontSize: '1.25em' }} />
                  </div>
                </div>
              }
              Middle={
                <div className='top-bar-profile'>
                  <div className='top-bar-displayName'>
                    {profile.displayName}
                  </div>
                  <div className='top-bar-tweetCount'>{profileUsername}</div>
                </div>
              }
              Right={<div></div>}
            />
            <UserList
              users={users}
              alt={
                <div className='alt-container'>
                  <div className='alt-flex'>
                    <div className='alt-item-wrapper'>
                      <span className='alt-item-big'>
                        {isUserProfile
                          ? 'You don’t have any followers yet'
                          : `@${profileUsername} doesn’t have any followers`}
                      </span>
                    </div>
                    <div className='alt-item-wrapper'>
                      <span className='alt-item-small'>
                        {isUserProfile
                          ? 'When someone follows you, you’ll see them here.'
                          : 'When someone follows them, they’ll be listed here.'}
                      </span>
                    </div>
                  </div>
                </div>
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

export default Followers
