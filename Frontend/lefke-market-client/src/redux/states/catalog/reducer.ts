import {
    SET_CATEGORIES,
    SET_SUBCATEGORIES,
    SET_SUBSUBCATEGORIES,
    CLOSE_CATEGORY_DRAWER,
    OPEN_CATEGORY_DRAWER,
    LOADING_CATEGORIES,
    LOADING_SUBCATEGORIES,
    LOADING_SUBSUBCATEGORIES,
    CATEGORIES_FETCHING_ERROR,
    SUBCATEGORIES_FETCHING_ERROR,
    SUBSUBCATEGORIES_FETCHING_ERROR,
} from "./types"
import {ICatalog, ICatalogAction, ICategory, ISubCategory} from "./interfaces"

export const catalogInitialState: ICatalog = {
    isCatalogDrawerOpen: false,
    categories: [],
    isCategoriesLoading: false,
    isSubCategoriesLoading: false,
    isSubSubCategoriesLoading: false
}

export default function catalogReducer(state: ICatalog = catalogInitialState, action: ICatalogAction) {
    switch (action.type){
        case OPEN_CATEGORY_DRAWER:
            return {
                ...state,
                isCatalogDrawerOpen: true
            }
        case CLOSE_CATEGORY_DRAWER:
            return {
                ...state,
                isCatalogDrawerOpen: false
            }
        case LOADING_CATEGORIES:
            return {
                ...state,
                isCategoriesLoading: true
            }
        case LOADING_SUBCATEGORIES:
            return {
                ...state,
                isSubCategoriesLoading: true
            }
        case LOADING_SUBSUBCATEGORIES:
            return {
                ...state,
                isSubSubCategoriesLoading: true
            }
        case SET_CATEGORIES:
            const cats = action.payload.categories.map((cat: ICategory) => {
                const subCategories: object[] = []
                return {
                    ...cat,
                    subCategories,
                    isSubCategoriesInitialized: false}
            })
            return {
                ...state,
                categories: cats,
                isCategoriesLoading: false
            }
        case SET_SUBCATEGORIES:
            const newStateWithSub = getCategoriesWithSubCategories(state, action)

            return {
                ...state,
                categories: newStateWithSub,
                isSubCategoriesLoading: false
            }
        case SET_SUBSUBCATEGORIES:
            const newStateWithSubSub = getCategoriesWithSubSubCategories(state, action)

            return {
                ...state,
                categories: newStateWithSubSub,
                isSubSubCategoriesLoading: false
            }
        case CATEGORIES_FETCHING_ERROR:
            return {
                ...state,
                isCategoriesLoading: false
            }
        case SUBCATEGORIES_FETCHING_ERROR:
            return {
                ...state,
                isSubCategoriesLoading: false
            }
        case SUBSUBCATEGORIES_FETCHING_ERROR:
            return {
                ...state,
                isSubSubCategoriesLoading: false
            }
        default:
            return {
                ...state
            }
    }
}


const getCategoriesWithSubCategories = (state: any, action: ICatalogAction) => {
    const catId = action.payload.categoryId
    const subCats = action.payload.subCategories.map((subCat: object) => {
        const subSubCats: ISubCategory[] = []
        return {
            ...subCat,
            subSubCats,
            isSubSubCategoriesInitialized: false
        }
    })

    // @ts-ignore
    const catIndex: number = state.categories.findIndex(cat => cat.id === catId)
    const before: ICategory[] = state.categories.filter((_: ICategory, index: number) => index < catIndex)
    const after: ICategory[] = state.categories.filter((_: ICategory, index: number) => index > catIndex)

    const cat = {...state.categories[catIndex], subCategories: subCats, isSubCategoriesInitialized: true}

    return [...before, cat, ...after]
}

const getCategoriesWithSubSubCategories = (state: any, action: ICatalogAction) => {
    const catId = action.payload.categoryId
    const subCatId = action.payload.subCategoryId

    const cat = state.categories.find((cat: ICategory) => cat.id === catId)
    const subCats = cat.subCategories

    const currSubIndex = subCats.findIndex((s: ISubCategory) => s.id === subCatId)
    const subBefore = subCats.filter((_: ISubCategory, index: number) => index < currSubIndex)
    const subAfter = subCats.filter((_:ISubCategory, index: number) => index > currSubIndex)
    const subCurr = subCats[currSubIndex]

    const newSub = {...subCurr, subSubCategories: action.payload.subSubCategories, isSubSubCategoriesInitialized: true}

    const newSubs = [...subBefore, newSub, ...subAfter]

    const newCat = {...cat, subCategories: newSubs}

    // @ts-ignore
    const catIndex: number = state.categories.findIndex(cat => cat.id === catId)
    const before: ICategory[] = state.categories.filter((_: ICategory, index: number) => index < catIndex)
    const after: ICategory[] = state.categories.filter((_: ICategory, index: number) => index > catIndex)

    return [...before, newCat, ...after]
}
