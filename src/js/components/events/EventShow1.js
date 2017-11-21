import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventShow2 from './EventShow2';
import { getFriends } from '../../actions/getFriends'

class EventShow1 extends Component {
  constructor() {
    super();
    this.state = {
      updated: false
    }
  }
  // console.log('eventShow1 elem: ', this.props.elem);
  componentDidMount(){
    this.props.getFriendsAction()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.getFriends != this.props.getFriends){
      // console.log("nextProps has changed in EventShow1")
      this.setState({
        updated: true
      })
    }
  }

  render () {
    // console.log('eventShow1 getFriends', this.props.getFriends);
    let inviteesObj = this.props.elem.invitees;
    let invitedArr = [];
    let acceptedArr = [];
    let declinedArr = [];
    let maybeArr = [];

    for (const id in inviteesObj){
      switch(inviteesObj[id]){
        case "invited":
          invitedArr.push(parseInt(id));
          break;
        case "accepted":
          acceptedArr.push(parseInt(id));
          break;
        case "declined":
          declinedArr.push(parseInt(id));
          break;
        case "maybe":
          maybeArr.push(parseInt(id));
          break;
      }
    }

    let invitedFriends
    let acceptedFriends
    let declinedFriends
    let maybeFriends

    if(this.state.updated){
      let invitedFriends =this.props.getFriends.user.filter(elem => {
        if(invitedArr.includes(elem.id)){
          return elem;
        }
      }).map(el => {
      return <EventShow2 key={el.id} elem={el} status="invited" />;
      });


      acceptedFriends = this.props.getFriends.user.filter(elem => {
        if(acceptedArr.includes(elem.id)){
          return elem;
        }
      }).map(el => {
      return <EventShow2 key={el.id} elem={el} status="accepted" />;
      });


      declinedFriends = this.props.getFriends.user.filter(elem => {
        if(declinedArr.includes(elem.id)){
          return elem;
        }
      }).map(el => {
      return <EventShow2 key={el.id} elem={el} status="declined" />;
      });


      maybeFriends = this.props.getFriends.user.filter(elem => {
        if(maybeArr.includes(elem.id)){
          return elem;
        }
      }).map(el => {
      return <EventShow2 key={el.id} elem={el} status="maybe" />;
      });
    }

    return (
      <div>
        <h2>{this.props.elem.title}</h2>
        <p>{this.props.elem.body}</p>
        <img src={this.props.elem.picUrl}/>
        <div id="friendsOuterContainer">
          <h2 id="title">RSVP List</h2>
          <div className="friendsContainer">
            <div>
              {invitedFriends ? invitedFriends : "no friends have been invited"}
              {acceptedFriends ? acceptedFriends : "no friends have accepted"}
              {declinedFriends ? declinedFriends : "no friends have declined"}
              {maybeFriends ? maybeFriends : "no friends are maybe"}
            </div>
          </div>
        </div>

      </div>
    )

  }
}

function mapStateToProps(state, props){
  return {
    getFriends: state.getFriends
  }
}

function matchDispatchToProps(dispatch){
  return {
    getFriendsAction: bindActionCreators(getFriends, dispatch),
  }
}
export default connect(mapStateToProps, matchDispatchToProps)(EventShow1);