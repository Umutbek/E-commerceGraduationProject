import {useCallback, useContext, useEffect, useState} from 'react'
import {SCREEN_TYPE} from "../../../../../enums"
import ApiContext from "../../../../../helpers/api/api-context"
import {useSelector} from "react-redux"
import {getScreenType} from "../../../../../redux/states/settings/getters"
import CategoriesDesktop from "./desktop"
import CategoriesMobile from "./mobile"


interface ICategoriesProps {
    context: string,
    store: string,
    category: string,
    subCategory: string,
    subSubCategory: string
}

const addLinkToCategories = (cats: any, context: any, store: any, category: any, subCategory: any) => {
    let link = '/catalog'

    if (context === 'subSubCategory' || context === 'subCategory'){
        link += `/${store}/${category}/${subCategory}`
    } else if (context === 'category') {
        link += `/${store}/${category}`
    } else {
        link += `/${store}`
    }

    return cats.map((c: any) => ({
        ...c,
        link: `${link}/${c.slug}`
    }))

}

function Categories({ context, store, category, subCategory, subSubCategory }: ICategoriesProps) {

    const api = useContext(ApiContext)
    const screenType = useSelector(getScreenType)

    const [categories, setCategories] = useState([])

    const fetchCategories = useCallback(async () => {

        let result = null

        if (context === 'subSubCategory' || context === 'subCategory'){
            result = await api.getSubSubCategories(store, category, subCategory)
        } else if (context === 'category'){
            result = await api.getSubCategories(store, category)
        } else if (context === 'store') {
            result = await api.getCategories(store)
        }

        if (result && result.success && Array.isArray(result.data)) {
            setCategories(addLinkToCategories(result.data, context, store, category, subCategory))
        } else {

        }

    }, [context, api, store, category, subCategory])

    useEffect(() => {
        fetchCategories().then(null)
    }, [])

    return (<>
        {
            screenType === SCREEN_TYPE.DESKTOP ?
                <CategoriesDesktop
                    categories={categories}
                /> :
                <CategoriesMobile
                    categories={categories}
                />
        }
    </>)
}

export default Categories
