import axios from "axios";
import * as types from "constants/individual/data";
import {handleResponseError} from "error";

function beginLoadPreferences() {
    return {type: types.LOAD_PREFERENCES}
}

function loadPreferencesSuccess(preferences, dataTypes) {
    return {type: types.LOAD_PREFERENCES_SUCCESS, data: {preferences, dataTypes}}
}

function loadPreferencesError(data) {
    return {type: types.LOAD_PREFERENCES_ERROR, data};
}

function beginLoadVisualizationsFor(dataType) {
    return {
        type: types.LOAD_VISUALIZATIONS_FOR,
        dataType
    };
}

function loadValidVisualizationsForSuccess(dataType, visualizations) {
    return {
        type: types.LOAD_VISUALIZATIONS_FOR_SUCCESS,
        dataType: dataType,
        visualizations: visualizations
    };
}

function loadValidVisualizationsForError(dataType, data) {
    return {
        type: types.UPDATE_COLOUR_ERROR,
        dataType: dataType,
        data
    };
}

function beginAddVisualization() {
    return {type: types.ADD_VISUALIZATION};
}

function beginLoadColours() {
    return {type: types.LOAD_COLOURS};
}

function loadColoursSuccess(colours) {
    return {
        type: types.LOAD_COLOURS_SUCCESS,
        data: {
            colours: colours
        }
    };
}

function loadColoursError(data) {
    return {
        type: types.LOAD_COLOURS_ERROR,
        data
    };
}


function addVisualizationSuccess(dataType, colour, visualization) {
    return {
        type: types.ADD_VISUALIZATION_SUCCESS, data: {
            dataType,
            colour,
            visualization
        }
    };
}

function addVisualizationError(data) {
    return {type: types.ADD_VISUALIZATION_ERROR, data};
}

function beginRemoveVisualization() {
    return {type: types.REMOVE_VISUALIZATION};
}

function removeVisualizationSuccess(dataType, colour, visualization) {
    return {
        type: types.REMOVE_VISUALIZATION_SUCCESS, data: {
            dataType,
            colour,
            visualization
        }
    };
}

function removeVisualizationError(data) {
    return {type: types.REMOVE_VISUALIZATION_ERROR, data};
}

function beginUpdateColour() {
    return {type: types.UPDATE_COLOUR};
}

function updateColourSuccess(dataType, colour, visualization) {
    return {
        type: types.UPDATE_COLOUR_SUCCESS, data: {
            dataType,
            colour,
            visualization
        }
    };
}

function updateColourError(data) {
    return {type: types.UPDATE_COLOUR_ERROR, data};
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
export function manualLoadPreferences() {
    return dispatch => {
        dispatch(beginLoadPreferences());
        return axios({
            method: "get",
            url: "/api/individual/preferences"
        }).then(response => {
            // these are the preferences the user has selected
            // of form
            // {
            //   dataType: ______,
            //   colour  : ______,
            //   visualization: [],
            // }
            const preferences = response.data;
            // now we must get all the visualizations
            return axios({
                method: "get",
                url: "/api/data/types/all"
            }).then(response => {
                // these are all the dataTypes
                // of form
                // {
                //    dataType: ________,
                //    name:     ________,
                //    profile:  ________
                // }
                const dataTypes = response.data;
                dispatch(loadPreferencesSuccess(preferences, dataTypes));


            }).catch(err => {
                dispatch(loadPreferencesError(handleResponseError(err)));
            });
        }).catch(err => {
            dispatch(loadPreferencesError(handleResponseError(err)));
        });
    }
}

export function manualLoadVisualizationsFor(dataType) {
    return dispatch => {
        dispatch(beginLoadVisualizationsFor(dataType));
        return axios({
            method: "get",
            url: "/api/data/types/" + dataType + "/visualizations"
        }).then(response => {
            // list string
            let visualizations = response.data;
            dispatch(loadValidVisualizationsForSuccess(dataType, visualizations));
        }).catch(err => dispatch(loadValidVisualizationsForError(dataType, handleResponseError(err))));
    };
}


export function manualAddVisualization(dataType, visualization, colour) {
    return dispatch => {
        dispatch(beginAddVisualization());
        return axios({
            method: "post",
            url: "/api/individual/preferences",
            data: {
                dataType,
                visualization,
                colour
            }
        }).then(response => {
            let updated_preference = response.data;
            dispatch(
                addVisualizationSuccess(
                    updated_preference.dataType,
                    updated_preference.colour,
                    updated_preference.visualization
                )
            );
        }).catch(err => dispatch(addVisualizationError(handleResponseError(err))));
    }
}

export function manualRemoveVisualization(dataType, visualization) {
    return dispatch => {
        dispatch(beginRemoveVisualization());
        return axios({
            method: "delete",
            url: "/api/individual/preferences",
            data: {
                dataType,
                visualization
            }
        }).then(response => {
            let updated_preferences = response.data;
            dispatch(removeVisualizationSuccess(
                updated_preferences.dataType,
                updated_preferences.colour,
                updated_preferences.visualization
            ));
        }).catch(err => dispatch(removeVisualizationError(handleResponseError(err))));
    };
}


export function manualUpdateColour(dataType, colour) {
    return dispatch => {
        dispatch(beginUpdateColour());
        console.log("Manual update colour called with " + dataType + " and " + colour);
        return axios({
            method: "put",
            url: "/api/individual/preferences",
            data: {
                dataType,
                colour
            }
        }).then(response => {
            let updated_preferences = response.data;
            dispatch(updateColourSuccess(
                updated_preferences.dataType,
                updated_preferences.colour,
                updated_preferences.visualization
            ));
        }).catch(err => dispatch(updateColourError(handleResponseError(err))));
    };
}