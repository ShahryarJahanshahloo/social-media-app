import React from "react"

const TopBar = ({ Left, Middle, Right, needsDesktop = false }) => {
    const leftClass = needsDesktop ? "top-bar-flex-item-side top-bar-desktop" : "top-bar-flex-item-side"

    return (
        <div className="top-bar">
            <div className="top-bar-flex">
                <div className={leftClass}>
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