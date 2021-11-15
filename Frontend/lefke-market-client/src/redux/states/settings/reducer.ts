import {OPEN_CATEGORY_DRAWER, CLOSE_CATEGORY_DRAWER, SET_SCREEN} from "./types"
import {ScreenTypes} from "../../../constants"

export interface ISettings {
    screenType: number
}

export interface IAction {
    type: string,
    payload: any
}

const initialState: ISettings = {
    screenType: ScreenTypes.desktop,
}


export default function settingsReducer(state: ISettings = initialState, action: IAction) {
    switch (action.type){
        case SET_SCREEN:
            return {
                ...state,
                screenType: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
