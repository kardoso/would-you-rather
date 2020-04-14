import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'
import '../css/NewQuestion.css'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleOptionOneChange = (event) => {
    event.persist()
    this.setState(() => ({ optionOne: event.target.value }))
  }

  handleOptionTwoChange = (event) => {
    event.persist()
    this.setState(() => ({ optionTwo: event.target.value }))
  }

  handleCreateQuestion = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo))

    this.setState(() => ({ toHome: true }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

    const { authedUser, loading } = this.props

    if (toHome) {
      return <Redirect to="/" />
    }

    if (!authedUser && !loading) {
      return <Redirect to="/login" />
    }

    return (
      <div className="new-question">
        <div className="new-question-container">
          <div className="new-question-container-header">
            <p>Create New Question</p>
          </div>
          <div className="new-question-container-content">
            <p>Complete the question</p>
            <h2>Would you rather...</h2>
            <form onSubmit={this.handleCreateQuestion}>
              <input
                type="text"
                placeholder="Enter option one here"
                value={optionOne}
                onChange={this.handleOptionOneChange}
              />
              <p>OR</p>
              <input
                type="text"
                placeholder="Enter option two here"
                value={optionTwo}
                onChange={this.handleOptionTwoChange}
              />
              <button
                type="submit"
                className="submit-button"
                disabled={optionOne === '' || optionTwo === ''}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, loading }) {
  return { authedUser, loading }
}

export default connect(mapStateToProps)(NewQuestion)
