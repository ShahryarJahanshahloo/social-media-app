import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import List from '../../components/List/List'
import TopBar from '../../components/TopBar/TopBar'
import useUserList from '../../hooks/useUserList'
import { GetProfileInfo } from '../../api/api'

const Following = () => {
  const [displayName, setDisplayName] = useState()
  let profileUsername = useParams().username
  const user = useSelector(state => state.userReducer)
  const isUserProfile = profileUsername === user.username
  const [users, loadMore] = useUserList('/api/followings', {
    username: profileUsername,
  })

  useEffect(() => {
    async function fetch() {
      const res = await GetProfileInfo(profileUsername)
      setDisplayName(res.data.displayName)
    }
    fetch()
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
            ? 'You aren’t following anyone yet'
            : `@${profileUsername} isn't following anyone`,
          small: isUserProfile
            ? 'When you do, they’ll be listed here and you’ll see their Tweets in your timeline.'
            : 'When they do, they’ll be listed here.',
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

export default Following
