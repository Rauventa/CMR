import {
    EMAIL_HANDLER_OK, GITHUB_HANDLER_OK,
    LOAD_DATA_SUCCESS, LOAD_IMG_SUCCESS, LOAD_PROGRESS_SUCCESS, LOAD_URL_SUCCESS,
    NAME_HANDLER_OK, NICKNAME_HANDLER_OK, POSITION_HANDLER_OK,
    SURNAME_HANDLER_OK, TELE_HANDLER_OK, VK_HANDLER_OK
} from "../actions/actionTypes";

const initialState = {
    currentId: '',
    currentData: {},
    image: null,
    url: '',
    progress: 0,
    name: '',
    surName: '',
    email: '',
    position: '',
    nickname: '',
    vk: '',
    tele: '',
    github: ''
};

export default function profileReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_DATA_SUCCESS:
            return {
                ...state,
                currentId: action.currentId,
                currentData: action.currentData
            };
        case LOAD_IMG_SUCCESS:
            return {
                ...state,
                image: action.image
            };
        case LOAD_PROGRESS_SUCCESS:
            return {
                ...state,
                progress: action.progress
            };
        case LOAD_URL_SUCCESS:
            return {
                ...state,
                url: action.url
            };
        case NAME_HANDLER_OK:
            return {
                ...state,
                name: action.data
            };
        case SURNAME_HANDLER_OK:
            return {
                ...state,
                surName: action.data
            };
        case EMAIL_HANDLER_OK:
            return {
                ...state,
                email: action.data
            };
        case POSITION_HANDLER_OK:
            return {
                ...state,
                position: action.data
            };
        case NICKNAME_HANDLER_OK:
            return {
                ...state,
                nickname: action.data
            };
        case VK_HANDLER_OK:
            return {
                ...state,
                vk: action.data
            };
        case TELE_HANDLER_OK:
            return {
                ...state,
                tele: action.data
            };
        case GITHUB_HANDLER_OK:
            return {
                ...state,
                github: action.data
            };
        default:
            return state
    }
}