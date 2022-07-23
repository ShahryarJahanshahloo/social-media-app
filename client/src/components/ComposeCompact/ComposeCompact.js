import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import Avatar from '../Avatar/Avatar'
import s from '../../pages/Compose/Compose.module.css'

const ComposeCompact = ({ setTweets, replyTo = null }) => {
  const [tweetBody, setTweetBody] = useState('')
  const [tweetBtnClass, setTweetBtnClass] = useState(
    'tweet-button disabledButton'
  )
  const user = useSelector(state => state.userReducer)
  const jwt = localStorage.getItem('jwt')
  const history = useHistory()

  const profileRedirect = () => {
    history.push(`/profile/${user.username}`)
  }

  const tweetBtnHandler = () => {
    //validate tweet body!
    const url = replyTo == null ? '/api/compose' : '/api/reply'
    const data =
      replyTo == null
        ? {
            body: tweetBody,
          }
        : {
            body: tweetBody,
            tweetID: replyTo.tweetID,
          }
    axios({
      method: 'POST',
      url: url,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      data: data,
    })
      .then(res => {
        console.log(res.data.tweet)
        setTweets(res.data.tweet)
      })
      .catch(e => {
        console.log(e)
      })
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
              <Avatar username={user.username} size='48' />
            </div>
          </div>
          <div className={s.areaWrapper}>
            <textarea
              className={s.textArea}
              onChange={textAreaOnChange}
              placeholder={
                replyTo == null ? "What's Happening?" : 'Tweet your reply'
              }
            ></textarea>
          </div>
        </div>
        <div className={s.tweetBarCompact}>
          <button
            className={tweetBtnClass}
            disabled={tweetBody === ''}
            onClick={tweetBtnHandler}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComposeCompact
