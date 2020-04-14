import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
      <Router>
        <div className="container">
          <Nav />
          <div>
            <Route path="/" exact component={DashBoard} />
          </div>
        </div>
      </Router>
    )
  }
}

export default connect()(App)
