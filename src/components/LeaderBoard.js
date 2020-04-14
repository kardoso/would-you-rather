import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import '../css/LeaderBoard.css'

class LeaderBoard extends Component {
  render() {
    const { userIds } = this.props
    return (
      <div className="leader-board-container">
        <ul className="users-list">
          {userIds === null
            ? null
            : userIds.map((id) => (
                <li key={id} className="users-list-item">
                  <UserCard id={id} />
                </li>
              ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const userScore = (user) =>
    Object.keys(user.answers).length + user.questions.length

  const sortedUsers = Object.values(users).sort(
    (a, b) => userScore(b) - userScore(a)
  )

  return {
    userIds: sortedUsers.map((user) => user.id),
    authedUser,
  }
}

export default connect(mapStateToProps)(LeaderBoard)
