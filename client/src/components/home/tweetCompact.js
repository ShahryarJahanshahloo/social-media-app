import React from 'react';
import { useHistory } from 'react-router';

import Avatar from './avatar';

import mamadAvatar from "../../mamad.jpg"
import {
    BiHeart as HeartIcon,
    BiComment as CommentIcon,
} from "react-icons/bi"
import {
    FaRetweet as RetweetIcon,
} from "react-icons/fa"

const iconStyle = {
    fontSize: "15px",
    color: "rgb(83, 100, 113)",
}

const TweetCompact = ({ tweet }) => {
    const history = useHistory()
    const isRetweet = tweet.retweetData != null

    const likeBtnHandler = () => {
        console.log("like");
    }

    const retweetBtnHandler = () => {
        console.log("retweet");
    }

    // const replyBtnHandler = () => { }

    const redirectToProfile = () => {
        const profileUsername = isRetweet ? tweet.retweetData.user.username : tweet.user.username
        history.push(`/profile/${profileUsername}`)
    }

    const redirectToTweet = () => {
        console.log("tweet");
    }

    return (
        <div className="tweet-compact">
            <div className="tweet-sidebar" onClick={redirectToProfile}>
                <Avatar img={mamadAvatar} size="48" />
            </div>
            <div className="tweet-main">
                <div className="tweet-author-info">
                    <div className="tweet-displayName" onClick={redirectToProfile}>
                        {isRetweet ? tweet.retweetData.user.displayName : tweet.user.displayName}
                    </div>
                    <div className="tweet-username" onClick={redirectToProfile}>
                        <label>@{isRetweet ? tweet.retweetData.user.username : tweet.user.username}</label>
                    </div>
                </div>
                <div className="tweet-body" onClick={redirectToTweet}>
                    {isRetweet ? tweet.retweetData.body : tweet.body}
                </div>
                <div className="tweet-actions">
                    <div className="tweet-icon-wrapper" onClick={redirectToTweet}>
                        <CommentIcon style={iconStyle} />
                        {tweet.repliesCount != 0 ? tweet.repliesCount : null}
                    </div>
                    <div className="tweet-icon-wrapper" onClick={retweetBtnHandler}>
                        <RetweetIcon style={iconStyle} />
                        {tweet.retweetCount != 0 ? tweet.retweetCount : null}
                    </div>
                    <div className="tweet-icon-wrapper" onClick={likeBtnHandler}>
                        <HeartIcon style={iconStyle} />
                        {tweet.likesCount != 0 ? tweet.likesCount : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetCompact;