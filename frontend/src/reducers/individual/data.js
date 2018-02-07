import {
    LOAD_PREFERENCES,
    LOAD_PREFERENCES_SUCCESS,
    LOAD_PREFERENCES_ERROR,

    LOAD_VISUALIZATIONS_FOR,
    LOAD_VISUALIZATIONS_FOR_SUCCESS,
    LOAD_VISUALIZATIONS_FOR_ERROR,

    ADD_VISUALIZATION,
    ADD_VISUALIZATION_SUCCESS,
    ADD_VISUALIZATION_ERROR,

    REMOVE_VISUALIZATION,
    REMOVE_VISUALIZATION_SUCCESS,
    REMOVE_VISUALIZATION_ERROR,

    UPDATE_COLOUR,
    UPDATE_COLOUR_SUCCESS,
    UPDATE_COLOUR_ERROR,

    LOAD_COLOURS,
    LOAD_COLOURS_SUCCESS,
    LOAD_COLOURS_ERROR
} from "constants/individual/data";

const DEFAULT_COLOUR = 'yellow';
const data = (state = {
    preferences: [
        /*
         {
         "dataType": "HeartRate",
         "colour":  DEFAULT_COLOUR,
         "visualization": [],
         }
         */
    ],
    validVisualizations: {
        /*
         HeartRate: {
         visualizations: [],
         hasLoaded: false, // set to true once loaded
         isLoading: false
         }
         */
    },
    colours: [],
    isWaiting: false,
    hasErrored: false,
    errorMsg: ""
}, action) => {
    switch (action.type) {
        case LOAD_PREFERENCES:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case LOAD_PREFERENCES_SUCCESS: {
            // action .data contains
            // preferences:
            // {
            //   dataType: ______,
            //   colour  : ______,
            //   visualization: [],
            // }
            // dataTypes:
            // {
            //    dataType: ________,
            //    name:     ________,
            //    profile:  ________
            // }
            let validVisualizations = {};
            let preferences = action.data.preferences;
            let seenVisualizations = new Set();
            for (let i = 0; i < action.data.preferences.length; i++) {
                let preference = action.data.preferences[i];
                seenVisualizations.add(preference.dataType);
            }

            for (let i = 0; i < action.data.dataTypes.length; i++) {
                let entry = action.data.dataTypes[i];

                if (!seenVisualizations.has(entry.dataType)) {
                    preferences.push({
                        dataType: entry.dataType,
                        colour: DEFAULT_COLOUR,
                        visualization: []
                    });
                }

                validVisualizations[entry.dataType] = {
                    visualizations: [],
                    hasLoaded: false, // set to true once loaded
                    isLoading: false
                };
            }

            console.log(JSON.stringify(validVisualizations));
            return Object.assign({}, state, {
                preferences: preferences,
                validVisualizations: validVisualizations,
                isWaiting: false
            });
        }
        case LOAD_PREFERENCES_ERROR:
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error
            });

        case LOAD_VISUALIZATIONS_FOR: {
            let validVisualizations = Object.assign({}, state.validVisualizations);
            validVisualizations[action.dataType].isLoading = true;
            return Object.assign({}, state, {
                validVisualizations: validVisualizations
            });
        }
        case LOAD_VISUALIZATIONS_FOR_SUCCESS: {
            let visualizations = action.visualizations;
            let validVisualizations = Object.assign({}, state.validVisualizations);
            console.log("Valid Visualizations: " + JSON.stringify(validVisualizations));
            validVisualizations[action.dataType].isLoading = false;
            validVisualizations[action.dataType].hasLoaded = true;
            validVisualizations[action.dataType].visualizations = visualizations;
            return Object.assign({}, state, {
                validVisualizations: validVisualizations
            });
        }
        case LOAD_VISUALIZATIONS_FOR_ERROR: {
            let validVisualizations = Object.assign({}, state.validVisualizations);
            validVisualizations[action.dataType].isLoading = false;
            return Object.assign({}, state, {
                validVisualizations: validVisualizations,
                hasErrored: true,
                errorMsg: action.data.error
            });
        }
        case ADD_VISUALIZATION: {
            return Object.assign({}, state, {isWaiting: true});
        }
        case ADD_VISUALIZATION_SUCCESS: {
            let visualizations = action.data.visualization;
            let dataType = action.data.dataType;
            let colour = action.data.colour;
            let preferences = [...state.preferences];
            console.log("Adding visualization success " + JSON.stringify(action));
            let i = 0;
            // find index with "preference" for object
            for (; i < preferences.length; i++) {
                console.log("checking[" + i + "]: prefs(" + JSON.stringify(preferences[i].dataType) + ") === " + JSON.stringify(dataType));
                if (preferences[i].dataType === dataType) break;
            }
            if (i !== preferences.length) {
                console.log("Changing existing visualizations");
                // means visualizations for datatype already exist
                preferences[i].colour = colour;
                preferences[i].visualization = visualizations;
            } else {
                console.log("Adding new visualization");
                // means no preference for datatype exist
                // make a preference
                preferences.push({
                    dataType: dataType,
                    colour: colour,
                    visualization: visualizations
                });
            }
            return Object.assign({}, state, {
                isWaiting: false,
                preferences: preferences
            });
        }
        case ADD_VISUALIZATION_ERROR: {
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error
            });
        }
        case REMOVE_VISUALIZATION: {
            return Object.assign({}, state, {isWaiting: true});
        }
        case REMOVE_VISUALIZATION_SUCCESS: {
            let visualizations = action.data.visualization;
            let dataType = action.data.dataType;
            let colour = action.data.colour;
            let preferences = [...state.preferences];
            let i = 0;
            // find index with "preference" for object
            for (; i < preferences.length; i++) {
                if (preferences[i].dataType === dataType) break;
            }
            if (i !== preferences.length) {
                // means visualizations for datatype already exist
                preferences[i].colour = colour;
                preferences[i].visualization = visualizations;
            } else {
                // means no preference for datatype exist
                // make a preference
                preferences.push({
                    dataType: dataType,
                    colour: colour,
                    visualization: visualizations
                });
            }
            return Object.assign({}, state, {
                isWaiting: false,
                preferences: preferences
            });
        }
        case REMOVE_VISUALIZATION_ERROR: {
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error
            });

        }
        case UPDATE_COLOUR: {
            return Object.assign({}, state, {isWaiting: true});
        }
        case UPDATE_COLOUR_SUCCESS: {
            let visualizations = action.data.visualization;
            let dataType = action.data.dataType;
            let colour = action.data.colour;
            let preferences = [...state.preferences];
            let i = 0;
            // find index with "preference" for object
            for (; i < preferences.length; i++) {
                if (preferences[i].dataType === dataType) break;
            }
            if (i !== preferences.length) {
                // means visualizations for datatype already exist
                preferences[i].colour = colour;
                preferences[i].visualization = visualizations;
            } else {
                // means no preference for datatype exist
                // make a preference
                preferences.push({
                    dataType: dataType,
                    colour: colour,
                    visualization: visualizations
                });
            }
            return Object.assign({}, state, {
                isWaiting: false,
                preferences: preferences
            });
        }
        case UPDATE_COLOUR_ERROR: {
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error
            });
        }
        case LOAD_COLOURS: {
            return Object.assign({}, state, {
                isWaiting: true
            });
        }
        case LOAD_COLOURS_SUCCESS: {
            return Object.assign({}, state, {
                isWaiting: false,
                colours: action.data.colours
            });
        }
        case LOAD_COLOURS_ERROR: {
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error
            });
        }

        default:
            // VERY IMPORTANT
            return state;
    }
};


export default data;
