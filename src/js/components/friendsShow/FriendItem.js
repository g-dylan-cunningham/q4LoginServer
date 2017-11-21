import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { putFriendRequestArray } from '../../actions/getFriends';

class FriendItem extends Component {
  constructor() {
    super();
    this.state = {
      requested: false
    }
  }

  updated = () =>{
    this.setState({
      requested: true
    })
  }

  render () {

    let getFriend = this.props.getFriend
    let friendId = getFriend.friend[0].id;
    let isFriend = null;

    // having issues with this request being slow
    if(this.props.login.userData.friends){
      console.log('inside friendItem if');
      let loggedInUsersFriends = this.props.login.userData.friends
      console.log('login', loggedInUsersFriends);
      isFriend = false;
      if(loggedInUsersFriends.includes(friendId)){
        console.log('they are a friend');
        isFriend = true;
      }

    }

    let invite = () => {
      let friendObj = getFriend.friend[0];
      console.log('friendObj["friendRequestsArr"]');
      if(friendObj["friendRequestsArr"]){
        var arr = friendObj["friendRequestsArr"];
      } else {
        arr = []
      }
      console.log('arr', arr);
      console.log('friendObj id');
      let updatedArr = arr.concat(friendObj.id)
      console.log('updatedArr', updatedArr);
      this.props.putFriendRequestArrayAction(updatedArr, friendObj.id)
      this.updated()
    }

    if(!this.props.login.userData){
      return <div>No login data</div>
    }

    return (

      <div>
        <h2>{getFriend.friend[0].username}</h2>
        <div>{isFriend ? "Friends" : this.state.requested ? "friendship requested" : <button onClick={invite}>add friend</button>}</div>

        <img src={getFriend.friend[0].picUrl}/>
      </div>
    )
  }
}

function mapStateToProps(state, props){
  return {
    login: state.login
  }
}

function matchDispatchToProps(dispatch){
  return {
    putFriendRequestArrayAction: bindActionCreators(putFriendRequestArray, dispatch),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(FriendItem);
