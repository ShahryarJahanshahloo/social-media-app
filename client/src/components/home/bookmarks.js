import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from "./navbar";
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import TitleBar from './titleBar';

const Bookmarks = (props) => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)

    if (!isLoggedIn) {
        history.push("/login")
    }

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
        <div className="main-app">
            <div className="side-section">
                <Navbar />
            </div>
            <div className="middle-section">
                <TitleBar />
                <TweetList tweets={tweets.data} setTweetsHandler={setTweetsHandler} url="/api/bookmarks" />
                <button className="load-more" onClick={() => LoadClickHandler()}>:</button>
            </div>
            <div className="side-section suggestion">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default Bookmarks;