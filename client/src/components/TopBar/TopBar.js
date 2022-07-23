import React from 'react'

import s from './TopBar.module.css'

const TopBar = ({ Left, Middle, Right, needsDesktop = false }) => {
  const leftClass = needsDesktop ? `${s.side} ${s.desktop}` : s.side

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
