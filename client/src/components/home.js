import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Avatar from './avatar';
import Navbar from "./navbar";
import ComposeCompact from "./composeCompact"
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import useTweetList from '../hooks/useTweetList';
import TopBar from './topBar';

import {
    AiFillEdit as ComposeIcon,
} from "react-icons/ai"

const iconStyle = {
    fontSize: "1.6em",
    color: "rgb(29, 155, 240)"
}

const Home = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)
    const username = useSelector(state => state.userReducer.username)

    if (!isLoggedIn) {
        history.push("/login")
    }

    const composeHandler = () => {
        history.push("/compose")
    }

    const [tweets, loadMore, setTweets] = useTweetList("/api/home", {})

    const left =
        <div className="avatar-box">
            <Avatar username={username} size="32" />
        </div>

    const middle = 
        <div className="title-box">
            Home
        </div>

    const right = 
        <div className="composeIcon" onClick={composeHandler}>
            <ComposeIcon style={iconStyle} />
        </div>

    return (
        <div className="main-app">
            <div className="side-section left">
                <Navbar />
            </div>
            <div className="middle-section">
                <TopBar Left={left} Middle={middle} Right={right} />
                <div className="compose-tweet-box">
                    <ComposeCompact setTweets={setTweets} />
                </div>
                <TweetList tweets={tweets} />
                {tweets[0].body == "" ? null :<button className="load-more" onClick={loadMore}>load more</button>}
            </div>
            <div className="side-section right">
                <FollowSuggestion />
            </div>
        </div>
    )
};

export default Home;