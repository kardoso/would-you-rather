import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser'
import '../css/Nav.css'

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props

    dispatch(unsetAuthedUser())

    this.props.history.push(`/login`)
  }

  render() {
    const { authedUser, user } = this.props
    return (
      <header className="header">
        <nav className="container">
          <ul>
            <li>
              {/*TODO: Link to Home*/}
              <Link to={authedUser ? '/' : '/login'}>Home</Link>
            </li>
            <li>
              {/*TODO: Link to add a new question*/}
              <Link to={authedUser ? '/new' : '/login'}>New Question</Link>
            </li>
            <li>
              {/*TODO: Link to leader board*/}
              <Link to={authedUser ? '/rank' : '/login'}>Leader Board</Link>
            </li>
          </ul>
          {authedUser === null ? null : (
            <div className="header-user">
              <div className="header-user-info">
                <p>Hello, {user ? user.name : 'user'}</p>
                <img
                  src={user ? process.env.PUBLIC_URL + user.avatarURL : ''}
                  alt="User"
                />
              </div>
              <div>
                {/*TODO: Logout user*/}
                <Link to='/login' onClick={this.handleLogout}>Logout</Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users === null ? null : users[authedUser],
  }
}

export default withRouter(connect(mapStateToProps)(Nav))
