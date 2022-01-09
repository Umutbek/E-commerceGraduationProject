import makeStyles from "@mui/styles/makeStyles"
import BreadcrumbList from "../../src/components/common/breadcrumb-list"
import {BREAKPOINTS} from "../../src/enums"
import CategorySlider from "../../src/components/pages/stores/category-slider"
import ApiContext from "../../src/helpers/api/api-context"
import {useContext, useEffect, useState} from "react"
import StoresList from "../../src/components/pages/stores/stores-list"
import StoresItem from "../../src/components/pages/stores/stores-item"
import {CustomCircularProgress} from "../../src/components/common/custom-progress";
import Spinner, {FullContentSpinner} from "../../src/components/common/spinners/spinner";

const useStyles = makeStyles({
    page: {
        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            paddingTop: 120
        },
    },
    content: {
        marginTop: 24,
    }
})

const breadCrumbs = [
    { name: 'Main', link: '/' },
    { name: 'Stores', link: '/stores' },
]


export default function Stores(){

    const api = useContext(ApiContext)
    const classes = useStyles()

    const [globalCategories, setGlobalCategories] = useState([])

    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
    const [isStoresLoading, setIsStoresLoading] = useState(false)

    const [stores, setStores] = useState([])
    const [selectedCategorySlug, setSelectedCategorySlug] = useState('')

    const fetchGlobalCategories = async () => {
        setIsCategoriesLoading(true)
        const { success, data } = await api.getStoreCategory('global')

        if (success){
            setGlobalCategories(data)
        }
        setIsCategoriesLoading(false)

    }

    const fetchStores = async (categorySlug: string) => {

        setIsStoresLoading(true)
        const { success, data } = await api.getStores(categorySlug)

        if (success){
            setStores(data)
        }
        setIsStoresLoading(false)
    }

    console.log('categories: ', globalCategories)

    useEffect(() => {
        fetchGlobalCategories().then(null)
    }, [])

    useEffect(() => {
        fetchStores(selectedCategorySlug).then(null)
    }, [selectedCategorySlug])


    return <>
        <div className={classes.page}>
            <div className="main-container">
                <div className={classes.content}>
                    <BreadcrumbList items={breadCrumbs}/>
                    <h1>Stores</h1>
                    {
                        isCategoriesLoading ? <Spinner/> :
                            <CategorySlider
                                categories={globalCategories}
                                selectedCategorySlug={selectedCategorySlug}
                                setSelectedCategorySlug={setSelectedCategorySlug}
                            />
                    }
                    {
                        isStoresLoading ? <FullContentSpinner/> :
                            <StoresList>
                                { stores.map(store =>
                                    <StoresItem key={store.id} id={store.id} slug={store.slug} icon={store.avatar}>{ store.username }</StoresItem>
                                )}
                            </StoresList>
                    }

                </div>
            </div>
        </div>
    </>
}


export const getStaticProps = async (params: any) => ({
    props: {
        ...(await (params.locale, ['common', 'footer']))
    }
})
