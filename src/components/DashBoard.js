import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import '../css/DashBoard.css'

class DashBoard extends Component {
  render() {
    const { questionIds } = this.props
    return (
      <div className="dashboard">
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

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  }
}

export default connect(mapStateToProps)(DashBoard)
