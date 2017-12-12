import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Map from '../components/map'
import Player from '../components/player'
import * as userActions from '../actions'
import {constantValues} from '../constants'


class Game extends Component {

  componentWillMount(){
    window.addEventListener("keydown", this._keyBoardAction.bind(this), false);
  } 

  componentWillUnmount(){
    window.removeEventListener("keydown", this._keyBoardAction.bind(this));
  } 

  /**
   * Returns MS of now
   */
  _getNowMS = function(){
    return new Date().getTime();
  }

  //MS of last user action
  _lastAction = null;

  /**
   * Function call when button is pressed when focused on the game
   * We only care about the arrow buttons
   * @param {*} e 
   */
  _keyBoardAction(e){
    e.preventDefault();

    if ((this._getNowMS() - constantValues.actionMinimumTime) > this._lastAction){
      //more than minimum time has passed since the last action, go ahead
      if (e.type === 'keydown' || e.type === 'keyup' ||  e.type === 'keyleft' ||  e.type === 'keyright'){
        //only care about arrow key press
        this.props.onKeyAction.arrowPress(e);

        //Set record of last action
        this._lastAction = this._getNowMS();
      } 
    }
    //else, user has pressed the button too quickly, ignore this action
  }

  render() {

    console.log(JSON.stringify(this.props.player));

    return (
      <div>
        <Map map={this.props.map}/>
        <Player player={this.props.player}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    map: state.map,
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onKeyAction: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)

