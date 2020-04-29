import axios from 'axios'
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS, REG_SUCCESS, USED_MAIL} from "./actionTypes";

export function auth(email, password, isLogin, firstName, lastName) {
    return async dispatch => {
        const displayName = `${firstName} ${lastName}`;
        const authData = {
            email, password,
            returnSecureToken: true,
            displayName
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAF8Dm8aMjzGT4U4mYFgKH_IRSv04oUhOo';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAF8Dm8aMjzGT4U4mYFgKH_IRSv04oUhOo';
            try {
                const response = await axios.post(url, authData);
                const data = response.data;
                const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

                // LocalStorage - мы будем писать, когда нам нужно принимать значения с браузера, адже при перезагрузке страницы
                // То есть, мы будем держать в нем данные о текущем пользователе и его пребывании в сети
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('userId', data.localId);
                localStorage.setItem('name', data.displayName);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(data.idToken));
                dispatch(autoLogout(data.expiresIn));

            } catch {
                const errorMessage = 'Invalid E-mail or Password';
                dispatch(authError(errorMessage))
            }
        } else {
            try {
                const response = await axios.post(url, authData);
                const data = response.data;
                await axios.post(`https://rauventa-project.firebaseio.com/persons/${data.localId}/.json`, {
                    firstName,
                    lastName,
                    email,
                    position: '',
                    nickname: '',
                    vkLink: '',
                    teleLink: '',
                    githubLink: '',
                    url: ''
                });
                const isRegSuccess = true;
                dispatch(regSuccess(isRegSuccess));
            } catch (e) {
                const isUsedMail = 'This Email is already exist';
                dispatch(usedMail(isUsedMail))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
        errorMessage: ''
    }
}

export function authError(errorMessage) {
    return {
        type: AUTH_ERROR,
        errorMessage
    }
}

export function usedMail(isUsedMail) {
    return {
        type: USED_MAIL,
        isUsedMail
    }
}

export function regSuccess(isRegSuccess) {
    return {
        type: REG_SUCCESS,
        isRegSuccess
    }

}

// Созадем функцию, которая бдует принимать в себя время, которое пользователь был в сети
// И задаем таймаут на выход из сети, выписывая его в новую функцию
export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            // Задаем время, через которое будет выход из сети и отчистятся данные о пользователе
            // Которые хранятся в браузере
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('name');
    return {
        type: AUTH_LOGOUT
    }
}