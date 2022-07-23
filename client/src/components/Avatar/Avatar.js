import React from 'react'
import ReactRoundedImage from 'react-rounded-image'
import styles from './Avatar.css'

const Avatar = ({ username, size }) => {
  return (
    <div className={styles.wrapper}>
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
