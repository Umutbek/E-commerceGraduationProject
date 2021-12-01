export interface ICatalogAction {
    type: string,
    payload: any
}

export interface ISubSubCategory {
    id: number,
    nameEn: string,
    nameTr: string,
    slug: string,
}

export interface ISubCategory {
    id: number,
    nameEn: string,
    nameTr: string,
    slug: string,
    subSubCategories?: ISubSubCategory[],
    isSubSubCategoriesInitialized: boolean
}

export interface ICategory {
    id: number,
    nameEn: string,
    nameTr: string,
    slug: string,
    icon: string,
    subCategories?: ISubCategory[],
    isSubCategoriesInitialized?: boolean
}

export interface ICatalog {
    isCatalogDrawerOpen: boolean,
    categories: ICategory[],
    isCategoriesLoading: boolean,
    isSubCategoriesLoading: boolean,
    isSubSubCategoriesLoading: boolean
}
