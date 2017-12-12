import React from 'react'
import playerSprite from '../images/playerSprite.png'
import {spriteActions, constantValues} from '../constants'
import "../styles/player.css"

const _getStyle = (playerObj = {}) => {

  const delayTime = (constantValues.moveMS/1000).toFixed(2);

  return {
    backgroundImage: `url(${playerSprite})`,
    'backgroundPositionY' : spriteActions[playerObj.direction][playerObj.motion].y,
    'backgroundPositionX' : spriteActions[playerObj.direction][playerObj.motion].x,
    'top' : playerObj.posY,
    'left' : playerObj.posX,
    'transition' : 'left ' + delayTime + 's, top ' + delayTime +  's',
    'WebkitTransition'  : 'left ' + delayTime + 's, top ' + delayTime + 's',
    'transitionTimingFunction' : 'linear'
  }
}

const Player = ({player}) => (
  <div style={_getStyle(player)} className="player" alt="player"/>
)

export default Player
