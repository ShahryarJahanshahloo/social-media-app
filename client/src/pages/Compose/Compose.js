import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import TopBar from '../../components/TopBar/TopBar'

import s from './Compose.module.css'

const ComposeExtended = () => {
  const username = useSelector(state => state.userReducer.username)
  const jwt = localStorage.getItem('jwt')
  const history = useHistory()
  const [tweetBody, setTweetBody] = useState('')
  const [tweetBtnClass, setTweetBtnClass] = useState(
    'tweet-button disabledButton'
  )

  const tweetBtnHandler = () => {
    //validate tweet body!
    axios({
      method: 'post',
      url: '/api/compose',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      data: {
        body: tweetBody,
      },
    })
      .then(res => {
        if (res.status === '200') history.push('/home')
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
    <div className={s.wrapper}>
      <TopBar
        Middle={<div></div>}
        Right={
          <button
            className={tweetBtnClass}
            disabled={tweetBody === ''}
            onClick={tweetBtnHandler}
          >
            Tweet
          </button>
        }
      />
      <div className={s.main}>
        <div className={s.box}>
          <div className={s.avatarBar}>
            <div className={s.avatar}>
              <Avatar username={username} size='48' />
            </div>
          </div>
          <div className={s.areaWrapper}>
            <textarea
              className={s.textArea}
              onChange={textAreaOnChange}
              placeholder="What's Happening?"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComposeExtended
