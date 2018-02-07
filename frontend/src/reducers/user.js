import {
    CORPORATE_LOGIN_USER,
    CORPORATE_LOGIN_SUCCESS_USER,
    CORPORATE_LOGIN_ERROR_USER,
    CORPORATE_LOGOUT_USER,
    CORPORATE_LOGOUT_SUCCESS_USER,
    CORPORATE_LOGOUT_ERROR_USER,
    CORPORATE_REGISTER_USER,
    CORPORATE_REGISTER_SUCCESS_USER,
    CORPORATE_REGISTER_ERROR_USER,
} from "constants/corporate/authentication";

import {
    INDIVIDUAL_LOGIN_USER,
    INDIVIDUAL_LOGIN_SUCCESS_USER,
    INDIVIDUAL_LOGIN_ERROR_USER,
    INDIVIDUAL_LOGOUT_USER,
    INDIVIDUAL_LOGOUT_SUCCESS_USER,
    INDIVIDUAL_LOGOUT_ERROR_USER,
    INDIVIDUAL_REGISTER_USER,
    INDIVIDUAL_REGISTER_SUCCESS_USER,
    INDIVIDUAL_REGISTER_ERROR_USER,
} from "constants/individual/authentication";


import * as corporateStatus from "constants/corporateStatus";

const user = (state = {
    authentication_isWaiting: false,         // Indicates the user is waiting for a response
    authentication_hasErrored: false,        // Indicates the user is waiting for a response
                                             // Indicates whether the user is authenticated, and whether he is a corporate user
                                             // One of UNKNOWN, CORPORATE, INDIVIDUAL
    corporateStatus: corporateStatus.UNKNOWN,
    email: "",                              // The Current user's email
    nextPathname: "/"                       // The next path to redirect the user on successful login
}, action) => {
    switch (action.type) {
        // Login User
        case CORPORATE_LOGIN_USER:
            return Object.assign({}, state, {authentication_isWaiting: true});
            break;



        case CORPORATE_LOGIN_SUCCESS_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: false,
                corporateStatus: corporateStatus.CORPORATE,
                email: action.data.username
            });
            break;
        case CORPORATE_LOGIN_ERROR_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: true,
                corporateStatus: corporateStatus.UNKNOWN
            });
            break;
        case CORPORATE_LOGOUT_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: true
            });
            break;
        case CORPORATE_LOGOUT_SUCCESS_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: false,
                corporateStatus: corporateStatus.UNKNOWN,
                email: ""
            });
            break;
        case CORPORATE_LOGOUT_ERROR_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: true,
                corporateStatus: corporateStatus.CORPORATE
            });
            break;
        case CORPORATE_REGISTER_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: true
            });
            break;
        case CORPORATE_REGISTER_SUCCESS_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false
            });
            break;
        case CORPORATE_REGISTER_ERROR_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: true,
                corporateStatus: corporateStatus.UNKNOWN
            });
            break;

        // Individual user authentication
        case INDIVIDUAL_LOGIN_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: true
            });
            break;
        case INDIVIDUAL_LOGIN_SUCCESS_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: false,
                corporateStatus: corporateStatus.INDIVIDUAL,
                email: action.data.username
            });
            break;
        case INDIVIDUAL_LOGIN_ERROR_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: true,
                corporateStatus: corporateStatus.UNKNOWN
            });
            break;
        case INDIVIDUAL_LOGOUT_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: true
            });
            break;
        case INDIVIDUAL_LOGOUT_SUCCESS_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: false,
                corporateStatus: corporateStatus.UNKNOWN,
                email: ""
            });
            break;
        case INDIVIDUAL_LOGOUT_ERROR_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: true,
                corporateStatus: corporateStatus.INDIVIDUAL
            });
            break;
        case INDIVIDUAL_REGISTER_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: true
            });
            break;
        case INDIVIDUAL_REGISTER_SUCCESS_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: false,
            });
            break;
        case INDIVIDUAL_REGISTER_ERROR_USER:
            return Object.assign({}, state, {
                authentication_isWaiting: false,
                authentication_hasErrored: true,
                corporateStatus: corporateStatus.UNKNOWN
            });
            break;


        default:
            // VERY IMPORTANT
            return state;
    }
};


export default user;
