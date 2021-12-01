import Grid from "@mui/material/Grid"
import Banner2 from "../src/components/pages/main/banners/banner2"
import makeStyles from "@mui/styles/makeStyles"
import {BREAKPOINTS, LISTING} from "../src/enums"
import {useCallback, useContext, useEffect, useState} from "react"
import ApiContext from "../src/helpers/api/api-context"
import ProductsList from "../src/components/common/products/products-list"
import {IProduct} from "../src/components/common/products/interfaces"
import ProductItem from "../src/components/common/products/product-item"
import {FullContentSpinner} from "../src/components/common/spinners/spinner"
import {_baseApi} from "../src/helpers/api/api"

const useStyles = makeStyles({
    mainContent: {
        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            paddingTop: 120
        },
    },
    showAllBtn: {
        color: '#4F4E4E',
        marginLeft: 50,
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        borderRadius: '8px',
        padding: '8px 16px',
    }
})

export default function Home({products = []}: any) {

    const classes = useStyles()
    const api = useContext(ApiContext)

    const [popularProducts, setPopularProducts] = useState([])
    const [isPopularProductsLoading, setIsPopularProductsLoading] = useState(false)

    const fetchPopularProducts = useCallback(async () => {
        setIsPopularProductsLoading(true)

        const { success, data } = await api.getPopularProducts()

        if (success){
            setPopularProducts(data.results)
        }

        setIsPopularProductsLoading(false)
    }, [])

  return (
    <>
        <main className={classes.mainContent}>
            <div className="main-container">
                <Grid container>
                    <Grid item xs={12}>
                        <Banner2/>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <ProductsList title={"Popular products"}>
                                {
                                    isPopularProductsLoading ? <FullContentSpinner/> :
                                        products.map((product: IProduct) => (
                                            <ProductItem key={product.id} product={product} api={api} isMain listing={LISTING.COLUMN}/>
                                        ))
                                }
                            </ProductsList>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </main>
    </>
  )
}


export async function getServerSideProps(params: any) {

    let products = []

    // Fetch data from external API
    try {
        const response = await fetch(`${_baseApi}/item/item/?ordering=view`)

        const data = await response.json()

        if (response.ok){
            products = data.results
        }
    } catch (e) {
        console.log('SOMETHING WENT WRONG WHEN SERVER SIDE FETCHING: ', e)
    }
    // Pass data to the page via props
    return {
        props: {
            products,
            ...(await (params.locale, ['common', 'footer']))
        }
    }
}