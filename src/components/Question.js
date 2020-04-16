import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../css/Question.css'

class Question extends Component {
  state = {
    option: '',
  }

  handleOptionChange = (e) => {
    this.setState({
      option: e.currentTarget.value,
    })
  }

  toQuestion = (id) => {
    this.props.history.push(`/questions/${id}`)
  }

  render() {
    const { question, user } = this.props

    const { optionOne } = question
    const userId = user.id
    const userAvatar = user.avatarURL
    const questionId = question.id

    return (
      <div className="question-container">
        <div className="container-header">
          <p>
            <b>{userId}</b> asks:
          </p>
        </div>
        <div className="container-content">
          <div className="photo">
            <img src={process.env.PUBLIC_URL + userAvatar} alt="User" />
          </div>
          <div className="details">
            <h2>Would you rather...</h2>

            <div>
              <p>{optionOne.text} OR ...</p>
              <button onClick={() => this.toQuestion(questionId)}>
                View Poll
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id]

  return {
    question,
    user: users[question.author],
  }
}

export default withRouter(connect(mapStateToProps)(Question))
