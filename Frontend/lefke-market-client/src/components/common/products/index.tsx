import {memo} from "react"
import ProductsList from "./products-list"
import {IProduct} from "./interfaces"
import ProductItem from "./product-item"

interface IProductsProps {
    products: any,
    api: any,
    listing: number,
}

function Products({ products, api, listing }: IProductsProps) {

    return (
        <>
            <ProductsList>
                {
                    products.map((product: IProduct) => {
                        return <ProductItem key={product.id} product={product} api={api} listing={listing}/>
                    })
                }
            </ProductsList>
        </>
    )
}

function productsAreEqual(prevProps: any, nextProps: any) {
    return prevProps.products === nextProps.products && prevProps.listing === nextProps.listing
}

export default memo(Products, productsAreEqual)
