import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import '../css/App.css'
import Nav from './Nav'
import DashBoard from './DashBoard'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import { setAuthedUser } from '../actions/authedUser'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    this.props.dispatch(setAuthedUser('sarahedo'))
  }
  render() {
    return (
      <Router>
        <LoadingBar />
        <div>
          <Nav />
          <div>
            <Route path="/" exact component={DashBoard} />
            <Route path="/new" component={NewQuestion} />
            <Route path="/rank" component={LeaderBoard} />
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)
