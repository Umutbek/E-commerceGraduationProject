import {memo} from "react"
import {IProduct} from "./interfaces"
import {addFavorite, removeFavorite} from "../../../redux/states/favorite/actions"
import {useDispatch, useSelector} from "react-redux"
import {getFavoriteItemsIds} from "../../../redux/states/favorite/getters"
import {openAuthModal} from "../../../redux/states/settings/actions"
import ProductItemView from "./views/product-item-view"
import MainProductItemView from "./views/main-product-item-view"
import {getIsAuth, getUser} from "../../../redux/states/auth/getters"
import {LISTING} from "../../../enums";
import ProductItemFullWidthView from "./views/product-item-full-width-view";

interface IProductItemProps {
    product: IProduct,
    isMain?: boolean,
    api: any,
    listing: number,
}

function ProductItem({product, isMain = false, api, listing}: IProductItemProps){

    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const isAuth = useSelector(getIsAuth)

    const favoriteIds = useSelector(getFavoriteItemsIds)

    const handleFavoriteBtnClick = async (e: MouseEvent) => {
        e.preventDefault()
        if (isAuth){
            if(favoriteIds.includes(product.id)) {
                dispatch(removeFavorite(product.id))
                const { success } = await api.deleteFromFavorites(product.id)

                if (success){
                    console.log('product removed from favorites: ', product.id)
                }

            } else {
                dispatch(addFavorite(product))
                const { success, data } = await api.addToFavorite(product.id, user.id)

                if (success){
                    console.log('product added to favourite: ', data)
                }
            }
        } else {
            dispatch(openAuthModal())
        }
    }

    const isInFavorites = favoriteIds.includes(product.id)


    if (listing === LISTING.ROW){
        return <ProductItemFullWidthView
            handleFavoriteBtnClick={handleFavoriteBtnClick}
            isInFavorites={isInFavorites}
            product={product}
        />
    }

    if (isMain) {
        return <MainProductItemView
            handleFavoriteBtnClick={handleFavoriteBtnClick}
            isInFavorites={isInFavorites}
            product={product}
        />
    }

    return <ProductItemView
        handleFavoriteBtnClick={handleFavoriteBtnClick}
        isInFavorites={isInFavorites}
        product={product}
    />
}

export default memo(ProductItem)
