import axios from "axios";
import { browserHistory } from "react-router";
import * as types from "constants/corporate/authentication";


function beginLogin(){
    return { type: types.CORPORATE_LOGIN_USER }
}

function loginSuccess(data) {
    return {
        type: types.CORPORATE_LOGIN_SUCCESS_USER,
        data
    };
}

function loginError() {
    return {
        type: types.CORPORATE_LOGIN_ERROR_USER
    };
}


function beginLogout() {
    return {
        type: types.CORPORATE_LOGOUT_USER
    };
}

function logoutSuccess() {
    return {
        type: types.CORPORATE_LOGOUT_SUCCESS_USER
    };
}

function logoutError() {
    return {
        type: types.CORPORATE_LOGOUT_ERROR_USER
    };
}


function beginRegister() {
    return {
        type: types.CORPORATE_REGISTER_USER
    };
}

function registerSuccess() {
    return {
        type: types.CORPORATE_REGISTER_SUCCESS_USER
    };
}

function registerError() {
    return {
        type: types.CORPORATE_REGISTER_ERROR_USER
    };
}

function makeUserRequest(method, data, endpoint="/auth/corporate/login") {
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
                return err.response.statusText;
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
                return err.response.statusText;
            });
    };
}

export function manualRegister(data) {
    return dispatch => {
        dispatch(beginRegister());

        return makeUserRequest("post", data, "/auth/corporate/signup")
            .then(response => {
                if(!response.data.error) {
                    dispatch(registerSuccess());
                    dispatch(manualLogin(data, "/"));
                } else {
                    dispatch(registerError());
                    let registerMessage = response.data.error;
                    return registerMessage;
                }
            })
            .catch(err => {
                dispatch(registerError());
                return err.response.statusText;
            });
    }
}
