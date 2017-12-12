import {initialStoreState, constantValues, mapData} from '../constants'


const player = (state = initialStoreState.player, action) => {

    if (!action.event){
        return state;
    }

    const updateValue = (attribute, multiplier) => {
        return parseInt(state[attribute], 10) + (constantValues.pxPerMove * multiplier);
    }

    /**
     * Updates stage of motion
     */
    const updateMotion = () => {
        if (state.motion === 3){
            //final motion, return back to the first stage
            return 0;
        } else {
            //Go to the next stage in the animation
            return state.motion + 1;
        }
    }

    /**
     * Whether we are going in the same direction as the last movement
     * @param {int} direction 
     */
    const amIgoingTheSameDirection = (direction)=>{
        return direction === state.direction;
    }

    const canIGoToNextSquare = function(obj){
        //Next "column" user is trying to navigate to
        const column =  mapData.palletTown.blockers[obj.posX];

        return (!column) || column.indexOf(obj.posY) === -1;
    }

    const updatePlayer = (attribute, multiplier, direction) => {
        if (amIgoingTheSameDirection(direction)){
            //actually move in that direction

            //Setting attribute to tempory object
            let tempPositionObj = {};
            tempPositionObj[attribute] = updateValue(attribute, multiplier);

            //Creating a new object with the new position
            let tempState = {
                ...state,
                ...tempPositionObj
            }

            if (canIGoToNextSquare(tempState)){
                //we can go to the next square, go there
                //use the new position we have caluated plus motion
                return {
                    ...tempState,
                    motion : updateMotion()
                }
            } else {
                //We CANNOT go to the next square, just update the motion (character will run on the spot)
                return {
                    ...state,
                    motion : updateMotion()
                }
            }

            
        } else {
            //going new direction, just rotate the player
            return {
                ...state,
                direction : direction
            }
        }
    }

    switch (action.event.code){
        case 'ArrowDown': 
            return updatePlayer('posY', 1, 0);

        case 'ArrowUp':
            return updatePlayer('posY', -1, 1);

        case 'ArrowRight':
            return updatePlayer('posX', 1, 2);

        case 'ArrowLeft':
            return updatePlayer('posX', -1, 3);

        default:
            return state
    }
}
export default player;