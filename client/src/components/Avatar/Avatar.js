import React from 'react'
import ReactRoundedImage from 'react-rounded-image'
import s from './Avatar.module.css'

const Avatar = ({ username, size, wrap = false }) => {
  const className = wrap ? s.wrapper : ''

  return (
    <div className={className}>
      <div className={s.container}>
        <ReactRoundedImage
          image={`/api/getAvatar?username=${username}`}
          imageWidth={size}
          imageHeight={size}
          roundedSize=''
        />
      </div>
    </div>
  )
}

export default Avatar
