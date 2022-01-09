import {CLOSE_AUTH_MODAL, CLOSE_CART_MODAL, OPEN_AUTH_MODAL, OPEN_CART_MODAL, SET_SCREEN} from "./types"
import {SCREEN_TYPE} from "../../../enums"
import {ISettings, ISettingsAction} from "./interfaces"


const getScreenType = () =>  {


    if (typeof window !== 'undefined'){

        const windowWidth = window.screen.width

        console.log("Width", windowWidth)

        if (windowWidth < 600){
            return SCREEN_TYPE.MOBILE
        } else if (windowWidth < 960) {
            return SCREEN_TYPE.MINI_LAPTOP
        } else if (windowWidth < 1024) {
            return SCREEN_TYPE.LAPTOP
        }
    }

    return SCREEN_TYPE.DESKTOP
}

export const settingsInitialState: ISettings = {
    screenType: getScreenType(),
    isAuthModalOpen: false,
    isCartModalOpen: false,
}

export default function settingsReducer(state: ISettings = settingsInitialState, action: ISettingsAction) {
    switch (action.type){
        case SET_SCREEN:
            return {
                ...state,
                screenType: action.payload
            }
        case OPEN_AUTH_MODAL:
            return {
                ...state,
                isAuthModalOpen: true
            }
        case CLOSE_AUTH_MODAL:
            return {
                ...state,
                isAuthModalOpen: false
            }
        case OPEN_CART_MODAL:
            return {
                ...state,
                isCartModalOpen: true
            }
        case CLOSE_CART_MODAL:
            return {
                ...state,
                isCartModalOpen: false
            }
        default:
            return {
                ...state
            }
    }
}
