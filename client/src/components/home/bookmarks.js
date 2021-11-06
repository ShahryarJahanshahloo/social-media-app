import React, { useState } from 'react';
import Sidebar from './sidebar';
import axios from "axios"

import TweetList from './tweetList';

const Bookmarks = (props) => {
    const [tweets, setTweets] = useState({ data: [{ body: "", likes: "", owner: { displayName: "", username: "" }, createdAt: "" }] })
    const [skip, setSkip] = useState(0)
    const jwt = localStorage.getItem("jwt")

    const setTweetsHandler = (response) => {
        setTweets((prevState) => {
            return { data: response.data.tweets }
        })
    }

    const LoadClickHandler = () => {
        axios({
            url: "/api/bookmarks",
            method: 'get',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: (skip + 1) * 10 }
        })
            .then((response) => {
                setTweets((prevState) => {
                    const newState = { data: [] }
                    newState.data.push(...prevState.data)
                    newState.data.push(...response.data.tweets)
                    return newState
                })
                setSkip((prevState) => prevState + 1)

            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div>
            <Sidebar />
            <TweetList tweets={tweets.data} setTweetsHandler={setTweetsHandler} url="/api/bookmarks"></TweetList>
            <br /><button onClick={() => LoadClickHandler()}>load more</button>
        </div>
    )
}

export default Bookmarks;