import React, { useEffect } from 'react';
import axios from "axios"

import TweetCompact from './tweetCompact';

const TweetList = ({ tweets, setTweetsHandler, url, query = {} }) => {
    const jwt = localStorage.getItem("jwt")

    useEffect(() => {
        axios({
            url: url,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: 0, ...query }
        })
            .then((res) => {
                if (res.data.tweets.length !== 0) {
                    setTweetsHandler(res)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

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
