import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT,
    UPDATE_AMOUNT,
    CART_FETCH_SUCCESS
} from "./types"
import {ICartAction, ICartState} from "./interfaces"
import {IProduct} from "../../../components/common/products/interfaces"

export const cartInitialState: ICartState = {
    cartStores: []
}

export default function cartReducer(state = cartInitialState, action: ICartAction){
    switch (action.type){
        case CART_FETCH_SUCCESS:
            return saveToCart(state, action)
        case ADD_TO_CART:
            return addToCart(state, action)
        case REMOVE_FROM_CART:

        default:
            return { ...state }
    }
}

const saveToCart = (state: ICartState, action: ICartAction) => {
    return {...state, cartStores: action.payload}
}

const addToCart = (state: ICartState, action: ICartAction) => {

    try {
        const { product } = action.payload



    } catch (e) {

    }

    return { ...state }
}
