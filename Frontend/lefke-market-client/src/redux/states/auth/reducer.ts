import {IAuthAction, IAuth} from "./interfaces"
import {AUTH_FAIL, AUTH_LOADING, AUTH_SUCCESS, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT} from "./types"

const LOCALSTORAGE_USER_KEY = 'user_uygo_info'
const LOCALSTORAGE_TOKEN_KEY = 'user_uygo_token'

let isAuth = false
let token = null
let user = null

if (typeof window !== "undefined"){

    let userData = localStorage.getItem(LOCALSTORAGE_USER_KEY)

    token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || null

    if (userData && userData !== 'null'){
        user = JSON.parse(userData)
        isAuth = true
    }
}

export const authInitialState: IAuth = {
    isAuth: isAuth,
    token: token,
    user: user,
    isAuthLoading: false,
    isLoginLoading: false
}

export default function authReducer(state = authInitialState, action: IAuthAction){
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                isAuthLoading: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthLoading: false
            }
        case AUTH_FAIL:
            return {
                ...state,
                isAuthLoading: false
            }
        case LOGIN_LOADING:
            return {
                ...state,
                isLoginLoading: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, action.payload.token)
            localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(action.payload.data))
            return {
                ...state,
                isLoginLoading: false,
                isAuth: true,
                user: action.payload.data,
                token: action.payload.token,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoginLoading: false
            }
        case LOGOUT:
            localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
            localStorage.removeItem(LOCALSTORAGE_USER_KEY)

            return {
                isAuth: false,
                token: null,
                user: null,
                isAuthLoading: false,
                isLoginLoading: false
            }
        default:
            return { ...state }
    }
}
