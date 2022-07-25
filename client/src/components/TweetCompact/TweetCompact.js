import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '../Avatar/Avatar'
import { AiOutlineRetweet as RetweetIcon } from 'react-icons/ai'
import { BsHeartFill as HeartIcon } from 'react-icons/bs'
import { FaRegComment as CommentIcon } from 'react-icons/fa'
import { BiDotsHorizontalRounded as DotsIcon } from 'react-icons/bi'
import s from './TweetCompact.module.css'
import { PatchFollow, PatchLike } from '../../api/api'

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
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
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

  const buttonHandler = async operation => {
    const data = {
      tweetID: tweetContent._id,
    }
    let res
    if (operation === 'Like') {
      res = await PatchLike(data)
    } else {
      res = await PatchFollow(data)
    }
    const isAdded = res.data.message === 'added'
    if (operation === 'Like') {
      setLikeState(prevState => {
        return {
          likesCount: prevState.likesCount + (isAdded ? 1 : -1),
          isLiked: isAdded,
        }
      })
    } else {
      setRetweetState(prevState => {
        return {
          retweetCount: prevState.retweetCount + (isAdded ? 1 : -1),
          isRetweeted: isAdded,
        }
      })
    }
    dispatch({
      type: isAdded ? `add${operation}` : `removeLike${operation}`,
      payload: {
        tweetID: tweetContent._id,
      },
    })
  }

  const redirectToProfile = () => {
    navigate(`/profile/${tweetContent.user.username}`)
  }

  const redirectToTweet = () => {
    navigate(`/tweet/${tweetContent._id}`)
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
          <div className={s.wrapper} onClick={buttonHandler('Retweet')}>
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
          <div className={s.wrapper} onClick={buttonHandler('Like')}>
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
