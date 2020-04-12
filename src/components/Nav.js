import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/Nav.css'

class Nav extends Component {
  render() {
    const { authedUser, user } = this.props
    return (
      <header className="header">
        <nav className="container">
          <ul>
            <li>
              {/*TODO: Link to Home*/}
              <a href="/">Home</a>
            </li>
            <li>
              {/*TODO: Link to add a new question*/}
              <a href="/">New Question</a>
            </li>
            <li>
              {/*TODO: Link to leader board*/}
              <a href="/">Leader Board</a>
            </li>
          </ul>
          {authedUser === null ? null : (
            <div className="header-user">
              <div className="header-user-info">
                <p>Hello, {user ? user.name : 'user'}</p>
                <img src={user ? user.avatarURL : ''} alt="User" />
              </div>
              <div>
                {/*TODO: Logout user*/}
                <a href="/">Logout</a>
              </div>
            </div>
          )}
        </nav>
      </header>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  // TODO: Remove forced assign of authedUser
  authedUser = authedUser || 'sarahedo'
  return {
    authedUser,
    user: users === null ? null : users[authedUser],
  }
}

export default connect(mapStateToProps)(Nav)
