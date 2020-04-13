import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'
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

  handleSubmitAnswer = (e) => {
    e.preventDefault()

    const { dispatch, question } = this.props

    dispatch(handleAnswer(question.id, this.state.option))
  }

  render() {
    const {
      question,
      user,
      alreadyAnswered,
      votesOne,
      votesTwo,
      totalVotes,
      percentOne,
      percentTwo,
      answeredOption,
    } = this.props

    const { optionOne, optionTwo } = question
    const userId = user.id
    const userAvatar = user.avatarURL
    const questionId = question.id

    return (
      <div className="question-container">
        <div className="container-header">
          {alreadyAnswered ? (
            <p>
              Asked by <b>{userId}</b>:
            </p>
          ) : (
            <p>
              <b>{userId}</b> asks:
            </p>
          )}
        </div>
        <div className="container-content">
          <div className="photo">
            <img src={userAvatar} alt="User" />
          </div>
          {!alreadyAnswered ? (
            <div className="details">
              <h2>Would you rather...</h2>
              <form onSubmit={this.handleSubmitAnswer}>
                <div>
                  <input
                    type="radio"
                    id={`optionOne${questionId}`}
                    name="option"
                    value="optionOne"
                    onChange={this.handleOptionChange}
                    checked={this.state.option === 'optionOne'}
                  />
                  <label htmlFor={`optionOne${questionId}`}>
                    {optionOne.text}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`optionTwo${questionId}`}
                    name="option"
                    value="optionTwo"
                    onChange={this.handleOptionChange}
                    checked={this.state.option === 'optionTwo'}
                  />
                  <label htmlFor={`optionTwo${questionId}`}>
                    {optionTwo.text}
                  </label>
                </div>
                <button
                  className="submit-button"
                  type="submit"
                  disabled={this.state.option === ''}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="details">
              <h2>Results:</h2>
              <div className="results">
                <div className="option-results" style={{
                    backgroundColor:
                      answeredOption === 'optionOne' ? '#92ea92' : '#ddd',
                  }}>
                  <p className="option-text">{optionOne.text}</p>
                  <div className="percentage">
                    <div className="percentage-bar">
                      <div
                        className="bar-filler"
                        style={{ width: `${percentOne}%` }}
                      />
                      <p>{percentOne}%</p>
                    </div>
                  </div>
                  <p className="votes-text">
                    {votesOne} out of {totalVotes}
                  </p>
                </div>
                <div
                  className="option-results"
                  style={{
                    backgroundColor:
                      answeredOption === 'optionTwo' ? '#92ea92' : '#ddd',
                  }}
                >
                  <p className="option-text">{optionTwo.text}</p>
                  <div className="percentage">
                    <div className="percentage-bar">
                      <div
                        className="bar-filler"
                        style={{ width: `${percentTwo}%` }}
                      />
                      <p>{percentTwo}%</p>
                    </div>
                  </div>
                  <p className="votes-text">
                    {votesTwo} out of {totalVotes}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id]
  const votesOne = question.optionOne.votes.length
  const votesTwo = question.optionTwo.votes.length
  const totalVotes = votesOne + votesTwo
  const percentOne = ((votesOne / totalVotes) * 100).toFixed(1)
  const percentTwo = ((votesTwo / totalVotes) * 100).toFixed(1)

  return {
    question,
    user: users[question.author],
    alreadyAnswered:
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser),
    answeredOption: users[authedUser].answers[question.id] || null,
    votesOne,
    votesTwo,
    totalVotes,
    percentOne,
    percentTwo,
  }
}

export default connect(mapStateToProps)(Question)
