import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import Avatar from './avatar';
import {
    AiOutlineRetweet as RetweetIcon
} from "react-icons/ai"
import {
    BsHeartFill as HeartIcon
} from "react-icons/bs"
import {
    FaRegComment as CommentIcon
} from "react-icons/fa"

const iconStyle = {
    fontSize: "17px",
    color: "rgb(83, 100, 113)",
}

const heartStyle = {
    fontSize: "15px",
    color: "rgb(83, 100, 113)",
    fill: "none",
    strokeWidth: "1.3",
    width: "100%",
}

const TweetCompact = ({ tweet, extend = false }) => {
    const history = useHistory()
    const user = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const isRetweet = tweet.retweetData != null
    const tweetContent = isRetweet ? tweet.retweetData : tweet

    const [likeState, setLikeState] = useState({
        likesCount: tweetContent.likesCount,
        isLiked: user.likedTweets.includes(tweetContent._id)
    })
    const [retweetState, setRetweetState] = useState({
        retweetCount: tweetContent.retweetCount,
        isRetweeted: user.retweets.includes(tweetContent._id)
    })

    const likeBtnHandler = () => {
        axios({
            method: "PATCH",
            url: "/api/like",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            data: {
                tweetID: tweetContent._id
            }
        })
            .then((res) => {
                if (res.data.message == "added") {
                    setLikeState((prevState) => {
                        return {
                            likesCount: prevState.likesCount + 1,
                            isLiked: true
                        }
                    })
                    dispatch({
                        type: "addLike",
                        payload: {
                            tweetID: tweetContent._id
                        }
                    })
                } else if (res.data.message == "removed") {
                    setLikeState((prevState) => {
                        return {
                            likesCount: prevState.likesCount - 1,
                            isLiked: false
                        }
                    })
                    dispatch({
                        type: "removeLike",
                        payload: {
                            tweetID: tweetContent._id
                        }
                    })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const retweetBtnHandler = () => {
        axios({
            method: "POST",
            url: "/api/retweet",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            data: {
                tweetID: tweetContent._id
            }
        })
            .then((res) => {
                if (res.data.message == "added") {
                    setRetweetState((prevState) => {
                        return {
                            retweetCount: prevState.retweetCount + 1,
                            isRetweeted: true
                        }
                    })
                    dispatch({
                        type: "addRetweet",
                        payload: {
                            tweetID: tweetContent._id
                        }
                    })
                } else if (res.data.message == "removed") {
                    setRetweetState((prevState) => {
                        return {
                            retweetCount: prevState.retweetCount - 1,
                            isRetweeted: false
                        }
                    })
                    dispatch({
                        type: "removeRetweet",
                        payload: {
                            tweetID: tweetContent._id
                        }
                    })
                }
            })
            .catch((e) => {
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
        <div className="tweet-compact">
            <div className="tweet-sidebar" onClick={redirectToProfile}>
                <Avatar username={tweetContent.user.username} size="48" />
            </div>
            <div className="tweet-main">
                <div className="retweetedBy-box">
                    <div className="retweetedBy-info">
                        {isRetweet
                            ? <div style={{ color: "rgb(83, 100, 113)", fontSize: "0.8em" }}>
                                <RetweetIcon style={{ color: "rgb(83, 100, 113)" }} /> {tweet.user.displayName} retweeted
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className="tweet-author-info">
                    <div className="tweet-displayName" onClick={redirectToProfile}>
                        {tweetContent.user.displayName}
                    </div>
                    <div className="tweet-username" onClick={redirectToProfile}>
                        <label>@{tweetContent.user.username}</label>
                    </div>
                </div>
                <div className="tweet-body" onClick={extend ? null : redirectToTweet}>
                    {tweetContent.body}
                </div>
                <div className="tweet-actions">
                    <div className="tweet-icon-wrapper" onClick={extend ? null : redirectToTweet}>
                        <div className='tweet-icon'>
                            <CommentIcon style={iconStyle} />
                        </div>
                        <div className='tweet-icon-num'>
                            {tweetContent.repliesCount != 0 ? tweetContent.repliesCount : null}
                        </div>
                    </div>
                    <div className="tweet-icon-wrapper" onClick={retweetBtnHandler}>
                        <div className='tweet-icon'>
                            <RetweetIcon 
                            style={retweetState.isRetweeted ? { ...iconStyle, color: "green", strokeWidth: "20" } : iconStyle} />
                        </div>
                        <div className='tweet-icon-num' style={retweetState.isRetweeted ? { color: "green" } : null}>
                            {retweetState.retweetCount != 0 ? retweetState.retweetCount : null}
                        </div>
                    </div>
                    <div className="tweet-icon-wrapper" onClick={likeBtnHandler}>
                        <div className='tweet-icon'>
                            <HeartIcon
                            style={likeState.isLiked ? { ...heartStyle, color: "red", fill: "red ", stroke:"none" } : heartStyle} />
                        </div>
                        <div className='tweet-icon-num' style={likeState.isLiked ? { color: "red" } : null}>
                            {likeState.likesCount != 0 ? likeState.likesCount : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetCompact;