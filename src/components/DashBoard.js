import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashBoard extends Component {
  render() {
    const { questionIds } = this.props
    console.log(questionIds)
    return (
      <div>
        <ul>
          {questionIds === null
            ? null
            : questionIds.map((id) => <li key={id}>{id}</li>)}
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
