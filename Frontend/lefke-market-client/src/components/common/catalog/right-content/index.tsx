import {memo} from 'react'
import Sorting from "./sorting"
import Listing from "./listing"
import makeStyles from "@mui/styles/makeStyles"
import {BREAKPOINTS} from "../../../../enums"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner, {FullContentSpinner} from "../../spinners/spinner"
import Products from "../../products"

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            padding: '8px 16px'
        }
    },
    line: {
        margin: 0,
        padding: 0,
        height: 1,
        backgroundColor: '#C4C4C4'
    }
})

interface IRightContentProps {
    ordering: string,
    onSelectOrder: (ordering: string) => void,
    count: number
    products: any
    fetchProductsPagination: any
    hasMore: boolean
    isProductsLoading: boolean
    isMoreProductsLoading: boolean,
    api: any,
    listing: number,
    setListing: (listing: number) => void,
}

function RightContent({ ordering, onSelectOrder, fetchProductsPagination, hasMore, isProductsLoading, isMoreProductsLoading, products, api, listing, setListing }: IRightContentProps) {

    const classes = useStyles()

    return (
        <section>
            <div className={classes.header}>

                <Sorting ordering={ordering} onSelectOrder={onSelectOrder}/>

                <Listing listing={listing} setListing={setListing}/>

            </div>

            <div className={classes.line}/>

            <InfiniteScroll
                dataLength={products.length}
                next={fetchProductsPagination}
                hasMore={hasMore}
                loader={''}
            >

                <Products
                    products={products}
                    api={api}
                    listing={listing}
                />

            </InfiniteScroll>
            { isProductsLoading && <FullContentSpinner/> }
            { isMoreProductsLoading && <Spinner/> }
        </section>
    )
}

export default memo(RightContent)
