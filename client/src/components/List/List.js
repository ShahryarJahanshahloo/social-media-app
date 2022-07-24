import React from 'react'

import TweetCompact from '../TweetCompact/TweetCompact'
import UserCompact from '../UserCompact/UserCompact'
import s from './List.module.css'

const List = ({ tweets, alt, type = 'tweet' }) => {
  let tweetList = <div className={s.alert}></div>

  if (alt != null)
    tweetList = (
      <div className={s.container}>
        <div className={s.flex}>
          <div className={s.item}>
            <span className={s.big}>{alt.small}</span>
          </div>
          <div className={s.item}>
            <span className={s.small}>{alt.big}</span>
          </div>
        </div>
      </div>
    )

  if (type === 'tweet') {
    if (tweets.length !== 0) {
      tweetList = tweets.map((value, index) => {
        return (
          <div key={index} className={s.tweetItem}>
            <TweetCompact tweet={value} />
          </div>
        )
      })
    }

    return <div className={s.tweet}>{tweetList}</div>
  }

  if (type === 'user') {
    if (users.length !== 0) {
      userList = users.map((value, index) => {
        return (
          <div key={index}>
            <UserCompact userContent={value} />
          </div>
        )
      })
    }

    return <div>{userList}</div>
  }
}

export default List
