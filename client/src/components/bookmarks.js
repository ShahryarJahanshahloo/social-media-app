import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from './avatar';
import Navbar from "./navbar";
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import TopBar from './topBar';
import useTweetList from '../hooks/useTweetList';

const Bookmarks = (props) => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)
    const username = useSelector(state => state.userReducer.username)

    if (!isLoggedIn) {
        history.push("/login")
    }

    const [tweets, loadMore] = useTweetList("/api/bookmarks", {})

    const left = () =>
        <div className="avatar-box">
            <Avatar username={username} size="32" />
        </div>

    const middle = () =>
        <div className="title-box">
            Bookmarks
        </div>

    const right = () =>
        <div></div>

    return (
        <div className="main-app">
            <div className="side-section">
                <Navbar />
            </div>
            <div className="middle-section">
                <TopBar Left={left} Middle={middle} Right={right} />
                <TweetList tweets={tweets} />
                <button className="load-more" onClick={loadMore}>:</button>
            </div>
            <div className="side-section suggestion">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default Bookmarks;