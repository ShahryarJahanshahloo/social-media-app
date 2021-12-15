import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from "./navbar";
import ComposeCompact from "./composeCompact"
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import TitleBar from './titleBar';
import useTweetList from '../hooks/useTweetList';

const Home = () => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)

    if (!isLoggedIn) {
        history.push("/login")
    }

    const [tweets, loadMore, setTweets] = useTweetList("/api/home", {})

    return (
        <div className="main-app">
            <div className="side-section">
                <Navbar />
            </div>
            <div className="middle-section">
                <TitleBar />
                <div className="compose-tweet-box">
                    <ComposeCompact setTweets={setTweets} />
                </div>
                <TweetList tweets={tweets} />
                <button className="load-more" onClick={loadMore}>:</button>
            </div>
            <div className="side-section suggestion">
                <FollowSuggestion />
            </div>
        </div>
    )
};

export default Home;