import {
    LOAD_ASSOCIATED_USERS,
    LOAD_ASSOCIATED_USERS_SUCCESS,
    LOAD_ASSOCIATED_USERS_ERROR,
    REMOVE_ASSOCIATED_USER,
    REMOVE_ASSOCIATED_USER_SUCCESS,
    REMOVE_ASSOCIATED_USER_ERROR
} from "constants/corporate/settings";

const settings = (state = {
    users: [
        /*
         { email: 'gmail.com...' }
         */
    ],
    isLoading: false,
    hasErrored: false,
    errorMsg: ""
}, action) => {
    switch (action.type) {
        case LOAD_ASSOCIATED_USERS:
        case REMOVE_ASSOCIATED_USER:
            return Object.assign({}, state, {
                isWaiting: true
            });
            break;
        case LOAD_ASSOCIATED_USERS_SUCCESS: {
            let users = action.data.users;
            return Object.assign({}, state, {
                isWaiting: false,
                users: users
            });
        }
            break;
        case REMOVE_ASSOCIATED_USER_SUCCESS: {
            let email = action.data.email;
            let users = state.users.filter((user) => user.email !== email);
            return Object.assign({}, state, {
                isWaiting: false,
                users: users
            });
        }
            break;
        case LOAD_ASSOCIATED_USERS_ERROR:
        case REMOVE_ASSOCIATED_USER_ERROR:
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
