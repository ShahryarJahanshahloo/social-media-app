import React from "react";
import ReactRoundedImage from "react-rounded-image";

const Avatar = ({img, size}) => {

    return (
        <div className="avatar-wrapper">
            <ReactRoundedImage 
            image={img}
            imageWidth={size}
            imageHeight={size}
            roundedSize=""
            />
        </div>
    )
}

export default Avatar