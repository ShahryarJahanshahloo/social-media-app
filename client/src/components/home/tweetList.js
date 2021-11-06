import React, { useEffect } from 'react';
import axios from "axios"

import TweetCompact from './tweetCompact';

const TweetList = ({ tweets, setTweetsHandler, url, queryUsername = "" }) => {
    const jwt = localStorage.getItem("jwt")

    useEffect(() => {
        axios({
            url: url,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: 0, username: queryUsername }
        })
            .then((response) => {
                if (response.data.tweets.length !== 0) {
                    setTweetsHandler(response)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    const tweetList = tweets.map((value, index) => {
        return (
            <div key={index} style={{minHeight: "100px"}}>
                <TweetCompact body={value.body} likes={value.likes} owner={value.owner} createdAt={value.createdAt}/>
            </div>
        )
    })

    return (
        <div className="tweet-list">{tweetList}</div>
    )
}

export default TweetList