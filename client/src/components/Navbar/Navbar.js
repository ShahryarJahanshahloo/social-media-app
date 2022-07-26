import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Avatar from '../Avatar/Avatar'
import s from './Navbar.module.css'

import { FiHome as HomeIcon, FiSearch as ExploreIcon } from 'react-icons/fi'
import { CgBookmark as BookmarkIcon, CgProfile as ProfileIcon } from 'react-icons/cg'
import { SiTwitter as BirdIcon } from 'react-icons/si'

const Navbar = props => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

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
  //       navigate('/')
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     })
  // }

  const iconStyle = {
    fontSize: '1.6em',
    color: 'black'
  }

  return (
    <div className={s.wrapper}>
      <div className={s.navbar}>
        <div className={s.upper}>
          <div className={`${s.itemWrapper} ${s.twitter}`}>
            <div
              className={s.item}
              onClick={() => {
                navigate('/home')
              }}
            >
              <BirdIcon style={{ fontSize: '2em', color: 'rgb(29, 155, 240)' }} />
            </div>
          </div>
          <div className={s.itemWrapper}>
            <div
              className={s.item}
              onClick={() => {
                navigate('/home')
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
                navigate('/bookmarks')
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
                navigate('/explore')
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
                navigate(`/profile/${user.username}`)
              }}
            >
              <ProfileIcon style={iconStyle} />
              <label className={s.text}>Profile</label>
            </div>
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s.avatar}>
            <Avatar username={user.username} size="40" wrap />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
