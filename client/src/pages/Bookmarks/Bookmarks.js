import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import List from '../../components/List/List'
import TopBar from '../../components/TopBar/TopBar'
import useTweetList from '../../hooks/useTweetList'
import TopBarStyles from '../../components/TopBar/Profile/Profile.module.css'

const Bookmarks = props => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector(state => state.login)
  const username = useSelector(state => state.user.username)

  if (!isLoggedIn) {
    navigate('/login')
  }

  const [tweets, loadMore] = useTweetList('/api/bookmarks', {})

  return (
    <>
      <TopBar
        desktop
        Left={<Avatar username={username} size="32" wrap />}
        Middle={<div className={TopBarStyles.titleBox}>Bookmarks</div>}
      />
      <List
        items={tweets}
        alt={{
          big: 'You haven’t added any Tweets to your Bookmarks yet',
          small: 'When you do, they’ll show up here.'
        }}
      />
      {tweets.length < 10 ? null : (
        <button className="load-more" onClick={loadMore}>
          load more tweets
        </button>
      )}
    </>
  )
}

export default Bookmarks
