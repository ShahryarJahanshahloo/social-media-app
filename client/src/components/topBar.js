import React from "react"

const TopBar = ({ Left, Middle, Right }) => {

    return (
        <div className="top-bar">
            <div className="top-bar-flex">
                <div className="top-bar-flex-item-side">
                    {Left}
                </div>
                <div className="top-bar-flex-item-middle">
                    {Middle}
                </div>
                <div className="top-bar-flex-item-side">
                    {Right}
                </div>
            </div>
        </div>
    )
}

export default TopBar