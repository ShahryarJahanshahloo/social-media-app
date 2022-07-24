import s from './BackButton.module.css'
import { useHistory } from 'react-router-dom'

import { BiArrowBack as BackIcon } from 'react-icons/bi'

const BackButton = () => {
  const history = useHistory()

  const backButtonHandler = () => {
    history.goBack()
  }

  return (
    <div>
      <div onClick={backButtonHandler}>
        <BackIcon style={{ fontSize: '1.25em' }} />
      </div>
    </div>
  )
}

export default BackButton
