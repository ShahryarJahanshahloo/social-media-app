import React from 'react'

import TweetCompact from '../TweetCompact/TweetCompact'

const TweetList = ({ tweets, alt }) => {
  const isTweetListEmpty = tweets.length === 0

  let tweetList = <div className='alert'></div>

  if (alt != null) tweetList = alt

  if (!isTweetListEmpty) {
    tweetList = tweets.map((value, index) => {
      return (
        <div key={index} className='tweet-list-item'>
          <TweetCompact tweet={value} />
        </div>
      )
    })
  }

  return <div className='tweet-list'>{tweetList}</div>
}

export default TweetList
