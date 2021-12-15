import React from 'react';

import UserCompact from './userCompact';

const UserList = ({ users }) => {
    const isUserListEmpty = (users[0].body === "")

    let userList = <div className="alert">No users to show!</div>

    if (!isUserListEmpty) {
        userList = users.map((value, index) => {
            return (
                <div key={index} className="user-list-item">
                    <UserCompact userContent={value} />
                </div>
            )
        })
    }

    return (
        <div className="user-list">{userList}</div>
    )
}

export default UserList;