import React from 'react'

import UserCompact from '../UserCompact/UserCompact'

const UserList = ({ users, alt }) => {
  const isUserListEmpty = users.length === 0

  let userList = <div className='alert'></div>

  if (alt != null) userList = alt

  if (!isUserListEmpty) {
    userList = users.map((value, index) => {
      return (
        <div key={index}>
          <UserCompact userContent={value} />
        </div>
      )
    })
  }

  return <div>{userList}</div>
}

export default UserList
