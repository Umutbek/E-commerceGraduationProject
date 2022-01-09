import {IProduct} from "../../../components/common/products/interfaces"

export interface ICartAction {
    type: string,
    payload?: any
}

export interface ICartStore {
    name: string,
    items: IProduct[]
}

export interface ICartState {
    cartStores: ICartStore[]
}
