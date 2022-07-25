import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import List from '../../components/List/List'
import TopBar from '../../components/TopBar/TopBar'
import useUserList from '../../hooks/useUserList'
import { GetProfileInfo } from '../../api/api'

const Followers = () => {
  const [displayName, setDisplayName] = useState()
  let profileUsername = useParams().username
  const user = useSelector(state => state.userReducer)
  const isUserProfile = profileUsername == user.username
  const [users, loadMore] = useUserList('/api/followers', {
    username: profileUsername,
  })

  useEffect(async () => {
    const res = await GetProfileInfo(profileUsername)
    setDisplayName(res.data.displayName)
  }, [])

  return (
    <>
      <TopBar
        Middle={
          <div className='top-bar-profile'>
            <div className='top-bar-displayName'>{displayName || ''}</div>
            <div className='top-bar-tweetCount'>{profileUsername}</div>
          </div>
        }
      />
      <List
        items={users}
        alt={{
          big: isUserProfile
            ? 'You don’t have any followers yet'
            : `@${profileUsername} doesn’t have any followers`,
          small: isUserProfile
            ? 'When someone follows you, you’ll see them here.'
            : 'When someone follows them, they’ll be listed here.',
        }}
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

export default Followers
