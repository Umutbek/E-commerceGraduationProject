import {ScreenTypes} from "../../../constants"

export interface ISettings {
    screenType: number,
    isCategoryDrawerOpen: boolean
}

export interface IAction {
    type: string,
    payload: any
}

const initialState: ISettings = {
    screenType: ScreenTypes.desktop,
    isCategoryDrawerOpen: false,
}


export default function categoryReducer(state: ISettings = initialState, action: IAction) {
    switch (action.type){
        // case SET_SCREEN:
        //     return {
        //         ...state,
        //         screenType: action.payload
        //     }
        // case OPEN_CATEGORY_DRAWER:
        //     return {
        //         ...state,
        //         isCategoryDrawerOpen: true
        //     }
        // case CLOSE_CATEGORY_DRAWER:
        //     return {
        //         ...state,
        //         isCategoryDrawerOpen: false
        //     }
        default:
            return {
                ...state
            }
    }
}
