import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/UserCard.css'

class UserCard extends Component {
  render() {
    const { user, answeredQuestions, createdQuestions } = this.props
    return (
      <div className="card-container">
        <div className="card-img">
          <img src={user.avatarURL} alt="Creator" />
        </div>
        <div className="card-user-data">
          <h3>{user.name}</h3>
          <div className="card-user-data-results">
            <p>Answered questions:</p>
            <p>{answeredQuestions}</p>
          </div>
          <hr/>
          <div className="card-user-data-results">
            <p>Created questions:</p>
            <p>{createdQuestions}</p>
          </div>
        </div>
        <div className="card-user-score">
          <div className="score-header">
            <p>Score</p>
          </div>
          <div className="score-body">
            <div className="score-circle">
              <p>{answeredQuestions + createdQuestions}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }, { id }) {
  const answeredQuestions = Object.keys(users[id].answers).length
  const createdQuestions = users[id].questions.length

  return {
    user: users[id],
    answeredQuestions,
    createdQuestions,
  }
}

export default connect(mapStateToProps)(UserCard)
