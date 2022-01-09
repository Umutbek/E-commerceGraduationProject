import {ADD_FAVORITE, REMOVE_ALL_FAVORITES, REMOVE_FAVORITE, SAVE_FAVORITES} from "./types"
import {_baseApi} from "../../../helpers/api/api"
import {IProduct} from "../../../components/common/products/interfaces"

export const fetchFavoritesFromServer = () => async (dispatch: any, getState: any) => {

    const auth = getState().auth

    if (auth.isAuth) {
        try {
            const response = await fetch(`${_baseApi}/item/getuserfavourite/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${auth.token}`
                }
            })

            const data = await response.json()

            if (response.ok){
                dispatch(saveFavorites(data.results.map((product: any) => product.item)))
            }

            console.log('FAVORITES FETCHING ERROR: ', data)
        } catch (e) {
            console.log('FAVORITES FETCHING ERROR: ', e.message)
        }
    }
}

export const addFavorite = (item: any) => ({
    type: ADD_FAVORITE,
    payload: item
})

export const removeFavorite = (id: number) => ({
    type: REMOVE_FAVORITE,
    payload: id
})

export const removeAllFavorites = () => ({
    type: REMOVE_ALL_FAVORITES,
})

export const saveFavorites = (products: IProduct[]) => ({
    type: SAVE_FAVORITES,
    payload: { products }
})
