import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../Avatar/Avatar'
import s from './UserCompact.module.css'
import { PatchFollow } from '../../api/api'

// const iconStyle = {
//   fontSize: '15px',
//   color: 'rgb(83, 100, 113)',
// }

const UserCompact = ({ userContent }) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const [buttonText, setButtonText] = useState('Followed')
  const [isFollowed, setIsFollowed] = useState(
    user.followings.some(e => e.username === userContent.username)
  )
  const buttonClass = isFollowed ? `${s.btn} ${s.followed}` : `${s.btn} ${s.notFollowed}`

  const redirectToProfile = () => {
    navigate(`/profile/${userContent.username}`)
  }

  const onMouseOver = e => {
    setButtonText('Unfollow')
  }

  const onMouseOut = e => {
    setButtonText('Followed')
  }

  const clickHandler = async () => {
    const data = { username: userContent.username }
    const res = await PatchFollow(data)
    const isAdded = res.data.message === 'added'
    dispatch({
      type: isAdded ? 'addFollowing' : 'removeFollowing',
      payload: { username: userContent.username }
    })
    setIsFollowed(isAdded)
  }

  return (
    <div className={s.container}>
      <div className={s.sidebar} onClick={redirectToProfile}>
        <Avatar username={userContent.username} size="48" />
      </div>
      <div className={s.main}>
        <div className={s.author}>
          <div className={s.info}>
            <div className={s.displayName} onClick={redirectToProfile}>
              {userContent.displayName}
            </div>
            <div className={s.username} onClick={redirectToProfile}>
              <label>@{userContent.username}</label>
            </div>
          </div>
          <div className={s.follow}>
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
        <div className={s.body} onClick={redirectToProfile}>
          {userContent.bio}
        </div>
      </div>
    </div>
  )
}

export default UserCompact
