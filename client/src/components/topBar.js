import React from "react"

const TopBar = ({ Left, Middle, Right }) => {

    return (
        <div className="title-bar">
            <div className="title-bar-flex">
                <div className="title-bar-flex-item-side">
                    <Left />
                </div>
                <div className="title-bar-flex-item-middle">
                    <Middle />
                </div>
                <div className="title-bar-flex-item-side">
                    <Right />
                </div>
            </div>
        </div>
    )
}

export default TopBar