import s from './Profile.module.css'

export default function Profile(displayName, tweetsCount) {
  return (
    <div className={s.container}>
      <div className={s.displayName}>{displayName}</div>
      <div className={s.tweetsCount}>{tweetsCount}</div>
    </div>
  )
}
