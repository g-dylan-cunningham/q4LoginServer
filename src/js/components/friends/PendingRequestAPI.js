import React, { Component } from 'react';
import axios from 'axios';
import PendingRequest from './PendingRequest';


class PendingRequestAPI extends Component {
  constructor() {
    super();
    this.state = {
      theFriend: null,
      updated: false
    }
  }

  componentWillMount(){
    let friendId = parseInt(this.props.friendId);
    // console.log('eventId', eventId);

    axios.get(`http://localhost:1337/users/${friendId}`)
      .then(res => {
        const theFriend = res.data;
        this.setState({
          theFriend: theFriend,
          updated: true
        });
      });
  }




  render () {
    // console.log('PendingRequestAPI', this.state.theFriend);


    return (


      <div className="friendsContainer ">
        {this.state.updated ? <PendingRequest theFriend={this.state.theFriend} userId={this.props.userId} friendRequests={this.props.friendRequests}/> : 'not updated'}
      </div>


    )

  }
}
export default PendingRequestAPI;
