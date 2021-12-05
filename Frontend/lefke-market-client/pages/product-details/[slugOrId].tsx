import {useState, useEffect, useCallback, useContext} from 'react'
import { useRouter } from "next/router"
import makeStyles from "@mui/styles/makeStyles"
import BreadcrumbList from "../../src/components/common/breadcrumb-list"
import ProductDetailsImages from "../../src/components/common/product-details-images"
import ProductDetailsCard from "../../src/components/common/product-details-card"
import ProductDetailsBottomTabs from "../../src/components/common/product-details-bottom-tabs"
import {BREAKPOINTS} from "../../src/enums"
import ApiContext from "../../src/helpers/api/api-context"
import {FullContentSpinner} from "../../src/components/common/spinners/spinner"
import {GetStaticPaths} from "next";


const useStyles = makeStyles({
    page: {
        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            paddingTop: 120
        },
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',

        minHeight: '70vh',
    },
    breadcrumbsContainer: {
        width: '100%',
        order: 1,
        margin: '24px 0',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            display: 'none'
        }
    },
    firstSection: {
        width: '100%',
        order: 2,

        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    imagesGallery: {
        width: '57.616%',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '48%',
            marginTop: 20,
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
        },
    },
    detailCard: {
        width: '40.7693%',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '48%',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
        }
    },

    bottomTabs: {
        width: '100%',
        order: 4,
        marginTop: 60,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            order: 3,
            marginTop: 32,
        }
    }
})

function ProductDetailsPage() {

    const router = useRouter()
    const classes = useStyles()
    const api = useContext(ApiContext)

    const slugOrId = router.query.slugOrId

    const [product, setProduct] = useState(null)
    const [productLoading, setProductLoading] = useState(false)

    const [breadcrumbs, setBreadcrumbs] = useState([])

    const fetchProductBySlug = useCallback(async (slug: string) => {
        setProductLoading(true)
        const { success, data } = await api.getProductBySlug(slug)

        if (success){
            setProduct(data)
        }

        setProductLoading(false)
    }, [])

    const fetchProductById = useCallback(async (id: string) => {
        setProductLoading(true)
        const { success, data } = await api.getProductById(id)

        if (success){
            setProduct(data)

            const {supplier, category, subcategory, subsubcategory} = data

            const breadcrumbs = []

            if (data.supplier){
                breadcrumbs.push({ name: supplier.name, link: `/stores/${supplier.slug}` })
            }

            category && breadcrumbs.push({ name: category?.nameRus, link: `/catalog/${supplier.slug}/${category.slug}` })
            subcategory && breadcrumbs.push({ name: subcategory?.nameRus, link: `/catalog/${supplier.slug}/${category.slug}/${subcategory.slug}` })
            subsubcategory && breadcrumbs.push({ name: subsubcategory?.nameRus, link: `/catalog/${supplier.slug}/${category.slug}/${subcategory.slug}/${subsubcategory.slug}` })

            setBreadcrumbs(breadcrumbs)
        }

        setProductLoading(false)
    }, [])

    useEffect(() => {

        if (slugOrId){

            if (Number.isInteger(+slugOrId)){
                // @ts-ignore
                fetchProductById(slugOrId).then(null)
            } else {
                // @ts-ignore
                fetchProductBySlug(slugOrId).then(null)
            }
        }

    }, [slugOrId])

    return(
        <div className={classes.page}>
            <div className="main-container">
                <div className={classes.content}>
                    {
                        productLoading ? <FullContentSpinner/> :
                            product && <>
                                <div className={classes.breadcrumbsContainer}>
                                    <BreadcrumbList items={breadcrumbs}/>
                                </div>

                                <div className={classes.firstSection}>
                                    <div className={classes.imagesGallery}>
                                        <ProductDetailsImages images={[{ original: product.image, thumbnail: product.image }]}/>
                                    </div>
                                    <div className={classes.detailCard}>
                                        <ProductDetailsCard product={product}/>
                                    </div>

                                    <div className={classes.bottomTabs}>
                                        <ProductDetailsBottomTabs product={product}/>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export const getStaticProps = async (params: any) => ({
    props: {
        ...(await (params.locale, ['common', 'footer']))
    }
})

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export default ProductDetailsPage
