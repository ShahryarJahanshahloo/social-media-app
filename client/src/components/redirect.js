import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios"

const Redirect = (props) => {
    const history = useHistory()
    const jwt = localStorage.getItem("jwt")

    useEffect(() => {
        if (jwt !== null) {
            try {
                axios({
                    method: "post",
                    url: "/api/authenticate",
                    headers: {
                        // "Accept": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": true
                    },
                })
                    .then((res) => {
                        if (res.data.isAuthenticated == true) {
                            history.push("/home")
                        } else {
                            history.push("/login")
                        }
                    })
                    .catch((e) => history.push("/login"))
            } catch (e) {
                history.push("/login")
            }
        } else {
            history.push("/login")
        }
    }, [])


    return (
        <div>please wait...</div>
    )
}

export default Redirect;