import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT,
    UPDATE_AMOUNT,
    CART_FETCH_SUCCESS,
} from "./types"
import {ICartStore} from "./interfaces"
import {_baseApi, getToken} from "../../../helpers/api/api"
import {display} from "@mui/system";

export const getCartFromServer = () => async (dispatch: any, getState: any) => {
    try {
        const response = await fetch(`${_baseApi}/item/cart/`, {
            method: 'GET',
            headers: { 'Authorization': `Token ${getToken()}` }
        })

        if (response.ok) {
            const data = await response.json()
            dispatch(saveCart(data))
        }

    } catch (e) {

    }
}

export const addToCart = (itemId: number, clientId: number, storeId: number ) => async (dispatch: any) => {

    try {
        const addResponse = await fetch(`${_baseApi}/item/cart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${getToken()}`
            },
            body: JSON.stringify({ itemid: itemId, client: clientId, store: storeId })
        })

        if (addResponse.ok) {
            dispatch(getCartFromServer())
        }

    } catch (e) {

    }
}

const getCartIdByItemId = (cartStores: any, itemId: number): number | null => {
    let id = null

    cartStores.forEach((cart: any) => {
        cart.listitem.forEach((item: any) => {
            if (item.item.id === itemId) {
                id = cart.id
            }
        })
    })

    return id
}

export const decreaseItemInCart = (itemId: number) => async (dispatch: any, getStore: any) => {
    try {
        const cartId = getCartIdByItemId(getStore().cart.cartStores, itemId)

        if (cartId) {
            const response = await fetch(`${_baseApi}/item/removecartitem/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken()}`
                },
                body: JSON.stringify({ cart: cartId, item: itemId })
            })

            if (response.ok) {
                dispatch(getCartFromServer())
            }
        }


    } catch (e) {

    }
}

export const deleteFromCart = (itemId: number) => async (dispatch: any, getStore: any) => {

    try {
        const cartId = getCartIdByItemId(getStore().cart.cartStores, itemId)

        if (cartId) {
            const response = await fetch(`${_baseApi}/item/removecartitemall/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken()}`
                },
                body: JSON.stringify({ cart: cartId, item: itemId })
            })

            if (response.ok) {
                dispatch(getCartFromServer())
            }
        }

    } catch (e) {

    }
}

export const saveCart = (cartStores: ICartStore[]) => ({
    type: CART_FETCH_SUCCESS,
    payload: cartStores
})

export const removeFromCart = (id: number) => ({
    type: REMOVE_FROM_CART,
    payload: {id}
})

export const removeAllFromCart = () => ({
    type: REMOVE_ALL_FROM_CART,
})

export const updateCartProductAmount = (id: number, amount: number) => ({
    type: UPDATE_AMOUNT,
    payload: {id, amount}
})

export const incrementCartProductAmount = (id: number) => ({
    type: INCREMENT_AMOUNT,
    payload: {id}
})

export const decrementCartProductAmount = (id: number) => ({
    type: DECREMENT_AMOUNT,
    payload: {id}
})
