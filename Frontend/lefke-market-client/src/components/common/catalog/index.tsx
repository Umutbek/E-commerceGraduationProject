import {useState, useEffect, useContext, useCallback} from "react"
import makeStyles from '@mui/styles/makeStyles'
import ApiContext from "../../../helpers/api/api-context"
import {useDispatch} from "react-redux"
import {closeCategoryDrawer} from "../../../redux/states/catalog/actions"
import CategoryDrawer from "../drawer/category"
import BreadcrumbList from "../breadcrumb-list/breadcrumb-list"
import {BREAKPOINTS, LISTING} from "../../../enums"
import LeftContent from "./left-content"
import RightContent from "./right-content"

interface ICatalog {
    context: string,
    store: string,
    category?: string,
    subCategory?: string,
    subSubCategory?: string
}

export default function Catalog({ context, store, category = '', subCategory = '', subSubCategory = '' }: ICatalog){

    const classes = useStyles()
    const api = useContext(ApiContext)

    const dispatch = useDispatch()

    const [ordering, setOrdering] = useState<string>('')
    const [costInterval, setCostInterval] = useState({ min_cost: '', max_cost: '' })

    const [listing, setListing] = useState(LISTING.COLUMN)

    const [data, setData] = useState(null)
    const [products, setProducts] = useState([])
    const [isProductsLoading, setIsProductsLoading] = useState(false)
    const [isMoreProductsLoading, setIsMoreProductsLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [nextLink, setNextLink] = useState(null)

    const [breadcrumbs, setBreadcrumbs] = useState([])


    const fetchProducts = useCallback(async () => {
        setIsProductsLoading(true)
        if (store){
            const { success, data } = await api.getProducts(store, category, subCategory, subSubCategory, ordering, costInterval)

            console.log("Success", success)
            console.log("Data", data)

            if (success){
                setProducts(data.results)
                setCount(data.count)
                setNextLink(data.next)
                setData(data.data)

                const breadcrumbs = []

                if (store){
                    store === 'global' ?
                        breadcrumbs.push({ name: 'All', link: `/catalog/${store}` }) :
                        breadcrumbs.push({ name: store, link: `/catalog/${store}` })
                }

                if (store === 'global'){
                    console.log("Store type", store)
                    category && breadcrumbs.push({ name: data.data.category?.nameEn, link: `/catalog/${store}/${category}` })
                    subCategory && breadcrumbs.push({ name: data.data.subcategory?.nameEn, link: `/catalog/${store}/${category}/${subCategory}` })
                    subSubCategory && breadcrumbs.push({ name: data.data.subsubcategory?.nameEn, link: `/catalog/${store}/${category}/${subCategory}/${subSubCategory}` })
                } else {
                    category && breadcrumbs.push({ name: data.data.category?.nameEn, link: `/catalog/${store}/${category}` })
                    subCategory && breadcrumbs.push({ name: data.data.subcategory?.nameEn, link: `/catalog/${store}/${category}/${subCategory}` })
                    subSubCategory && breadcrumbs.push({ name: data.data.subsubcategory?.nameEn, link: `/catalog/${store}/${category}/${subCategory}/${subSubCategory}` })
                }
                setBreadcrumbs(breadcrumbs)

                if (data.next){
                    setHasMore(true)
                } else {
                    setHasMore(false)
                }
            }
        }

        setIsProductsLoading(false)
    }, [nextLink, api, store, category, subCategory, subSubCategory, ordering, costInterval])



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
        dispatch(closeCategoryDrawer())
    }, [store, category, subCategory, subSubCategory])



    useEffect(() => {

        setProducts([])
        if (store){
            fetchProducts().then(null)
        }
    }, [store, category, subCategory, subSubCategory, ordering, costInterval])



    const onSelectOrder = useCallback((newVal) => {
        setNextLink(null)
        setHasMore(false)
        setOrdering((oldVal) => oldVal === newVal ? '' : newVal)
    }, [])

    return (
        <div className={classes.siteContent}>
            <div className={`main-container`}>
                {
                    data && <BreadcrumbList items={breadcrumbs}/>
                }
                <h2 className={classes.title}>
                    { data?.subsubcategory?.nameEn || data?.subcategory?.nameEn || data?.category?.nameEn }
                </h2>

                <div className={classes.contentWrapper}>

                    {/* Left */}
                    <div className={classes.leftContent}>
                        <LeftContent
                            context={context}
                            store={store}
                            category={category}
                            subCategory={subCategory}
                            subSubCategory={subSubCategory}
                            costInterval={costInterval}
                            setCostInterval={setCostInterval}
                        />
                    </div>

                    {/* Right */}
                    <div className={classes.rightContent}>
                        <RightContent
                            ordering={ordering}
                            onSelectOrder={onSelectOrder}
                            count={count}
                            products={products}
                            fetchProductsPagination={fetchProductsPagination}
                            hasMore={hasMore}
                            isProductsLoading={isProductsLoading}
                            isMoreProductsLoading={isMoreProductsLoading}
                            api={api}
                            listing={listing}
                            setListing={setListing}
                        />
                    </div>
                </div>
            </div>
            <CategoryDrawer storeName={store ? store.toString() : 'global'}/>
        </div>
    )
}

const useStyles = makeStyles({
    siteContent: {
        backgroundColor: '#fff',

        paddingTop: 10,

        minHeight: '70vh',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            paddingTop: 130,
        }

    },
    contentWrapper: {
        marginTop: 32,
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            marginTop: 8,
        }
    },
    leftContent: {
        width: '21.538461538%',

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            width: '25%'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '100%'
        },
    },
    rightContent: {
        width: 'calc(74.615384615% + 8px)',
        minHeight: '80vh',

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            width: '70%'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '100%'
        }
    },
    title: {
        fontWeight: 500,
        fontSize: '32px',
        margin: '8px 0 0',
        color: '#000000'
    },

})

const parseQuery = (query: any) => {

    let store = ''
    let category = ''
    let subCategory = ''
    let subSubCategory = ''

    const slug = query.slug

    if (slug){
        slug[0] && (store = slug[0])
        slug[1] && (category = slug[1])
        slug[2] && (subCategory = slug[2])
        slug[3] && (subSubCategory = slug[3])
    }

    return { store, category, subCategory, subSubCategory }
}
