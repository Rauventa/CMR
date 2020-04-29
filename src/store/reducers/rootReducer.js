import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer
})