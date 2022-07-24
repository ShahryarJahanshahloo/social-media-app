import React from 'react'

import UserCompact from '../UserCompact/UserCompact'
import Avatar from '../Avatar/Avatar'

import { FaCity as CityIcon } from 'react-icons/fa'
import { AiOutlineMail as EmailIcon } from 'react-icons/ai'
import s from './FollowSuggestion.module.css'

const FollowSuggestion = props => {
  return (
    <div className={s.container}>
      <div className={s.aboutMe}>
        <div className={s.suggestionTitle}>
          <span>About me</span>
        </div>
        <div className={s.section}>
          <Avatar username='mamad1234' size='48' wrap />
          <div className={s.title}>Hi! &#128075;</div>
        </div>
        <div className={s.section} style={{ lineHeight: '30px' }}>
          I'm Shahryar Jahanshahloo, CE student @Tabriz university. I'm
          currently learning Nodejs and React.
        </div>
        <div className={s.section}>
          <CityIcon />
          <div className={s.info}>Tehran,Iran</div>
        </div>
        <div className={s.section}>
          <EmailIcon />
          <div className={s.info}>shahryar.jahanshahloo@gmail.com</div>
        </div>
      </div>

      <div className={s.suggestions}>
        <div className={s.suggestionTitle}>
          <span className={s.span}>Who to follow</span>
        </div>
        <div className={s.list}>
          <UserCompact
            userContent={{
              username: 'mamad1234',
              displayName: 'mamad',
              bio: '',
            }}
          />
          <UserCompact
            userContent={{
              username: 'abbas1234',
              displayName: 'abbas',
              bio: '',
            }}
          />
          <UserCompact
            userContent={{
              username: 'mamad1234',
              displayName: 'mamad',
              bio: '',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FollowSuggestion
