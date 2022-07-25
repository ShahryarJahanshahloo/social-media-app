import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import List from '../../components/List/List'
import ComposeCompact from '../../components/ComposeCompact/ComposeCompact'
import TweetCompact from '../../components/TweetCompact/TweetCompact'
import useTweetList from '../../hooks/useTweetList'
import TopBar from '../../components/TopBar/TopBar'
import { GetTweetInfo } from '../../api/api'

const TweetExtended = props => {
  const { tweetID } = useParams()
  const user = useSelector(state => state.userReducer)
  const [tweets, loadMore, setTweets] = useTweetList('/api/getReplies', {
    tweetID
  })
  const [tweet, setTweet] = useState()

  const addReply = reply => {
    setTweets(prevState => {
      const prevTweets = [...prevState]
      prevTweets.push(reply)
      return prevTweets
    })
  }

  useEffect(() => {
    async function fetch() {
      const res = await GetTweetInfo(tweetID)
      setTweet({
        body: res.data.body,
        likesCount: res.data.likesCount,
        retweetCount: res.data.retweetCount,
        repliesCount: res.data.repliesCount,
        createdAt: res.data.createdAt,
        user: res.data.user,
        _id: res.data._id
      })
    }
    fetch()
  }, [])

  return (
    <>
      <TopBar
        Middle={
          <div className="tweet-title">
            <div>Tweet</div>
          </div>
        }
      />
      {!tweet || user.username === '' ? null : <TweetCompact tweet={tweet} extend={true} />}
      <div className="compose-reply-box">
        {!tweet || user.username === '' ? null : (
          <ComposeCompact
            setTweets={addReply}
            replyTo={{
              tweetID: tweet._id
            }}
          />
        )}
      </div>
      {tweet && <List items={tweets} />}
      {tweets.length < 10 ? null : (
        <button className="load-more" onClick={loadMore}>
          load more replies
        </button>
      )}
    </>
  )
}

export default TweetExtended
