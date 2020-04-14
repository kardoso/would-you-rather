import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { unsetAuthedUser } from '../actions/authedUser'
import '../css/Nav.css'

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props

    dispatch(unsetAuthedUser())
  }

  render() {
    const { authedUser, user } = this.props
    return (
      <header className="header">
        <nav className="container">
          <ul>
            <li>
              {/*TODO: Link to Home*/}
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              {/*TODO: Link to add a new question*/}
              <NavLink to="/new">New Question</NavLink>
            </li>
            <li>
              {/*TODO: Link to leader board*/}
              <NavLink to="/rank">Leader Board</NavLink>
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
                <NavLink to="/login" onClick={this.handleLogout}>
                  Logout
                </NavLink>
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

export default connect(mapStateToProps)(Nav)
