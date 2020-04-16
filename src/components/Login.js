import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    return (
      <div>
        <p>Login</p>
      </div>
    )
  }
}

export default connect()(Login)
