import {useCallback, useContext, useEffect, useState} from 'react'
import ApiContext from "../../../helpers/api/api-context"
import Products from "../../../components/common/products"
import {LISTING} from "../../../enums"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner, {FullContentSpinner} from "../../../components/common/spinners/spinner"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles({
    page: {
        [`@media screen and (max-width: 1024px)`]: {
            paddingTop: 120,
        }
    }
})

function ResultsContent({ searchText = '' }: { searchText: string }) {
    const api = useContext(ApiContext)
    const classes = useStyles()

    const [products, setProducts] = useState([])
    const [isProductsLoading, setIsProductsLoading] = useState(false)
    const [isMoreProductsLoading, setIsMoreProductsLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [nextLink, setNextLink] = useState(null)

    const fetchProducts = async () => {
        setIsProductsLoading(true)
        if (typeof searchText === 'string'){
            const { success, data } = await api.getProductsBySearchText(searchText)

            if (success) {
                setProducts(data.results)
                setCount(data.count)
                setNextLink(data.next)

                if (data.next){
                    setHasMore(true)
                } else {
                    setHasMore(false)
                }
            }
        }

        setIsProductsLoading(false)
    }

    const fetchProductsPagination = useCallback(async () => {
        setIsMoreProductsLoading(true)
        if (typeof nextLink === 'string'){
            const { success, data } = await api.getProductsPagination(nextLink)

            if (success){
                setProducts(products => [...products, ...data.results])
                setNextLink(data.next)

                if (data.next){
                    setHasMore(true)
                } else {
                    setHasMore(false)
                }
            }
        }
        setIsMoreProductsLoading(false)
    }, [nextLink])

    useEffect(() => {
        fetchProducts().then(null)
    }, [searchText])

    return (
        <div className={classes.page}>
            <div className="main-container">
                { searchText.length ? <h1>Search results: { `"${searchText}"` }</h1> : null }
                <div>
                    <InfiniteScroll
                        dataLength={products.length}
                        next={fetchProductsPagination}
                        hasMore={hasMore}
                        loader={''}
                    >
                        <Products
                            products={products}
                            api={api}
                            listing={LISTING.COLUMN}
                        />

                    </InfiniteScroll>
                    { isProductsLoading && <FullContentSpinner/> }
                    { isMoreProductsLoading && <Spinner/> }
                </div>
            </div>
        </div>
    )
}

export default ResultsContent
