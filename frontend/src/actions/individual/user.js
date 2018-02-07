import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "constants/individual/authentication";


function beginLogin(){
    return { type: types.INDIVIDUAL_LOGIN_USER }
}

function loginSuccess(data) {
    return {
        type: types.INDIVIDUAL_LOGIN_SUCCESS_USER,
        data
    };
}

function loginError() {
    return {
        type: types.INDIVIDUAL_LOGIN_ERROR_USER
    };
}


function beginLogout() {
    return {
        type: types.INDIVIDUAL_LOGOUT_USER
    };
}

function logoutSuccess() {
    return {
        type: types.INDIVIDUAL_LOGOUT_SUCCESS_USER
    };
}

function logoutError() {
    return {
        type: types.INDIVIDUAL_LOGOUT_ERROR_USER
    };
}


function beginRegister() {
    return {
        type: types.INDIVIDUAL_REGISTER_USER
    };
}

function registerSuccess() {
    return {
        type: types.INDIVIDUAL_REGISTER_SUCCESS_USER
    };
}

function registerError() {
    return {
        type: types.INDIVIDUAL_REGISTER_ERROR_USER
    };
}

function makeUserRequest(method, data, endpoint="/auth/individual/login") {
    return axios({
        method: method,
        url: endpoint,
        data: data
    });
}


export function manualLogin(data,successPath) {
    return dispatch => {
        dispatch(beginLogin());
        return makeUserRequest("post", data)
            .then(response => {
                console.log("Got " + response);
                if(!response.data.error) {
                    dispatch(loginSuccess(data));
                    browserHistory.push(successPath);
                } else {
                    dispatch(loginError());
                    return JSON.stringify(response.data.error);
                }
            }).catch(err => {
                dispatch(loginError());
                return JSON.stringify(err);
            });
    };
}


export function manualLogout() {
    return dispatch => {
        dispatch(beginLogout());
        return axios.get("/auth/logout")
            .then(response => {
                if(!response.data.error) {
                    dispatch(logoutSuccess());
                    browserHistory.push("/");
                } else {
                    dispatch(logoutError());
                    return JSON.stringify(response.data.error);
                }
            })
            .catch(err => {
                dispatch(logoutError());
                return JSON.stringify(err);
            });
    };
}

export function manualRegister(data) {
    return dispatch => {
        dispatch(beginRegister());

        return makeUserRequest("post", data, "/auth/individual/signup")
            .then(response => {
                if(!response.data.error) {
                    dispatch(registerSuccess());
                    dispatch(manualLogin(data, "/"));
                } else {
                    dispatch(registerError());
                    let registerMessage = response.data.error;
                    return JSON.stringify(registerMessage);
                }
            })
            .catch(err => {
                dispatch(registerError());
                return err;
            });
    }
}
