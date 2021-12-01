import {AppDispatch, AppGetState} from "../../store"
import {_baseApi} from "../../../helpers/api/api"
import {ICategory, ISubCategory, ISubSubCategory} from "./interfaces"
import {
    CATEGORIES_FETCHING_ERROR,
    SUBCATEGORIES_FETCHING_ERROR,
    SET_CATEGORIES,
    CLOSE_CATEGORY_DRAWER,
    OPEN_CATEGORY_DRAWER,
    SET_SUBCATEGORIES,
    SET_SUBSUBCATEGORIES,
    SUBSUBCATEGORIES_FETCHING_ERROR, LOADING_CATEGORIES, LOADING_SUBCATEGORIES, LOADING_SUBSUBCATEGORIES
} from "./types"
import {ERROR} from "../../../enums"


export const openCategoryDrawer = () => ({
    type: OPEN_CATEGORY_DRAWER,
    payload: {}
})

export const closeCategoryDrawer = () => ({
    type: CLOSE_CATEGORY_DRAWER,
    payload: {}
})


export const fetchCategories = (storeName: string) => async (dispatch: AppDispatch, getState: AppGetState) => {
    dispatch(setLoadingCategories())
    try {

        const params = storeName === 'global' ?
            `${_baseApi}/item/category/` :
            `${_baseApi}/item/categories/`

        const response = await fetch(`${params}`)

        const data = await response.json()

        if (response.ok){
            dispatch(setCategories(data))
        } else {
            dispatch(categoriesFetchingError(data?.detail || ERROR.SOMETHING_WENT_WRONG))
        }
    } catch (e){
        dispatch(categoriesFetchingError(ERROR.SOMETHING_WENT_WRONG))
    }
}

export const fetchSubCategories = (categoryId: number) => async (dispatch: AppDispatch, getState: AppGetState) => {
    dispatch(setLoadingSubCategories())
    try {
        const response = await fetch(`${_baseApi}/item/subcategory/?category=${categoryId}`)
        const data = await response.json()

        if (response.ok){
            dispatch(setSubCategories(categoryId, data))
        } else {
            dispatch(subCategoriesFetchingError(ERROR.SOMETHING_WENT_WRONG))
        }

    } catch (e) {
        dispatch(subCategoriesFetchingError(ERROR.SOMETHING_WENT_WRONG))
    }
}

export const fetchSubSubCategories = (categoryId: number, subCategoryId: number) => async (dispatch: AppDispatch, getState: AppGetState) => {
    dispatch(setLoadingSubSubCategories())
    try {
        const response = await fetch(`${_baseApi}/item/subsubcategory/?subcategory=${subCategoryId}`)
        const data = await response.json()

        if (response.ok){
            dispatch(setSubSubCategories(categoryId, subCategoryId, data))
        } else {
            dispatch(subSubCategoriesFetchingError(ERROR.SOMETHING_WENT_WRONG))
        }
    } catch (e) {
        dispatch(subSubCategoriesFetchingError(ERROR.SOMETHING_WENT_WRONG))
    }
}

export const setCategories = (categories: ICategory[]) => ({
    type: SET_CATEGORIES,
    payload: {categories}
})

export const setSubCategories = (categoryId: number, subCategories: ISubCategory[]) => ({
    type: SET_SUBCATEGORIES,
    payload: {categoryId, subCategories}
})

export const setSubSubCategories = (categoryId: number, subCategoryId: number, subSubCategories: ISubSubCategory[]) => ({
    type: SET_SUBSUBCATEGORIES,
    payload: {categoryId, subCategoryId, subSubCategories}
})


export const categoriesFetchingError = (error: any) => ({
    type: CATEGORIES_FETCHING_ERROR,
    payload: {error}
})

export const subCategoriesFetchingError = (error: any) => ({
    type: SUBCATEGORIES_FETCHING_ERROR,
    payload: {error}
})

export const subSubCategoriesFetchingError = (error: any) => ({
    type: SUBSUBCATEGORIES_FETCHING_ERROR,
    payload: {error}
})

export const setLoadingCategories = () => ({
    type: LOADING_CATEGORIES,
    payload: {}
})

export const setLoadingSubCategories = () => ({
    type: LOADING_SUBCATEGORIES,
    payload: {}
})

export const setLoadingSubSubCategories = () => ({
    type: LOADING_SUBSUBCATEGORIES,
    payload: {}
})