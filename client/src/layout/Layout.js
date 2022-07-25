import s from './Layout.module.css'
import Navbar from '../components/Navbar/Navbar'
import FollowSuggestion from '../components/FollowSuggestion/FollowSuggestion'

const Layout = props => {
  return (
    <div className={s.container}>
      <div className={s.navbarWrapper}>
        <div className={s.navbar}>
          <Navbar />
        </div>
      </div>
      <div className={s.mainWrapper}>
        <div className={s.main}>
          <div className={s.left}>{props.children}</div>
          <div className={s.right}>
            <div className={s.follow}>
              <FollowSuggestion />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
