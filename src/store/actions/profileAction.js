import axios from "axios";
import {
    EMAIL_HANDLER_OK, GITHUB_HANDLER_OK,
    LOAD_DATA_SUCCESS, LOAD_IMG_SUCCESS, LOAD_PROGRESS_SUCCESS, LOAD_URL_SUCCESS,
    NAME_HANDLER_OK, NICKNAME_HANDLER_OK,
    POSITION_HANDLER_OK,
    SURNAME_HANDLER_OK, TELE_HANDLER_OK, VK_HANDLER_OK
} from "./actionTypes";
import {storage} from "../../firebase";

export function loadData() {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://rauventa-project.firebaseio.com/persons/${localStorage.userId}.json`);
            Object.entries(response.data).map((preIndex) => {
                const currentId = preIndex[0];
                const currentData = preIndex[1];
                dispatch(loadDataSuccess(currentId, currentData));
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleChange(event) {
    return (dispatch) => {
        const image = event.target.files[0];
        if (image) {

            dispatch(loadImgSuccess(image));

            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    dispatch(loadProgressSuccess(progress))
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            dispatch(loadUrlSuccess(url))
                        });
                }
            );
        }
        // dispatch(clearChanger(currentImage, currentProgress))
        // Мы должны будем сбросить информацию без перезагрузки
        // Добавить текущую установленную фотку, слить прогресс бар
    }
}

export function sendDataHandler(firstName, lastName, email, url, position, nickname, vkLink, teleLink, githubLink) {
    return async (dispatch, getState) => {
        const currentData = getState().profileReducer.currentData;
        const currentId = getState().profileReducer.currentId;
        if (firstName === '') {
            firstName = currentData.firstName;
        }
        if (lastName === '') {
            lastName = currentData.lastName;
        }
        if (email === '') {
            email = currentData.email;
        }
        if (url === '') {
            url = currentData.url;
        }
        if (position === '') {
            position = currentData.position;
        }
        if (nickname === '') {
            nickname = currentData.nickname;
        }
        if (vkLink === '') {
            vkLink = currentData.vkLink;
        }
        if (teleLink === '') {
            teleLink = currentData.teleLink;
        }
        if (githubLink === '') {
            githubLink = currentData.githubLink;
        }
        const data = {
            firstName, lastName, email, url, position, nickname, vkLink, teleLink, githubLink
        };
        try {
            await axios.put(`https://rauventa-project.firebaseio.com/persons/${localStorage.userId}/${currentId}.json`, data)
        } catch (e) {
            console.log(e)
        }
    }
}

export function nameHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(nameHandlerOk(data));
    }
}
export function surNameHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(surNameHandlerOk(data));
    }
}
export function emailHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(emailHandlerOk(data));
    }
}
export function positionHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(positionHandlerOk(data));
    }
}
export function nicknameHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(nicknameHandlerOk(data));
    }
}
export function vkHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(vkHandlerOk(data));
    }
}
export function teleHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(teleHandlerOk(data));
    }
}
export function githubHandler(event) {
    return dispatch => {
        const data = event.target.value;
        dispatch(githubHandlerOk(data));
    }
}

//Dispatches

export function loadDataSuccess(currentId, currentData) {
    return {
        type: LOAD_DATA_SUCCESS,
        currentId, currentData
    }
}

export function loadImgSuccess(image) {
    return {
        type: LOAD_IMG_SUCCESS,
        image
    }
}
export function loadProgressSuccess(progress) {
    return {
        type: LOAD_PROGRESS_SUCCESS,
        progress
    }
}
export function loadUrlSuccess(url) {
    return {
        type: LOAD_URL_SUCCESS,
        url
    }
}

export function nameHandlerOk(data) {
    return {
        type: NAME_HANDLER_OK,
        data
    }
}
export function surNameHandlerOk(data) {
    return {
        type: SURNAME_HANDLER_OK,
        data
    }
}
export function emailHandlerOk(data) {
    return {
        type: EMAIL_HANDLER_OK,
        data
    }
}
export function positionHandlerOk(data) {
    return {
        type: POSITION_HANDLER_OK,
        data
    }
}
export function nicknameHandlerOk(data) {
    return {
        type: NICKNAME_HANDLER_OK,
        data
    }
}
export function vkHandlerOk(data) {
    return {
        type: VK_HANDLER_OK,
        data
    }
}
export function teleHandlerOk(data) {
    return {
        type: TELE_HANDLER_OK,
        data
    }
}
export function githubHandlerOk(data) {
    return {
        type: GITHUB_HANDLER_OK,
        data
    }
}