import React from 'react';

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

const TweetCompact = ({ body, likes, owner }) => {

    return (
        <div className="tweet-compact">
            <div className="tweet-sidebar">

            </div>
            <div className="tweet-main">
                <div className="tweet-author-info">
                    <div className="tweet-displayName">
                        {owner.displayName}
                    </div>
                    <div className="tweet-username">
                        <label>@{owner.username}</label>
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
                        <HeartIcon style={iconStyle} /> {likes}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetCompact;