import {ERROR} from "../../enums"

export const _baseApi = process.env.BASE_API || 'https://lefkemarketbackend.herokuapp.com/api'

interface IGetProducts {
    store: string
    category: string | null,
        subCategory: string | null,
        subSubCategory: string | null
}

export default class Api {

    // Authorization

    register = async (phone: string, fullName: string, address: string, password:string) => {
        try {
            const response = await fetch(`${_baseApi}/user/client/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: `+${phone}`, username: fullName, address: address, password: password, type: 1 })
            })

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            let message = ERROR.SOMETHING_WENT_WRONG

            if (Array.isArray(data.detail) && data.detail.length){
                message = data.detail[0]
            } else if (data.detail) {
                message = data.detail
            } else if (Array.isArray(data.login) && data.login.length){
                message = data.login[0]
            }

            return { success: false, data: { message } }
        } catch (e) {
            return { success: false, data: { message: ERROR.SOMETHING_WENT_WRONG } }
        }
    }

    verifyCode = async (phone: string, password: string) => {

        try {
            const response = await fetch(`${_baseApi}/user/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: `+${phone}`, password: password })
            })

            const data = await response.json()

            console.log("Response", response)
            console.log("Data", data)

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data: { detail: data.detail, message: null } }
        } catch (e) {
            return { success: false, data: { detail: null, message: ERROR.SOMETHING_WENT_WRONG } }
        }
    }

//    Products

    getProducts = async (store: string, category: string, subCategory: string, subSubCategory: string, ordering: string, costInterval: any) => {

        try {

            const { min_cost, max_cost } = costInterval

            let url

            url = `${_baseApi}/item/item/?category_slug=${category}&subcategory_slug=${subCategory}&subsubcategory_slug=${subSubCategory}&supplier=${store}`

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

    getStoreProducts = async () => {
        try {
            console.log("Suka ya rabotayu")
            const response = await fetch(`${_baseApi}/item/item`)

            const data = await response.json()

            if (response.ok){
                console.log("ok")
                return { success: true, data }
            }

            console.log("Not ok")
            return { success: false, data }

        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }


//    Categories

    getCategories = async (store: number) => {
        try {

            const response = await fetch(`${_baseApi}/item/category/?store=${store}`)

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

    getStoreCategory = async (store: string) => {
        try {

            const response = await fetch(`${_baseApi}/user/storecategory/`)

            const data = await response.json()

            return { success: true, data }
        } catch (e){
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

//Store

    getStoreInfo = async (slugOrId: string) => {


        try {

            const response = await fetch(`${_baseApi}/user/store/${slugOrId}/`)

            console.log("Response ", response)

            const data = await response.json()

            console.log("Data ", data)

            if (response.ok){
                return { success: true, data }
            }
            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getStores = async (categorySlug: string) => {
        try {

            const response = await fetch(`${_baseApi}/user/store/?storecategory=${categorySlug}`)
            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e){
            return { success: true, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    getStoreCategories = async (slugOrdId: number | string) => {
        try {
            let params = `?store=${slugOrdId}`

            const response = await fetch(`${_baseApi}/item/category/${params}`)

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }


    getUserFavorites = async (userId: number | string) => {
        try {
            const response = await fetch(`${_baseApi}/item/getuserfavourite/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken()}`
                }
            })

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    addToFavorite = async (productId: number | string, userId: number | string) => {
        try {
            const response = await fetch(`${_baseApi}/item/userfavourite/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getToken()}`
                },
                body: JSON.stringify({item: productId, user: userId})
            })

            const data = await response.json()

            if (response.ok){
                return { success: true, data }
            }

            return { success: false, data }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }

    deleteFromFavorites = async (productId: number | string) => {
        try {
            const response = await fetch(`${_baseApi}/item/getuserfavourite/${productId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Token ${getToken()}` }
            })

            // const data = await response.json()

            if (response.ok){
                return { success: true, data: {} }
            }

            return { success: false, data: {} }
        } catch (e) {
            return { success: false, data: ERROR.SOMETHING_WENT_WRONG }
        }
    }
}