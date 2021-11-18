import React from 'react';

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

const TweetCompact = ({ body, likesCount, user }) => {

    return (
        <div className="tweet-compact">
            <div className="tweet-sidebar">
                <Avatar img={mamadAvatar} size="48" />
            </div>
            <div className="tweet-main">
                <div className="tweet-author-info">
                    <div className="tweet-displayName">
                        {user.displayName}
                    </div>
                    <div className="tweet-username">
                        <label>@{user.username}</label>
                    </div>
                </div>
                <div className="tweet-body">
                    {body}
                </div>
                <div className="tweet-actions">
                    <div className="tweet-icon-wrapper">
                        <CommentIcon style={iconStyle} />
                    </div>
                    <div className="tweet-icon-wrapper">
                        <RetweetIcon style={iconStyle} />
                    </div>
                    <div className="tweet-icon-wrapper">
                        <HeartIcon style={iconStyle} /> {likesCount}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetCompact;