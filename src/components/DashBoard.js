import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import '../css/DashBoard.css'

class DashBoard extends Component {
  state = {
    showAnswered: false,
  }

  handleShowAnswered = (showAnswered) => {
    this.setState(() => ({
      showAnswered,
    }))
  }

  render() {
    const questionIds = this.state.showAnswered
      ? this.props.answeredQuestions
      : this.props.unansweredQuestions
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
        <ul className="questions-list">
          {questionIds === null
            ? null
            : questionIds.map((id) => (
                <li key={id} className="questions-list-item">
                  <Question id={id} />
                </li>
              ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )

  const unansweredQuestions = questionIds.filter(
    (id) => !users[authedUser].answers.hasOwnProperty(id)
  )
  const answeredQuestions = questionIds.filter((id) =>
    users[authedUser].answers.hasOwnProperty(id)
  )

  // TODO: CREATE TABS TO ANSWERED AND UNANSWERED QUESTIONS

  return {
    answeredQuestions,
    unansweredQuestions,
  }
}

export default connect(mapStateToProps)(DashBoard)
