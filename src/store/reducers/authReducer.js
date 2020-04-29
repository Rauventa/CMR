import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS, REG_SUCCESS, USED_MAIL} from "../actions/actionTypes";

const initialState = {
    token: null,
    errorMessage: '',
    isUsedMail: '',
    isRegSuccess: false
};

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                errorMessage: action.errorMessage
            };
        case AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        case USED_MAIL:
            return {
                ...state, isUsedMail: action.isUsedMail
            };
        case REG_SUCCESS:
            return {
                ...state,
                isRegSuccess: action.isRegSuccess
            };
        case AUTH_LOGOUT:
            return  {
                ...state, token: null
            };
        default:
            return state
    }
}