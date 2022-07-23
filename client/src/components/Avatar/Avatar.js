import React from 'react'
import ReactRoundedImage from 'react-rounded-image'
import s from './Avatar.module.css'

const Avatar = ({ username, size }) => {
  return (
    <div className={s.wrapper}>
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
