import React from 'react'

import TweetCompact from '../TweetCompact/TweetCompact'
import UserCompact from '../UserCompact/UserCompact'
import s from './List.module.css'

const List = ({ items, alt, type = 'tweet' }) => {
  let list = <div className={s.alert}></div>

  if (alt != null)
    list = (
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
    if (items.length !== 0) {
      list = items.map((value, index) => {
        return (
          <div key={index} className={s.tweetItem}>
            <TweetCompact tweet={value} />
          </div>
        )
      })
    }

    return <div className={s.tweet}>{list}</div>
  }

  if (type === 'user') {
    if (items.length !== 0) {
      list = items.map((value, index) => {
        return (
          <div key={index}>
            <UserCompact userContent={value} />
          </div>
        )
      })
    }

    return <div>{list}</div>
  }
}

export default List
