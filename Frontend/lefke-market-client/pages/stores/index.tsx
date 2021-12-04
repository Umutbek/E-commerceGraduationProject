import makeStyles from "@mui/styles/makeStyles"
import BreadcrumbList from "../../src/components/common/breadcrumb-list"
import {BREAKPOINTS} from "../../src/enums"
import CategorySlider from "../../src/components/pages/stores/category-slider"
import ApiContext from "../../src/helpers/api/api-context"
import {useCallback, useContext, useEffect, useState} from "react"
import StoresList from "../../src/components/pages/stores/stores-list"
import StoresItem from "../../src/components/pages/stores/stores-item"

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

const categories = [
    { id: 1, nameEn: 'category1', },
    { id: 2, nameEn: 'category2', },
    { id: 3, nameEn: 'category3', },
    { id: 4, nameEn: 'category4', },
    { id: 5, nameEn: 'category5', }
]

export default function Stores(){

    const api = useContext(ApiContext)
    const classes = useStyles()

    const [globalCategories, setGlobalCategories] = useState([])
    const [stores, setStores] = useState([])
    const [selectedCategorySlug, setSelectedCategorySlug] = useState('')

    const fetchGlobalCategories = async () => {
        const { success, data } = await api.getStoreCategory('global')

        if (success){
            setGlobalCategories(data)
        }
    }

    const fetchStores = async (categorySlug: string) => {
        const { success, data } = await api.getStores(categorySlug)

        if (success){
            setStores(data)
        }

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
                    <CategorySlider
                        categories={globalCategories}
                        selectedCategorySlug={selectedCategorySlug}
                        setSelectedCategorySlug={setSelectedCategorySlug}
                    />
                    <StoresList>
                        { stores.map(store =>
                            <StoresItem key={store.id} id={store.id} slug={store.slug} icon={store.avatar}>{ store.username }</StoresItem>
                        )}
                    </StoresList>
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
