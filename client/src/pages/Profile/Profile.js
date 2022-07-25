import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import List from '../../components/List/List'
import useTweetList from '../../hooks/useTweetList'
import TopBar from '../../components/TopBar/TopBar'
import { PatchFollow, GetProfileInfo } from '../../api/api'
import s from './Profile.module.css'
import TopBarProfile from '../../components/TopBar/Profile/Profile'

const Profile = props => {
  const [profile, setProfile] = useState()
  let profileUsername = useParams().username
  const [tweets, loadMore] = useTweetList('/api/profileTweets', {
    username: profileUsername
  })
  const user = useSelector(state => state.userReducer)
  const isUserProfile = profileUsername === user.username
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [buttonText, setButtonText] = useState('Followed')
  const [isFollowed, setIsFollowed] = useState(
    user.followings.some(e => e.username === profileUsername)
  )
  const buttonClass = isFollowed ? 'follow-btn followed' : 'follow-btn not-followed'

  const followingRedirect = () => {
    navigate(`/following/${profileUsername}`)
  }

  const followersRedirect = () => {
    navigate(`/followers/${profileUsername}`)
  }

  const onMouseOver = e => {
    setButtonText('Unfollow')
  }

  const onMouseOut = e => {
    setButtonText('Followed')
  }

  const clickHandler = async () => {
    const data = { username: profileUsername }
    const res = await PatchFollow(data)
    const isAdded = res.data.message === 'added'
    dispatch({
      type: isAdded ? 'addFollowing' : 'removeFollowing',
      payload: { username: profileUsername }
    })
    setIsFollowed(isAdded)
  }

  useEffect(() => {
    async function fetch() {
      const res = await GetProfileInfo(profileUsername)
      setProfile({
        displayName: res.data.displayName,
        bio: res.data.bio,
        tweetsCount: res.data.tweetsCount,
        followersCount: res.data.followersCount,
        followingsCount: res.data.followingsCount
      })
    }
    fetch()
  }, [])

  return (
    <>
      <TopBar
        Middle={
          <TopBarProfile
            displayName={profile.displayName || ''}
            tweetsCount={profile.tweetsCount || 0}
          />
        }
      />
      <div className={s.wrapper}>
        <div className={s.container}>
          <div className={s.user}>
            <div className={s.avatar}>
              <Avatar username={profileUsername} size="128" wrap />
            </div>
            <div className={s.text}>
              <div className={s.displayName}>{profile.displayName || ''}</div>
              <div className={s.username}>@{profileUsername}</div>
              <div className={s.bio}>{profile.bio || ''}</div>
            </div>
          </div>
          <div className={s.follow}>
            <div className={s.item}>
              <div onClick={followersRedirect} style={{ cursor: 'pointer' }}>
                <div className={s.stat}>Followers</div>
                <div className={s.num}>{profile.followersCount || 0}</div>
              </div>
            </div>
            <div className={s.item}>
              <div onClick={followingRedirect} style={{ cursor: 'pointer' }}>
                <div className={s.stat}>Following</div>
                <div className={s.num}>{profile.followingsCount || 0}</div>
              </div>
            </div>
            <div className={s.item}>
              <div>
                <div>
                  {isUserProfile ? (
                    <button className={s.button}>Edit profile</button>
                  ) : (
                    <button
                      className={buttonClass}
                      onClick={clickHandler}
                      onMouseOver={onMouseOver}
                      onMouseOut={onMouseOut}
                    >
                      {isFollowed ? buttonText : 'Follow'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <List
        items={tweets}
        alt={{
          big: isUserProfile ? "You haven't Tweeted yet" : "This user hasn't Tweeted yet",
          small: isUserProfile ? "When you post a Tweet, it'll show up here" : ''
        }}
      />
      {tweets.length < 10 ? null : (
        <button className="load-more" onClick={loadMore}>
          load more tweets
        </button>
      )}
    </>
  )
}

export default Profile
