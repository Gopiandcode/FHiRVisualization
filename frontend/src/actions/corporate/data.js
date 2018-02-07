import axios from "axios";
import {
    LOAD_PREFERENCES,
    LOAD_PREFERENCES_SUCCESS,
    LOAD_PREFERENCES_ERROR,

    LOAD_VISUALIZATIONS,
    LOAD_VISUALIZATIONS_SUCCESS,
    LOAD_VISUALIZATIONS_ERROR,

    LOAD_COLOURS,
    LOAD_COLOURS_SUCCESS,
    LOAD_COLOURS_ERROR,


    CREATE_PREFERENCE,
    CREATE_PREFERENCE_SUCCESS,
    CREATE_PREFERENCE_ERROR,

    UPDATE_PREFERENCE,
    UPDATE_PREFERENCE_SUCCESS,
    UPDATE_PREFERENCE_ERROR,

    REMOVE_PREFERENCE,
    REMOVE_PREFERENCE_SUCCESS,
    REMOVE_PREFERENCE_ERROR,
} from "constants/corporate/data";
import {handleResponseError} from "error";

function beginLoadPreferences() {
    return {
        type: LOAD_PREFERENCES
    };
}
function loadPreferencesSuccess(preferences) {
    return {
        type: LOAD_PREFERENCES_SUCCESS,
        data: {
            preferences
        }
    };
}
function loadPreferencesError(data) {
    return {
        type: LOAD_PREFERENCES_ERROR,
        data
    };
}

function beginLoadVisualizations() {
    return {
        type: LOAD_VISUALIZATIONS
    };
}
function loadVisualizationsSuccess(visualizations, dataTypes) {
    return {
        type: LOAD_VISUALIZATIONS_SUCCESS,
        data: {
            visualizations,
            dataTypes
        }
    };
}
function loadVisualizationsError(data) {
    return {
        type: LOAD_VISUALIZATIONS_ERROR,
        data
    };
}

function beginLoadColours() {
    return {
        type: LOAD_COLOURS
    };
}
function loadColoursSuccess(colours) {
    return {
        type: LOAD_COLOURS_SUCCESS,
        data: {
            colours
        }
    };
}
function loadColoursError(data) {
    return {
        type: LOAD_COLOURS_ERROR,
        data
    };
}


function beginCreatePreference() {
    return {
        type: CREATE_PREFERENCE
    };
}
function createPreferenceSuccess(savedPreference) {
    return {
        type: CREATE_PREFERENCE_SUCCESS,
        data: {
            savedPreference
        }
    };
}
function createPreferenceError(data) {
    return {
        type: CREATE_PREFERENCE_ERROR,
        data
    };
}

function beginUpdatePreference() {
    return {
        type: UPDATE_PREFERENCE
    };
}
function updatePreferenceSuccess(updatedPreference) {
    return {
        type: UPDATE_PREFERENCE_SUCCESS,
        data: {
            updatedPreference
        }
    };
}
function updatePreferenceError(data) {
    return {
        type: UPDATE_PREFERENCE_ERROR,
        data
    };
}

function beginRemovePreference() {
    return {
        type: REMOVE_PREFERENCE
    };
}
function removePreferenceSuccess(removedPreference) {
    return {
        type: REMOVE_PREFERENCE_SUCCESS,
        data: {
            removedPreference
        }
    };
}
function removePreferenceError(data) {
    return {
        type: REMOVE_PREFERENCE_ERROR,
        data
    };
}


export function manualLoadPreferences() {
    return dispatch => {
        dispatch(beginLoadPreferences());
        return axios({
            method: "get",
            url: "/api/corporate/preferences"
        }).then(response => {
            let preferences = response.data;
            dispatch(loadPreferencesSuccess(preferences));
        }).catch(err => {
            dispatch(loadPreferencesError(handleResponseError(err)));
        });
    };
}

export function manualLoadVisualizations() {
    return dispatch => {
        dispatch(beginLoadVisualizations());
        return axios({
            method: "get",
            url: "/api/data/types/all"
        }).then(response => {
            let dataTypes = response.data;
            return axios({
                method: "get",
                url: "/api/visualizations/aggregate/specification"
            }).then(response => {
                let visualizations = response.data;
                dispatch(loadVisualizationsSuccess(visualizations, dataTypes));
            }).catch(err => {
                dispatch(loadVisualizationsError(handleResponseError(err)));
            });
        }).catch(err => {
            dispatch(loadVisualizationsError(handleResponseError(err)));
        })
    }
}

export function manualLoadColours() {
    return dispatch => {
        dispatch(beginLoadColours());
        return axios({
            method: "get",
            url: "/api/visualizations/colours"
        }).then(response => {
            let colours = response.data;
            dispatch(loadColoursSuccess(colours));
        }).catch(err => {
            dispatch(loadColoursError(handleResponseError(err)));
        });
    }
}


export function manualCreatePreference(preference) {
    return dispatch => {
        console.log("Sending off " + JSON.stringify(preference));
        dispatch(beginCreatePreference());
        return axios({
            method: "post",
            url: "/api/corporate/preferences",
            data: preference
        }).then(response => {
            let savedPreference = response.data;
            dispatch(createPreferenceSuccess(savedPreference));
        }).catch(err => {
            dispatch(createPreferenceError(handleResponseError(err)));
        });
    }
}

export function manualUpdatePreference(preference) {
    return dispatch => {
        dispatch(beginUpdatePreference());
        return axios({
            method: "put",
            url: "/api/corporate/preferences",
            data: preference
        }).then(response => {
            let updatedPreference = response.data;
            dispatch(updatePreferenceSuccess(updatedPreference));
        }).catch(err => {
            dispatch(updatePreferenceError(handleResponseError(err)));
        });
    }
}

export function manualRemovePreference(preference) {
    return dispatch => {
        dispatch(beginRemovePreference());
        return axios({
            method: "delete",
            url: "/api/corporate/preferences",
            data: preference
        }).then(response => {
            let removedPreference = response.data;
            dispatch(removePreferenceSuccess(removedPreference));
        }).catch(err => {
            dispatch(removePreferenceError(handleResponseError(err)));
        });
    };

}
