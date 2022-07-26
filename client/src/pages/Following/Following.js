import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import List from '../../components/List/List'
import TopBar from '../../components/TopBar/TopBar'
import useUserList from '../../hooks/useUserList'
import { GetProfileInfo } from '../../api/api'
import TopBarProfile from '../../components/TopBar/Profile/Profile.module.css'

const Following = () => {
  const [displayName, setDisplayName] = useState()
  let profileUsername = useParams().username
  const user = useSelector(state => state.user)
  const isUserProfile = profileUsername === user.username
  const [users, loadMore] = useUserList('/api/followings', {
    username: profileUsername
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
        Middle={<TopBarProfile displayName={displayName || ''} tweetsCount={profileUsername} />}
      />
      <List
        items={users}
        alt={{
          big: isUserProfile
            ? 'You aren’t following anyone yet'
            : `@${profileUsername} isn't following anyone`,
          small: isUserProfile
            ? 'When you do, they’ll be listed here and you’ll see their Tweets in your timeline.'
            : 'When they do, they’ll be listed here.'
        }}
        type="user"
      />
      {users.length < 10 ? null : (
        <button className="load-more" onClick={loadMore}>
          load more users
        </button>
      )}
    </>
  )
}

export default Following
