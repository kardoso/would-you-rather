import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import '../css/App.css'
import Nav from './Nav'
import DashBoard from './DashBoard'
import { setAuthedUser } from '../actions/authedUser'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    this.props.dispatch(setAuthedUser('sarahedo'))
  }
  render() {
    return (
      <div className="container">
        <Nav />
        <DashBoard />
      </div>
    )
  }
}

export default connect()(App)
