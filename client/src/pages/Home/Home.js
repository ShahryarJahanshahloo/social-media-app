import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Avatar from '../../components/Avatar/Avatar'
import ComposeCompact from '../../components/ComposeCompact/ComposeCompact'
import List from '../../components/List/List'
import useTweetList from '../../hooks/useTweetList'
import TopBar from '../../components/TopBar/TopBar'
import s from './Home.module.css'

import { AiFillEdit as ComposeIcon } from 'react-icons/ai'

const iconStyle = {
  fontSize: '1.6em',
  color: 'rgb(29, 155, 240)',
}

const Home = () => {
  const history = useHistory()
  const isLoggedIn = useSelector(state => state.loginStatusReducer)
  const username = useSelector(state => state.userReducer.username)

  if (!isLoggedIn) {
    history.push('/login')
  }

  const composeHandler = () => {
    history.push('/compose')
  }
  const [tweets, loadMore, setTweets] = useTweetList('/api/home', {})

  return (
    <>
      <TopBar
        desktop
        Left={<Avatar username={username} size='32' wrap />}
        Middle={<div className='title-box'>Home</div>}
        Right={
          <div className='composeIcon' onClick={composeHandler}>
            <ComposeIcon style={iconStyle} />
          </div>
        }
      />
      <div className={s.box}>
        <ComposeCompact setTweets={setTweets} />
      </div>
      <List
        tweets={tweets}
        alt={{
          big: 'What? No Tweets yet?',
          small: `This empty timeline won't be around for long. Start following
                  people and you'll see Tweets show up here.`,
        }}
      />
      {tweets.length < 10 ? null : (
        <button className='load-more' onClick={loadMore}>
          load more tweets
        </button>
      )}
    </>
  )
}

export default Home
