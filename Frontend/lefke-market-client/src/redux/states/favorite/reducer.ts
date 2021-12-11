import {ADD_FAVORITE, REMOVE_FAVORITE, REMOVE_ALL_FAVORITES, SAVE_FAVORITES} from "./types"
import {IFavoriteAction, IFavoriteState} from "./interfaces"

export const favoriteInitialState: IFavoriteState = {
    items: []
}

export default function favoriteReducer(state = favoriteInitialState, action: IFavoriteAction){
    switch (action.type){
        case ADD_FAVORITE:
            return { ...state, items: [...state.items, action.payload] }
        case SAVE_FAVORITES:
            return { ...state, items: [...action.payload.products] }
        case REMOVE_FAVORITE:
            const index = state.items.findIndex(item => item.id == action.payload)
            const before = state.items.filter((_, i) => i < index)
            const after = state.items.filter((_, i) => i > index)
            return { ...state, items: [...before, ...after] }
        case REMOVE_ALL_FAVORITES:
            return { ...state, items: [] }
        default:
            return { ...state }
    }
}
