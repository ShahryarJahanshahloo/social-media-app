import React, { useState, useRef } from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';

const Compose = ({ setTweets }) => {
    const [tweetBody, setTweetBody] = useState(null)
    const user = useSelector(state => state.userReducer)
    const inputRef = useRef()
    const jwt = localStorage.getItem("jwt")

    const inputHandler = (e) => {
        setTweetBody((prevState) => {
            return (e.target.value)
        })
    }

    const buttonHandler = () => {
        axios({
            method: "post",
            url: "/api/compose",
            body: {
                body: tweetBody,
            },
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
        })
            .then((res) => {
                setTweetBody("")
                inputRef.current.value = ""
                setTweets((prevState) => {
                    const newState = { data: [] }
                    newState.data.push(...prevState.data)
                    newState.data.unshift({
                        body: res.data.body,
                        likes: 0,
                        owner: {
                            displayName: user.displayName,
                    }
                    })
                    return newState
                })
            })
            .catch((e) => console.log(e))
    }

    return (
        <div>
            <input type="text" placeholder="What's happeening?" 
            onChange={inputHandler} 
            ref={inputRef}></input>
            <input type="button" value="Tweet" onClick={buttonHandler}></input>
        </div>
    )
}

export default Compose;