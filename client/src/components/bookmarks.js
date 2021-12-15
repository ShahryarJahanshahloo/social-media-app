import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from "./navbar";
import TweetList from './tweetList';
import FollowSuggestion from './followSuggestion';
import TitleBar from './titleBar';
import useTweetList from '../hooks/useTweetList';

const Bookmarks = (props) => {
    const history = useHistory()
    const isLoggedIn = useSelector(state => state.loginStatusReducer)

    if (!isLoggedIn) {
        history.push("/login")
    }

    const [tweets, loadMore] = useTweetList("/api/bookmarks", {})

    return (
        <div className="main-app">
            <div className="side-section">
                <Navbar />
            </div>
            <div className="middle-section">
                <TitleBar title="Bookmarks" composeDisplay="none" />
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