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

const data = (state = {
    preferences: [
        /*
         {
         mainDataType: "HeartRate",
         colour: "red",
         visualization: ""
         },
         {
         mainDataType: "bloodPressure",
         secondaryDataType: "heartRate",
         colour: "red",
         visualization: "LineGraph"
         },
         */
    ],
    visualizationMap: {
        /*
         lineGraph: true,
         heartRate: false,
         */
    },
    dataTypes: [
        /*
         {
         dataType: "HeartRate",
         name: "Heart Rate",
         profile: "HeartRate"
         }
         */
    ],
    colours: [],
    isWaiting: false,
    hasErrored: false,
    errorMsg: ""
}, action) => {
    switch (action.type) {

        case LOAD_PREFERENCES:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case LOAD_VISUALIZATIONS:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case LOAD_COLOURS:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case CREATE_PREFERENCE:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case UPDATE_PREFERENCE:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case REMOVE_PREFERENCE:
            return Object.assign({}, state, {isWaiting: true});
            break;

        case LOAD_PREFERENCES_ERROR:
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
            break;
        case LOAD_VISUALIZATIONS_ERROR:
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
            break;
        case LOAD_COLOURS_ERROR:
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
            break;
        case CREATE_PREFERENCE_ERROR:
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
            break;
        case UPDATE_PREFERENCE_ERROR:
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
            break;
        case REMOVE_PREFERENCE_ERROR:
            return Object.assign({}, state, {isWaiting: false, hasErrored: true, errorMsg: action.data.error});
            break;


        case LOAD_PREFERENCES_SUCCESS:
            console.log("Load prefs " + JSON.stringify(action.data));

            return Object.assign({}, state, {
                preferences: action.data.preferences
            });
            break;

        case LOAD_VISUALIZATIONS_SUCCESS:
            return Object.assign({}, state, {
                visualizationMap: action.data.visualizations,
                dataTypes: action.data.dataTypes
            });
            break;

        case LOAD_COLOURS_SUCCESS:
            return Object.assign({}, state, {
                isWaiting: false,
                colours: action.data.colours
            });
            break;

        case CREATE_PREFERENCE_SUCCESS: {
            let preferences = [...state.preferences];
            preferences.push(action.data.savedPreference);
            return Object.assign({}, state, {
                preferences: preferences
            });
        }
            break;

        case UPDATE_PREFERENCE_SUCCESS: {
            let preferences = state.preferences.filter((preference) => {
                return !(preference.mainDataType === action.data.updatedPreference.mainDataType &&
                preference.secondaryDataType === action.data.updatedPreference.secondaryDataType &&
                preference.visualization === action.data.updatedPreference.visualization);
            });
            preferences.push(action.data.updatedPreference);
            return Object.assign({}, state, {
                preferences: preferences
            });
        }
            break;

        case REMOVE_PREFERENCE_SUCCESS: {
            let preferences = state.preferences.filter((preference) => {
                return !(preference.mainDataType === action.data.removedPreference.mainDataType &&
                preference.secondaryDataType === action.data.removedPreference.secondaryDataType &&
                preference.visualization === action.data.removedPreference.visualization);
            });
            return Object.assign({}, state, {
                preferences: preferences
            });
        }

            break;

        default:
            // VERY IMPORTANT
            return state;
    }
};


export default data;
