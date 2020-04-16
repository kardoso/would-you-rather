import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'
import '../css/DashBoard.css'

class DashBoard extends Component {
  state = {
    showAnswered: false,
  }

  handleShowAnswered = (showAnswered) => {
    this.setState(() => ({
      showAnswered,
    }))
    this.forceUpdate()
  }

  render() {
    const { questionIds, users, authedUser } = this.props

    const unansweredQuestions = questionIds.filter(
      (id) => !users[authedUser].answers.hasOwnProperty(id)
    )
    const answeredQuestions = questionIds.filter((id) =>
      users[authedUser].answers.hasOwnProperty(id)
    )

    const currentQuestionIds = this.state.showAnswered
      ? answeredQuestions
      : unansweredQuestions
    return (
      <div className="dashboard">
        <div className="dashboard-choicer">
          <button
            onClick={() => this.handleShowAnswered(false)}
            className={`${
              this.state.showAnswered
                ? 'deactivated-button'
                : 'activated-button'
            }`}
          >
            Unanswered questions
          </button>
          <button
            onClick={() => this.handleShowAnswered(true)}
            className={`${
              this.state.showAnswered
                ? 'activated-button'
                : 'deactivated-button'
            }`}
          >
            Answered questions
          </button>
        </div>

        {authedUser ? (
          <ul className="questions-list">
            {currentQuestionIds === null
              ? null
              : currentQuestionIds.map((id) => (
                  <li key={id} className="questions-list-item">
                    <Question id={id} />
                  </li>
                ))}
          </ul>
        ) : (
          <Redirect to="/login"></Redirect>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )

  return {
    authedUser,
    questionIds,
    users,
  }
}

export default connect(mapStateToProps)(DashBoard)
