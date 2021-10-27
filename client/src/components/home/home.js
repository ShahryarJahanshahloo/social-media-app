import React, { useState } from 'react';
import axios from "axios"

import Sidebar from "./sidebar";
import Compose from "./compose"
import TweetList from './tweetList';

const Home = (props) => {
    const [tweets, setTweets] = useState({ data: [{ body: "", likes: "", owner: { displayName: "" } }] })
    const [skip, setSkip] = useState(0)
    const jwt = localStorage.getItem("jwt")

    const LoadClickHandler = () => {
        axios({
            url: "/api/home",
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
            <p>homepage</p>
            <Sidebar />
            <Compose />
            <TweetList tweets={tweets.data} setTweets={setTweets} />
            <br /><button onClick={() => LoadClickHandler()}>load more</button>
        </div>
    )
};

export default Home;