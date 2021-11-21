import {CLOSE_CATEGORY_DRAWER, OPEN_CATEGORY_DRAWER, SET_SCREEN} from "./types"

export const setScreenType = (screenType: number) => ({
    type: SET_SCREEN,
    payload: screenType
})
export const openCategoryDrawer = () => ({
    type: OPEN_CATEGORY_DRAWER
})

export const closeCategoryDrawer = () => ({
    type: CLOSE_CATEGORY_DRAWER
})

