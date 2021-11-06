import React from 'react';

import {
    CgHeart as HeartIcon,
} from "react-icons/cg"

const TweetCompact = ({ body, likes, owner }) => {

    return (
        <div className="tweet">
            <div className="tweet-sidebar">

            </div>
            <div className="tweet-main">
                <div className="tweet-author-info">
                    <div className="tweet-displayName">
                        {owner.displayName}
                    </div>
                    <div className="tweet-username">
                        {owner.username}
                    </div>
                </div>
                <div className="tweet-body">
                    {body}
                </div>
                <div className="tweet-actions">
                    <HeartIcon /> {likes}
                </div>
            </div>
        </div>
    )
}

export default TweetCompact;