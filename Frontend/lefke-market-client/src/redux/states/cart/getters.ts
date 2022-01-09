export const getCartItems = (state: any) => [] || state.cart.items

export const getCartStores = (state: any) => state.cart.cartStores

export const getCartItemsIds = (state: any) => {
    let ids: number[] = []
    state.cart.cartStores.forEach((store: any) => {
        store.listitem.forEach((item: any) => ids.push(item.item.id))
    })

    return ids
}

export const getCartItemsCount = (state: any) => {

    let count = 0

    state.cart.cartStores.forEach((store: any) => {
        count += store.listitem.length
    })

    return count
}
