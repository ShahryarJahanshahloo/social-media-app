import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Avatar from '../Avatar/Avatar'

// const iconStyle = {
//   fontSize: '15px',
//   color: 'rgb(83, 100, 113)',
// }

const UserCompact = ({ userContent }) => {
  const history = useHistory()
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const [buttonText, setButtonText] = useState('Followed')
  const [isFollowed, setIsFollowed] = useState(
    user.followings.some(e => e.username === userContent.username)
  )
  const buttonClass = isFollowed
    ? 'follow-btn followed'
    : 'follow-btn not-followed'

  const redirectToProfile = () => {
    history.push(`/profile/${userContent.username}`)
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
      data: { username: userContent.username },
    })
      .then(res => {
        if (res.data.message === 'added') {
          dispatch({
            type: 'addFollowing',
            payload: { username: userContent.username },
          })
          setIsFollowed(true)
        } else if (res.data.message === 'removed') {
          dispatch({
            type: 'removeFollowing',
            payload: { username: userContent.username },
          })
          setIsFollowed(false)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className='tweet-compact'>
      <div className='tweet-sidebar' onClick={redirectToProfile}>
        <Avatar username={userContent.username} size='48' />
      </div>
      <div className='tweet-main'>
        <div className='user-author-info'>
          <div className='user-info'>
            <div className='user-displayName' onClick={redirectToProfile}>
              {userContent.displayName}
            </div>
            <div className='user-username' onClick={redirectToProfile}>
              <label>@{userContent.username}</label>
            </div>
          </div>
          <div className='follow-section'>
            <button
              className={buttonClass}
              onClick={clickHandler}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              {isFollowed ? buttonText : 'Follow'}
            </button>
          </div>
        </div>
        <div className='tweet-body' onClick={redirectToProfile}>
          {userContent.bio}
        </div>
      </div>
    </div>
  )
}

export default UserCompact
