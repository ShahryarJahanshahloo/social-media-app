import React, { useEffect } from 'react';
import axios from "axios"

const TweetList = ({ tweets, setTweets }) => {
    const jwt = localStorage.getItem("jwt")

    useEffect(() => {
        axios({
            url: "/api/home",
            method: 'get',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            params: { skip: 0 }
        })
            .then((response) => {
                setTweets((prevState) => {
                    return { data: response.data.tweets }
                })
            })
            .catch((e) => { console.log(e) })
    }, [])

    const tweetList = tweets.map((value, index) => {
        return (
            <div key={index}>
                <br />
                {value.body} <br />
                likes: {value.likes} <br />
                by: {value.owner.displayName} <br />
            </div>
        )
    })

    return (
        <div>{tweetList}</div>
    )
}

export default TweetList