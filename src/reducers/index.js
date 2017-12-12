import { combineReducers } from 'redux'
import map from './map'
import player from './player'

const combinedReducers = combineReducers({
  map,
  player
})

export default combinedReducers;