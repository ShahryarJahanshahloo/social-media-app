import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import axios from 'axios'

import Avatar from '../Avatar/Avatar'
import s from './Navbar.module.css'

import { FiHome as HomeIcon, FiSearch as ExploreIcon } from 'react-icons/fi'
import {
  CgBookmark as BookmarkIcon,
  CgProfile as ProfileIcon,
} from 'react-icons/cg'
import { SiTwitter as BirdIcon } from 'react-icons/si'

const Navbar = props => {
  const user = useSelector(state => state.userReducer)
  // const jwt = localStorage.getItem('jwt')
  const history = useHistory()

  // const logoutHandler = () => {
  //   axios({
  //     method: 'post',
  //     url: '/api/logout',
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Credentials': true,
  //     },
  //   })
  //     .then(() => {
  //       localStorage.removeItem('jwt')
  //       history.push('/')
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     })
  // }

  const iconStyle = {
    fontSize: '1.6em',
    color: 'black',
  }

  return (
    <div className={s.wrapper}>
      <div className={s.navbar}>
        <div className={s.upper}>
          <div className={`${s.itemWrapper} ${s.twitter}`}>
            <div
              className={s.item}
              onClick={() => {
                history.push('/home')
              }}
            >
              <BirdIcon
                style={{ fontSize: '2em', color: 'rgb(29, 155, 240)' }}
              />
            </div>
          </div>
          <div className={s.itemWrapper}>
            <div
              className={s.item}
              onClick={() => {
                history.push('/home')
              }}
            >
              <HomeIcon style={iconStyle} />
              <label className={s.text}>Home</label>
            </div>
          </div>
          <div className={s.itemWrapper}>
            <div
              className={s.item}
              onClick={() => {
                history.push('/bookmarks')
              }}
            >
              <BookmarkIcon style={iconStyle} />
              <label className={s.text}>Bookmarks</label>
            </div>
          </div>
          <div className={s.itemWrapper}>
            <div
              className={s.item}
              onClick={() => {
                history.push('/explore')
              }}
            >
              <ExploreIcon style={iconStyle} />
              <label className={s.text}>Explore</label>
            </div>
          </div>
          <div className={s.itemWrapper}>
            <div
              className={s.item}
              onClick={() => {
                history.push(`/profile/${user.username}`)
              }}
            >
              <ProfileIcon style={iconStyle} />
              <label className={s.text}>Profile</label>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s.avatar}>
            <div className='avatar-box'>
              <Avatar username={user.username} size='40' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
