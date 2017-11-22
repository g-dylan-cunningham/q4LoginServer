import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFriends } from '../../../actions/getFriends';
import { Link } from 'react-router-dom';


class Friend extends Component {
  constructor() {
    super();
  }

  render () {
    let pathid = "/friends/" + this.props.elem.id

    return (

        <Link to={pathid} className="link friendBox">

            <div className="friendNameBox">
              {this.props.elem.username}
            </div>

            <div className="friendImageBox">
              <img src={this.props.elem.picUrl} className="friendImageImg"/>
            </div>

        </Link>


    )
  }
}

function mapStateToProps(state, props){
  return {
    getFriends: state.getFriends
  }
}

// function matchDispatchToProps(dispatch){
//   return {
//     getFriendsAction: bindActionCreators(getFriends, dispatch),
//   }
// }

export default connect(mapStateToProps, null)(Friend);
