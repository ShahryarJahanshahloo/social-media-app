import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios"

import Avatar from "./avatar"
import TweetList from './tweetList';
import Navbar from './navbar';
import FollowSuggestion from './followSuggestion';
import useTweetList from '../hooks/useTweetList';
import TopBar from './topBar';

import {
    BiArrowBack as BackIcon,
} from "react-icons/bi"

const Profile = (props) => {
    const [profile, setProfile] = useState({
        displayName: "",
        bio: "",
        tweetsCount: 0,
        followersCount: 0,
        followingsCount: 0,
    })
    let profileUsername = useParams().username
    const [tweets, loadMore] = useTweetList("/api/profileTweets", { username: profileUsername })
    const user = useSelector(state => state.userReducer)
    const isUserProfile = (profileUsername == user.username)
    const history = useHistory()

    const backButtonHandler = () => {
        history.push("/home")
    }

    useEffect(() => {
        axios({
            url: "/api/profileInfo",
            method: "get",
            params: {
                username: profileUsername
            }
        })
            .then((res) => {
                setProfile((prevState) => {
                    return {
                        displayName: res.data.displayName,
                        bio: res.data.bio,
                        tweetsCount: res.data.tweetsCount,
                        followersCount: res.data.followersCount,
                        followingsCount: res.data.followingsCount,
                    }
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    const left = 
        <div className="back-button-wrapper">
            <div className="back-button" onClick={backButtonHandler}>
                <BackIcon style={{ fontSize: "1.25em" }} />
            </div>
        </div>

    const middle = 
        <div className="top-bar-profile">
            <div className="top-bar-displayName">{profile.displayName}</div>
            <div className="top-bar-tweetCount">{profile.tweetsCount} Tweets</div>
        </div>

    const right = 
        <div></div>

    return (
        <div className="main-app">
            <div className="side-section left">
                <Navbar />
            </div>
            <div className="middle-section">
                <TopBar Left={left} Middle={middle} Right={right} />
                <div className="profile-stats-wrapper">
                    <div className="profile-stats-box">
                        <div className="user-stats-box">
                            <div className="profile-avatar-box">
                                <div className="avatar-box">
                                    <Avatar username={profileUsername} size="128" />
                                </div>
                            </div>
                            <div className="profile-text-box">
                                <div className="profile-username-box">{profileUsername}</div>
                                <div className="profile-displayName-box">{profile.displayName}</div>
                                <div className="profile-bio-box">{profile.bio}</div>
                            </div>
                        </div>
                        <div className="follow-stats-box">
                            <div className="follow-stats-item">
                                <div>
                                    <div className="followers-stats">Followers</div>
                                    <div>{profile.followersCount}</div>
                                </div>
                            </div>
                            <div className="follow-stats-item">
                                <div>
                                    <div className="followings-stats">Followings</div>
                                    <div>{profile.followingsCount}</div>
                                </div>
                            </div>
                            <div className="follow-stats-item">
                                <div>
                                    <div className="follow-button">
                                //button
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tweets-navbar">
                        <div className="tweets-navbar-item">
                            <label>Tweets</label>
                        </div>
                        <div className="tweets-navbar-item">
                            <label>Tweets & replies</label>
                        </div>
                    </div>
                </div>
                <TweetList tweets={tweets} />
                {tweets[0].body == "" ? null :<button className="load-more" onClick={loadMore}>load more</button>}
            </div>

            <div className="side-section right">
                <FollowSuggestion />
            </div>
        </div>
    )
}

export default Profile;