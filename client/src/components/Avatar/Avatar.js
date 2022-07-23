import React from 'react'
import ReactRoundedImage from 'react-rounded-image'

const Avatar = ({ username, size }) => {
  return (
    <div className='avatar-wrapper'>
      <ReactRoundedImage
        image={`/api/getAvatar?username=${username}`}
        imageWidth={size}
        imageHeight={size}
        roundedSize=''
      />
    </div>
  )
}

export default Avatar
