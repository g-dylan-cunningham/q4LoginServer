import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FriendGroup from '../friends/FriendsGroup';
import EventsGroup from '../events/EventsGroup';
// import { bindActionCreators } from 'redux';


class Root extends Component {
  constructor() {
    super();
  }



  render () {
    if (!this.props.login.loggedIn) {
      return (
        <Redirect to={ '/login'}/>
      )
    }


    // <img src={this.props.login}
    return (
      <div className="row">
        <div className="col-md-4">
          <h1>{this.props.login.userData.username}</h1>
          <img src={this.props.login.userData.picUrl} id="mainPic"/>
          <FriendGroup />
        </div>
        <div className="col-md-8">
          <EventsGroup />

        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props){
  return {
    login: state.login
  }
}

// function matchDispatchToProps(dispatch){
//   return {
//     loginAction: bindActionCreators(login, dispatch),
//   }
// }

export default connect(mapStateToProps, null)(Root);