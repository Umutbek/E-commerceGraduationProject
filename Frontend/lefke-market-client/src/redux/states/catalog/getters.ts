import {ICatalog, ICategory} from "./interfaces"

export const getIsCatalogDrawerOpen = (state: any) => state.catalog.isCatalogDrawerOpen

export const getCategories = (state: any) => state.catalog.categories

export const getSubCategories = (state: any, categoryId: number) =>
    state.catalog.categories.find((cat: ICategory) => cat.id === categoryId).subCategories


export const getIsCategoriesLoading = (state: any) => state.catalog.isCategoriesLoading

export const getIsSubCategoriesLoading = (state: any) => state.catalog.isSubCategoriesLoading

export const getIsSubSubCategoriesLoading = (state: any) => state.catalog.isSubSubCategoriesLoading