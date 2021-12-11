export const getFavorites = (state: any) => state.favorites.items

export const getFavoriteItemsIds = (state: any) => state.favorites.items.map((f: any) => f.id)
