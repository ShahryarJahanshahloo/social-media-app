import React from 'react'

import s from './TopBar.module.css'
import BackButton from '../BackButton/BackButton'

const TopBar = ({
  Left = BackButton,
  Middle,
  Right = <div></div>,
  desktop = false,
}) => {
  const leftClass = desktop ? `${s.side} ${s.desktop}` : s.side

  return (
    <div className={s.container}>
      <div className={s.flex}>
        <div className={leftClass}>{Left}</div>
        <div className={s.middle}>{Middle}</div>
        <div className={s.side}>{Right}</div>
      </div>
    </div>
  )
}

export default TopBar
