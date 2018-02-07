import axios from "axios";
import * as types from "constants/individual/settings";


function beginLoadSettings() {
    return {type: types.LOAD_SETTINGS};
}

function loadSettingsSuccess(data) {
    return {
        type: types.LOAD_SETTINGS_SUCCESS,
        data
    };
}

function loadSettingsError(data) {
    return {
        type: types.LOAD_SETTINGS_ERROR,
        data
    };
}

function beginAddAssociation() {
    return {
        type: types.ADD_ASSOCIATION
    };
}

function addAssociationSuccess(data) {
    return {
        type: types.ADD_ASSOCIATION_SUCCESS,
        data
    };
}

function addAssociationError(data) {
    return {
        type: types.ADD_ASSOCIATION_ERROR,
        data
    }
}

function beginRemoveAssociation() {
    return {
        type: types.REMOVE_ASSOCIATION
    };
}

function removeAssociationSuccess(data) {
    return {
        type: types.REMOVE_ASSOCIATION_SUCCESS,
        data
    }
}

function removeAssociationError(data) {
    return {
        type: types.REMOVE_ASSOCIATION_FAILURE,
        data
    }
}


export function manualLoadSettings() {
    return dispatch => {
        dispatch(beginLoadSettings());
        return axios({
            method: "get",
            url: "/api/individual/associations"
        }).then(response => {
            if (!response.data.error) {
                dispatch(loadSettingsSuccess(response.data));
            } else {
                dispatch(loadSettingsError(response.data));
            }
        }).catch(err => {
            dispatch(loadSettingsError({error: JSON.stringify(err)}));
        });
    }
}

export function manualAddAssociation(data) {
    return dispatch => {
        dispatch(beginAddAssociation());
        console.log("Sending " + JSON.stringify(data));
        return axios({
            method: "post",
            url: "/api/individual/associations",
            data
        }).then(response => {
            if (!response.data.error) {
                dispatch(addAssociationSuccess(response.data));
                console.log("Got " + JSON.stringify(response.data));
            } else {
                dispatch(addAssociationError(response.data));
            }
        }).catch(err => {
            dispatch(addAssociationError({error: JSON.stringify(err)}));
        });
    };
}

export function manualRemoveAssociation(data) {
    return dispatch => {
        return axios({
            method: "delete",
            url: "/api/individual/associations",
            data
        }).then(response => {
            if (!response.data.error) {
                dispatch(removeAssociationSuccess(response.data));
            } else {
                dispatch(removeAssociationError(response.data));
            }
        }).catch(err => {
            dispatch(removeAssociationError({error: JSON.stringify(err)}))
        });
    };
}