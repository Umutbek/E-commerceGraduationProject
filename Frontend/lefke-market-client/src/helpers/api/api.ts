import {ERROR} from "../../enums"

export const _baseApi = process.env.BASE_API || 'https://lefkemarketbackend.herokuapp.com/api'

interface IGetProducts {
    store: string
    category: string | null,
        subCategory: string | null,
        subSubCategory: string | null
}

export default class Api {

//    Products

    getProducts = async (store: string, category: string, subCategory: string, subSubCategory: string, ordering: string, costInterval: any) => {

        try {

            const { min_cost, max_cost } = costInterval

            let url

            url = `${_baseApi}/item/item/?category_slug=${category}&subcategory_slug=${subCategory}&subsubcategory_slug=${subSubCategory}`

            console.log("Category sukala" + category)

            ordering && (url += `&ordering=${ordering}`)

            min_cost && (url += `&min_cost=${min_cost}`)

            max_cost && (url += `&max_cost=${max_cost}`)

            const response = await fetch(url)

            const data = await response.json()

            if (!response.ok){
                return { success: false, data: data.detail}
            }

            return { success: true, data }

        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getProductsPagination = async (nextLink: string) => {

        try {
            const response = await fetch(nextLink)

            const data = await response.json()

            return { success: true, data }
        } catch (e) {
            return { success: false, data: {} }
        }
    }

    getProductById = async (id: number | string) => {

        try {
            const response = await fetch(`${_baseApi}/item/item/${id}/`)

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }

    }

    getProductBySlug = async (slug: string) => {

        try {
            const response = await fetch(`${_baseApi}/item/item/${slug}/`)

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }

    }

    getProductsBySearchText = async (searchText: string) => {

        try {

            const response = await fetch(`${_baseApi}/item/item/?search=${searchText}`)

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }

        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getPopularProducts = async () => {
        try {
            const response = await fetch(`${_baseApi}/item/item/?ordering=views`)

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }


//    Categories

    getCategories = async (store: string) => {
        try {

            const response = await fetch(`${_baseApi}/item/category/`)

            const data = await response.json()

            return { success: true, data }
        } catch (e){
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getSubCategories = async (store: string, category: string) => {
        try {

            const response = await fetch(`${_baseApi}/item/subcategory/?category_slug=${category}`)
            const data = await response.json()

            return { success: true, data }
        } catch (e){
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getSubSubCategories = async (store: string, category: string, subCategory: string) => {
        try {

            const response = await fetch(`${_baseApi}/item/subsubcategory/?subcategory_slug=${subCategory}`)
            const data = await response.json()

            return { success: true, data }
        } catch (e){
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getStoreInfo = async (slugOrId: number | string) => {
        try {
            let url = ''

            if (Number.isInteger(+slugOrId)){
                url = `${_baseApi}/user/store/${slugOrId}/`
            } else {
                url = `${_baseApi}/user/store/${slugOrId}`
            }

            const response = await fetch(url)

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }
}