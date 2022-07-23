import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Avatar from '../Avatar/Avatar'
import { AiOutlineRetweet as RetweetIcon } from 'react-icons/ai'
import { BsHeartFill as HeartIcon } from 'react-icons/bs'
import { FaRegComment as CommentIcon } from 'react-icons/fa'
import { BiDotsHorizontalRounded as DotsIcon } from 'react-icons/bi'
import s from './TweetCompact.module.css'

const iconStyle = {
  fontSize: '17px',
  color: 'rgb(83, 100, 113)',
}

const heartStyle = {
  fontSize: '15px',
  color: 'rgb(83, 100, 113)',
  fill: 'none',
  strokeWidth: '1.3',
  width: '100%',
}

const dotStyle = {
  color: 'rgb(83, 100, 113)',
  fontSize: '20px',
}

const TweetCompact = ({ tweet, extend = false }) => {
  const history = useHistory()
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const isRetweet = tweet.retweetData != null
  const tweetContent = isRetweet ? tweet.retweetData : tweet

  const [likeState, setLikeState] = useState({
    likesCount: tweetContent.likesCount,
    isLiked: user.likedTweets.includes(tweetContent._id),
  })
  const [retweetState, setRetweetState] = useState({
    retweetCount: tweetContent.retweetCount,
    isRetweeted: user.retweets.includes(tweetContent._id),
  })

  const likeBtnHandler = () => {
    axios({
      method: 'PATCH',
      url: '/api/like',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      data: {
        tweetID: tweetContent._id,
      },
    })
      .then(res => {
        if (res.data.message === 'added') {
          setLikeState(prevState => {
            return {
              likesCount: prevState.likesCount + 1,
              isLiked: true,
            }
          })
          dispatch({
            type: 'addLike',
            payload: {
              tweetID: tweetContent._id,
            },
          })
        } else if (res.data.message === 'removed') {
          setLikeState(prevState => {
            return {
              likesCount: prevState.likesCount - 1,
              isLiked: false,
            }
          })
          dispatch({
            type: 'removeLike',
            payload: {
              tweetID: tweetContent._id,
            },
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const retweetBtnHandler = () => {
    axios({
      method: 'POST',
      url: '/api/retweet',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      data: {
        tweetID: tweetContent._id,
      },
    })
      .then(res => {
        if (res.data.message === 'added') {
          setRetweetState(prevState => {
            return {
              retweetCount: prevState.retweetCount + 1,
              isRetweeted: true,
            }
          })
          dispatch({
            type: 'addRetweet',
            payload: {
              tweetID: tweetContent._id,
            },
          })
        } else if (res.data.message === 'removed') {
          setRetweetState(prevState => {
            return {
              retweetCount: prevState.retweetCount - 1,
              isRetweeted: false,
            }
          })
          dispatch({
            type: 'removeRetweet',
            payload: {
              tweetID: tweetContent._id,
            },
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const redirectToProfile = () => {
    history.push(`/profile/${tweetContent.user.username}`)
  }

  const redirectToTweet = () => {
    history.push(`/tweet/${tweetContent._id}`)
  }

  return (
    <div className={s.container}>
      <div className={s.options}>
        <DotsIcon style={dotStyle} />
      </div>
      <div className={s.sidebar} onClick={redirectToProfile}>
        <Avatar username={tweetContent.user.username} size='48' />
      </div>
      <div className={s.main}>
        <div className={s.box}>
          <div className={s.info}>
            {isRetweet ? (
              <div style={{ color: 'rgb(83, 100, 113)', fontSize: '0.8em' }}>
                <RetweetIcon style={{ color: 'rgb(83, 100, 113)' }} />{' '}
                {tweet.user.displayName} retweeted
              </div>
            ) : null}
          </div>
        </div>
        <div className={s.author}>
          <div className={s.displayName} onClick={redirectToProfile}>
            {tweetContent.user.displayName}
          </div>
          <div className={s.username} onClick={redirectToProfile}>
            <label>@{tweetContent.user.username}</label>
          </div>
        </div>
        <div className={s.body} onClick={extend ? null : redirectToTweet}>
          {tweetContent.body}
        </div>
        <div className={s.actions}>
          <div className={s.wrapper} onClick={extend ? null : redirectToTweet}>
            <div className={s.icon}>
              <CommentIcon style={iconStyle} />
            </div>
            <div className={s.num}>
              {tweetContent.repliesCount !== 0
                ? tweetContent.repliesCount
                : null}
            </div>
          </div>
          <div className={s.wrapper} onClick={retweetBtnHandler}>
            <div className={s.icon}>
              <RetweetIcon
                style={
                  retweetState.isRetweeted
                    ? { ...iconStyle, color: 'green', strokeWidth: '20' }
                    : iconStyle
                }
              />
            </div>
            <div
              className={s.num}
              style={retweetState.isRetweeted ? { color: 'green' } : null}
            >
              {retweetState.retweetCount !== 0
                ? retweetState.retweetCount
                : null}
            </div>
          </div>
          <div className={s.wrapper} onClick={likeBtnHandler}>
            <div className={s.icon}>
              <HeartIcon
                style={
                  likeState.isLiked
                    ? {
                        ...heartStyle,
                        color: 'red',
                        fill: 'red ',
                        stroke: 'none',
                      }
                    : heartStyle
                }
              />
            </div>
            <div
              className={s.num}
              style={likeState.isLiked ? { color: 'red' } : null}
            >
              {likeState.likesCount !== 0 ? likeState.likesCount : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetCompact
