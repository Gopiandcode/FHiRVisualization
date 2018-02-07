import axios from "axios";
import * as types from "constants/individual/goals";
import {handleResponseError} from "error";

function beginLoadGoals() {
    return {
        type: types.LOAD_GOAL
    };
}
function loadGoalsSuccess(goals) {
    return {
        type: types.LOAD_GOAL_SUCCESS,
        data: {
            goals
        }
    };
}
function loadGoalsError(data) {
    return {
        type: types.LOAD_GOAL_ERROR,
        data
    };
}
function beginCreateGoal() {
    return {
        type: types.CREATE_GOAL
    };
}
function createGoalSuccess(new_goal) {
    return {
        type: types.CREATE_GOAL_SUCCESS,
        data: {
            goal: new_goal
        }
    };
}
function createGoalError(data) {
    return {
        type: types.CREATE_GOAL_ERROR,
        data
    };
}
function beginUpdateGoal() {
    return {
        type: types.UPDATE_GOAL
    };
}
function updateGoalSuccess(updated_goal) {
    return {
        type: types.UPDATE_GOAL_SUCCESS,
        data: {
            goal: updated_goal
        }
    };
}
function updateGoalError(data) {
    return {
        type: types.UPDATE_GOAL_ERROR,
        data
    };
}
function beginRemoveGoal() {
    return {
        type: types.REMOVE_GOAL
    };
}
function removeGoalSuccess(removed_goal) {
    return {
        type: types.REMOVE_GOAL_SUCCESS,
        data: {
            goal: removed_goal
        }
    };
}
function removeGoalError(data) {
    return {
        type: types.REMOVE_GOAL_ERROR,
        data
    };
}


export function manualLoadGoals() {
    return dispatch => {
        dispatch(beginLoadGoals());

        return axios({
            method: "get",
            url: "/api/individual/goals"
        }).then(response => {
            const goals = response.data;
            dispatch(loadGoalsSuccess(goals));
        }).catch(err => {
            dispatch(loadGoalsError(handleResponseError(err)));
        });
    };
}

export function manualCreateGoal(goal) {
    return dispatch => {
        dispatch(beginCreateGoal());
        if (!goal.name ||
            !goal.dataType ||
            !goal.value ||
            !goal.period ||
            !goal.colour) {
            console.log("Attempting to goal without required fields: " + JSON.stringify(goal));
        }

        return axios({
            method: "post",
            url: "/api/individual/goals",
            data: goal
        }).then(response => {
            let new_goal = response.data;
            dispatch(createGoalSuccess(new_goal));
        }).catch(err => {
            dispatch(createGoalError(handleResponseError(err)));
        })
    };
}

export function manualUpdateGoal(goal) {
    return dispatch => {
        dispatch(beginUpdateGoal());
        if (!goal.name ||
            !goal.dataType ||
            !goal.value ||
            !goal.period ||
            !goal.colour) {
            console.log("Attempting to goal without required fields: " + JSON.stringify(goal));
        }


        return axios({
            method: "put",
            url: "/api/individual/goals",
            data: goal
        }).then(response => {
            let updated_goal = response.data;
            dispatch(updateGoalSuccess(updated_goal));
        }).catch(err => {
            dispatch(updateGoalError(handleResponseError(err)));
        });
    }
}


export function manualRemoveGoal(name) {
    return dispatch => {
        dispatch(beginRemoveGoal());

        return axios({
            method: "delete",
            url: "/api/individual/goals",
            data: {
                name: name
            }
        }).then(response => {
            let removed_goal = response.data;
            dispatch(removeGoalSuccess(removed_goal));
        }).catch(err => {
            dispatch(removeGoalError(handleResponseError(err)));
        })
    };
}
