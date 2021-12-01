import {CLOSE_AUTH_MODAL, CLOSE_CART_MODAL, OPEN_AUTH_MODAL, OPEN_CART_MODAL, SET_SCREEN} from "./types"

export const setScreenType = (screenType: number) => ({
    type: SET_SCREEN,
    payload: screenType
})

export const openAuthModal = () => ({
    type: OPEN_AUTH_MODAL
})

export const closeAuthModal = () => ({
    type: CLOSE_AUTH_MODAL
})

export const openCartModal = () => ({
    type: OPEN_CART_MODAL
})

export const closeCartModal = () => ({
    type: CLOSE_CART_MODAL
})
