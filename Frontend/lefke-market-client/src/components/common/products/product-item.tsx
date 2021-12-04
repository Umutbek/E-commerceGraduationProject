import {memo} from "react"
import {IProduct} from "./interfaces"
import {useDispatch, useSelector} from "react-redux"
import ProductItemView from "./views/product-item-view"
import MainProductItemView from "./views/main-product-item-view"
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

    console.log("Product " + product)

    if (listing === LISTING.ROW){
        return <ProductItemFullWidthView
            product={product}
        />
    }

    if (isMain) {
        return <MainProductItemView
            product={product}
        />
    }

    return <ProductItemView
        product={product}
    />
}

export default memo(ProductItem)
