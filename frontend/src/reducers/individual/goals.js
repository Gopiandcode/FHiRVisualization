import {
    CREATE_GOAL,
    CREATE_GOAL_SUCCESS,
    CREATE_GOAL_ERROR,

    LOAD_GOAL,
    LOAD_GOAL_SUCCESS,
    LOAD_GOAL_ERROR,

    UPDATE_GOAL,
    UPDATE_GOAL_SUCCESS,
    UPDATE_GOAL_ERROR,

    REMOVE_GOAL,
    REMOVE_GOAL_SUCCESS,
    REMOVE_GOAL_ERROR
} from "constants/individual/goals";

const goals = (state = {
    goals: [
        /*
         {
         name: "",
         dataType: "",
         value: 100,
         period: 0,
         colour: colour
         }
         */
    ],
    validPeriods: ['DAY', 'WEEK', 'FORTNIGHT', 'MONTH'],
    isWaiting: false,
    hasErrored: false,
    errorMsg: ""
}, action) => {
    switch (action.type) {
        case LOAD_GOAL: {
            console.log("Loading goals");
            return Object.assign({}, state, {isWaiting: true});
        }
        case LOAD_GOAL_SUCCESS: {
            let goals = action.data.goals.map((goal) => {
                return {
                    name: goal.name,
                    dataType: goal.dataType,
                    value: goal.value,
                    period: goal.period,
                    colour: goal.colour
                };
            });
            return Object.assign({}, state, {
                isWaiting: false,
                goals: goals
            });
        }
        case LOAD_GOAL_ERROR: {
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
        }
        case CREATE_GOAL: {
            return Object.assign({}, state, {isWaiting: true});
        }

        case CREATE_GOAL_SUCCESS: {
            let goal = action.data.goal;
            let goals = [...state.goals];
            goals.push({
                name: goal.name,
                dataType: goal.dataType,
                value: goal.value,
                period: goal.period,
                colour: goal.colour
            });
            return Object.assign({}, state, {isWaiting: false, goals: goals});
        }


        case CREATE_GOAL_ERROR: {
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
        }
        case UPDATE_GOAL: {
            return Object.assign({}, state, {isWaiting: true});
        }

        case UPDATE_GOAL_SUCCESS: {
            let updatedGoal = action.data.goal;
            let goals = state.goals.map((goal) => {
                if (goal.name !== updatedGoal.name) {
                    return goal;
                } else {
                    return {
                        name: updatedGoal.name,
                        dataType: updatedGoal.dataType,
                        value: updatedGoal.value,
                        period: updatedGoal.period,
                        colour: updatedGoal.colour
                    };
                }
            });
            return Object.assign({}, state, {isWaiting: false, goals: goals});
        }


        case UPDATE_GOAL_ERROR: {
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
        }

        case REMOVE_GOAL: {
            return Object.assign({}, state, {isWaiting: true});
        }


        case REMOVE_GOAL_SUCCESS: {
            let removedGoal = action.data.goal;
            let goals = state.goals.filter(goal => goal.name !== removedGoal.name);
            return Object.assign({}, state, {isWaiting: false, goals: goals});
        }

        case REMOVE_GOAL_ERROR: {
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
        }

        default:
            // VERY IMPORTANT
            return state;
    }
};


export default goals;
