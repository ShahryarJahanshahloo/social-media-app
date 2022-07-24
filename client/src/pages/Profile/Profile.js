import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Avatar from '../../components/Avatar/Avatar'
import List from '../../components/List/List'
import useTweetList from '../../hooks/useTweetList'
import TopBar from '../../components/TopBar/TopBar'

const Profile = props => {
  const [profile, setProfile] = useState()
  let profileUsername = useParams().username
  const [tweets, loadMore] = useTweetList('/api/profileTweets', {
    username: profileUsername,
  })
  const user = useSelector(state => state.userReducer)
  const isUserProfile = profileUsername == user.username
  const history = useHistory()
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const [buttonText, setButtonText] = useState('Followed')
  const [isFollowed, setIsFollowed] = useState(
    user.followings.some(e => e.username === profileUsername)
  )
  const buttonClass = isFollowed
    ? 'follow-btn followed'
    : 'follow-btn not-followed'

  const followingRedirect = () => {
    history.push(`/following/${profileUsername}`)
  }

  const followersRedirect = () => {
    history.push(`/followers/${profileUsername}`)
  }

  const onMouseOver = e => {
    setButtonText('Unfollow')
  }

  const onMouseOut = e => {
    setButtonText('Followed')
  }

  const clickHandler = () => {
    axios({
      method: 'PATCH',
      url: '/api/follow',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      data: { username: profileUsername },
    })
      .then(res => {
        if (res.data.message == 'added') {
          dispatch({
            type: 'addFollowing',
            payload: { username: profileUsername },
          })
          setIsFollowed(true)
        } else if (res.data.message == 'removed') {
          dispatch({
            type: 'removeFollowing',
            payload: { username: profileUsername },
          })
          setIsFollowed(false)
        }
      })
      .catch(e => {
        console.log(e)
      })
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
            bio: res.data.bio,
            tweetsCount: res.data.tweetsCount,
            followersCount: res.data.followersCount,
            followingsCount: res.data.followingsCount,
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (
    <>
      <TopBar
        Middle={
          <div className='top-bar-profile'>
            <div className='top-bar-displayName'>
              {profile.displayName || ''}
            </div>
            <div className='top-bar-tweetCount'>
              {profile.tweetsCount || 0} Tweets
            </div>
          </div>
        }
      />
      <div className='profile-stats-wrapper'>
        <div className='profile-stats-box'>
          <div className='user-stats-box'>
            <div className='profile-avatar-box'>
              <Avatar username={profileUsername} size='128' wrap />
            </div>
            <div className='profile-text-box'>
              <div className='profile-displayName-box'>
                {profile.displayName || ''}
              </div>
              <div className='profile-username-box'>@{profileUsername}</div>
              <div className='profile-bio-box'>{profile.bio || ''}</div>
            </div>
          </div>
          <div className='follow-stats-box'>
            <div className='follow-stats-item'>
              <div onClick={followersRedirect} style={{ cursor: 'pointer' }}>
                <div className='follow-stat'>Followers</div>
                <div className='follow-num'>{profile.followersCount || 0}</div>
              </div>
            </div>
            <div className='follow-stats-item'>
              <div onClick={followingRedirect} style={{ cursor: 'pointer' }}>
                <div className='follow-stat'>Following</div>
                <div className='follow-num'>{profile.followingsCount || 0}</div>
              </div>
            </div>
            <div className='follow-stats-item'>
              <div>
                <div className='follow-button'>
                  {isUserProfile ? (
                    <button className='edit-profile-btn'>Edit profile</button>
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
        tweets={tweets}
        alt={{
          big: isUserProfile
            ? "You haven't Tweeted yet"
            : "This user hasn't Tweeted yet",
          small: isUserProfile
            ? "When you post a Tweet, it'll show up here"
            : '',
        }}
      />
      {tweets.length < 10 ? null : (
        <button className='load-more' onClick={loadMore}>
          load more tweets
        </button>
      )}
    </>
  )
}

export default Profile
