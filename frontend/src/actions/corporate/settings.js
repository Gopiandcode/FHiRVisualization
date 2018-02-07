import axios from "axios";
import {handleResponseError} from "error";

import {
    LOAD_ASSOCIATED_USERS,
    LOAD_ASSOCIATED_USERS_SUCCESS,
    LOAD_ASSOCIATED_USERS_ERROR,
    REMOVE_ASSOCIATED_USER,
    REMOVE_ASSOCIATED_USER_SUCCESS,
    REMOVE_ASSOCIATED_USER_ERROR,
} from "constants/corporate/settings";


function beginLoadAssociatedUsers() {
    return {
        type: LOAD_ASSOCIATED_USERS
    };
}
function loadAssociatedUsersSuccess(users) {
    return {
        type: LOAD_ASSOCIATED_USERS_SUCCESS,
        data: {
            users
        }
    };
}
function loadAssociatedUsersError(data) {
    return {
        type: LOAD_ASSOCIATED_USERS_ERROR,
        data
    };
}


function beginRemoveAssociatedUser() {
    return {
        type: REMOVE_ASSOCIATED_USER
    };
}

function removeAssociatedUserSuccess(email) {
    return {
        type: REMOVE_ASSOCIATED_USER_SUCCESS,
        data: {
            email
        }
    };
}

function removeAssociatedUserError(data) {
    return {
        type: REMOVE_ASSOCIATED_USER_ERROR,
        data
    };
}


export function manualLoadAssociatedUsers() {
    return dispatch => {
        dispatch(beginLoadAssociatedUsers());
        return axios({
            method: "get",
            url: "/api/corporate/associations"
        }).then((response) => {
            let users = response.data;
            dispatch(loadAssociatedUsersSuccess(users));
        }).catch(err => {
            dispatch(loadAssociatedUsersError(handleResponseError(err)));
        });
    };
}

export function manualRemoveAssociatedUser(email) {
    return dispatch => {
        dispatch(beginRemoveAssociatedUser());
        return axios({
            method: "delete",
            url: "/api/corporate/associations",
            data: {
                email
            }
        }).then(response => {
            dispatch(removeAssociatedUserSuccess(email));
        }).catch(err => {
            dispatch(removeAssociatedUserError(handleResponseError(err)));
        });
    }
}
