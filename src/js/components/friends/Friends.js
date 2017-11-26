import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Friend from './Friend';
import { getFriend } from '../../actions/getFriends';

class Friends extends Component {
  constructor() {
    super();
  }

  componentWillMount(){
    this.props.getFriendAction(this.props.login.userData.id)
  }

  render () {
    if(this.props.getFriends.friend){
 // console.log('friends: getFriends.friend', this.props.getFriends.friend.friends,   this.props.getFriends.friend.friendRequestsArr);
  }
    let usersFriends = null;
    if(this.props.getFriends.friend){

      let friendsList = this.props.getFriends.friend.friends

      usersFriends = this.props.getFriends.user
      .filter((elem, i) => {
        if (friendsList.includes(parseInt(elem.id))){
          return elem
        }
      })
      .map(elem => {
        return <Friend key={elem.id} elem={elem} />
      })
    }

    if(this.props.getFriends.friend){
      // if(-1 > 0){
      return (
        <div className="friendsContainer ">{usersFriends}</div>
      )

    } else {
      return <div>Not updated on Friends component</div>
    }
  }
}

function mapStateToProps(state, props){
  return {
    getFriends: state.getFriends
  }
}

function matchDispatchToProps(dispatch){
  return {
    getFriendAction: bindActionCreators(getFriend, dispatch)
  }
}
export default connect(mapStateToProps, matchDispatchToProps)(Friends);
