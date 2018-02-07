import {
    LOAD_SETTINGS,
    LOAD_SETTINGS_SUCCESS,
    LOAD_SETTINGS_ERROR,
    ADD_ASSOCIATION,
    ADD_ASSOCIATION_SUCCESS,
    ADD_ASSOCIATION_ERROR,
    REMOVE_ASSOCIATION,
    REMOVE_ASSOCIATION_SUCCESS,
    REMOVE_ASSOCIATION_FAILURE,
} from "constants/individual/settings";

const settings = (state = {
    associations: [],
    isWaiting: false,
    hasErrored: false,
    errorMsg: ""
}, action) => {
    switch (action.type) {
        case LOAD_SETTINGS:
            return Object.assign({}, state, {
                isWaiting: true
            });
            break;
        case LOAD_SETTINGS_SUCCESS:
            return Object.assign({}, state, {
                isWaiting: false,
                associations: action.data
            });
            break;
        case LOAD_SETTINGS_ERROR:
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error,
                associations: []
            });
            break;
        case ADD_ASSOCIATION:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case ADD_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                isWaiting: false,
                associations: action.data
            });
            break;
        case ADD_ASSOCIATION_ERROR:
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error,
            });
            break;
        case REMOVE_ASSOCIATION:
            return Object.assign({}, state, {isWaiting: true});
            break;
        case REMOVE_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                isWaiting: false,
                associations: state.associations.filter(association => association.domain !== action.data.domain)
            });
            break;
        case REMOVE_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                isWaiting: false,
                hasErrored: true,
                errorMsg: action.data.error
            });
            break;
        default:
            // VERY IMPORTANT
            return state;
    }
};


export default settings;
