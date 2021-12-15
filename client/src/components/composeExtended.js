import React, { useState, useRef } from 'react';
import axios from "axios"
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import Avatar from "./avatar"
import TopBar from './topBar';

import {
    BiArrowBack as BackIcon,
} from "react-icons/bi"

const ComposeExtended = () => {
    const username = useSelector(state => state.userReducer.username)
    const jwt = localStorage.getItem("jwt")
    const history = useHistory()
    const [tweetBody, setTweetBody] = useState("")
    const [tweetBtnClass, setTweetBtnClass] = useState("tweet-button disabledButton")

    const backButtonHandler = () => {
        history.push("/home")
    }

    const tweetBtnHandler = () => {
        //validate tweet body!
        axios({
            method: "post",
            url: "/api/compose",
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            data: {
                body: tweetBody
            },
        })
            .then((res) => {
                if (res.status == "200") history.push("/home")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const textAreaOnChange = (e) => {
        let bodyLength = e.target.value.length
        if (e.target.value.trim() != "") {
            setTweetBtnClass("tweet-button")
        } else {
            setTweetBtnClass("tweet-button disabledButton")
        }

        if (bodyLength > 255) {
            setTweetBtnClass("tweet-button disabledButton")
        } else if (bodyLength > 1) {
            setTweetBtnClass("tweet-button")
            setTweetBody(e.target.value)
        }
    }

    const left = () =>
        <div className="back-button-wrapper">
            <div className="back-button" onClick={backButtonHandler}>
                <BackIcon style={{ fontSize: "1.25em" }} />
            </div>
        </div>

    const middle = () =>
        <div></div>

    const right = () =>
        <button className={tweetBtnClass} disabled={tweetBody == ""}
            onClick={tweetBtnHandler}>Tweet</button>

    return (
        <div className="composeExtended">
            <TopBar Left={left} Middle={middle} Right={right} />
            <div className="compose-main">
                <div className="compose-box">
                    <div className="compose-avatar-bar">
                        <div className="compose-avatar">
                            <Avatar username={username} size="48" />
                        </div>
                    </div>
                    <div className="compose-area-wrapper">
                        <textarea className="compose-text-area" onChange={textAreaOnChange}
                            placeholder="What's Happening?"></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComposeExtended