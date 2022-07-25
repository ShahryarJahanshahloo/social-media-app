import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Avatar from '../Avatar/Avatar'
import s from '../../pages/Compose/Compose.module.css'
import { PostCompose, PostReply } from '../../api/api'

const ComposeCompact = ({ setTweets, replyTo = null }) => {
  const [tweetBody, setTweetBody] = useState('')
  const [tweetBtnClass, setTweetBtnClass] = useState('tweet-button disabledButton')
  const user = useSelector(state => state.userReducer)
  const navigate = useNavigate()

  const profileRedirect = () => {
    navigate(`/profile/${user.username}`)
  }

  const tweetBtnHandler = async () => {
    //validate tweet body!
    const data = !replyTo
      ? {
          body: tweetBody
        }
      : {
          body: tweetBody,
          tweetID: replyTo.tweetID
        }
    let res
    if (replyTo) {
      res = await PostReply(data)
    } else {
      res = await PostCompose(data)
    }
    setTweets(res.data.tweet)
  }

  const textAreaOnChange = e => {
    let bodyLength = e.target.value.length
    if (e.target.value.trim() !== '') {
      setTweetBtnClass('tweet-button')
    } else {
      setTweetBtnClass('tweet-button disabledButton')
    }

    if (bodyLength > 255) {
      setTweetBtnClass('tweet-button disabledButton')
    } else if (bodyLength > 1) {
      setTweetBtnClass('tweet-button')
      setTweetBody(e.target.value)
    }
  }

  return (
    <div>
      <div className={s.main}>
        <div className={s.box}>
          <div className={s.avatarBar}>
            <div className={s.avatar} onClick={profileRedirect}>
              <Avatar username={user.username} size="48" />
            </div>
          </div>
          <div className={s.areaWrapper}>
            <textarea
              className={s.textArea}
              onChange={textAreaOnChange}
              placeholder={replyTo == null ? "What's Happening?" : 'Tweet your reply'}
            ></textarea>
          </div>
        </div>
        <div className={s.tweetBarCompact}>
          <button className={tweetBtnClass} disabled={tweetBody === ''} onClick={tweetBtnHandler}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComposeCompact
