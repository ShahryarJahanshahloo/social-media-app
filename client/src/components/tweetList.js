import React from 'react';

import TweetCompact from './tweetCompact';

const TweetList = ({ tweets }) => {

    const isTweetListEmpty = (tweets[0].body === "")

    let tweetList = <div className="alert">No tweets to show!</div>

    if (!isTweetListEmpty) {
        tweetList = tweets.map((value, index) => {
            return (
                <div key={index} className="tweet-list-item">
                    <TweetCompact tweet={value} />
                </div>
            )
        })
    }

    return (
        <div className="tweet-list">{tweetList}</div>
    )
}

export default TweetList
