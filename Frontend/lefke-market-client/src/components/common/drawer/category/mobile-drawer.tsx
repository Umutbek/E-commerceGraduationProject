import Image from "next/image"
import Link from "next/link"
import {useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import makeStyles from '@mui/styles/makeStyles'
import Button from "@mui/material/Button"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

import {ICategory, ISubCategory, ISubSubCategory} from "../../../../redux/states/catalog/interfaces"
import {
    getCategories,
    getIsCatalogDrawerOpen,
    getIsCategoriesLoading,
    getIsSubCategoriesLoading,
    getIsSubSubCategoriesLoading,
} from "../../../../redux/states/catalog/getters"
import {
    closeCategoryDrawer,
    fetchCategories,
    fetchSubCategories,
    fetchSubSubCategories,
} from "../../../../redux/states/catalog/actions"
import {CustomCircularProgress} from "../../custom-progress"
import {COLOR, Z_INDEX_LAYER} from "../../../../enums"
import {ArrowNextIcon} from "../../icons"

interface IMobileCategoryDrawer { storeName: string }

export default function MobileCategoryDrawer({storeName = 'global'}: IMobileCategoryDrawer) {

    const dispatch = useDispatch()

    const classes = useStyles()

    const isOpen = useSelector(getIsCatalogDrawerOpen)
    const categories = useSelector(getCategories)
    const isCategoriesLoading = useSelector(getIsCategoriesLoading)
    const isSubCategoriesLoading = useSelector(getIsSubCategoriesLoading)
    const isSubSubCategoriesLoading = useSelector(getIsSubSubCategoriesLoading)

    const [subCategories, setSubCategories] = useState<ISubCategory[]>([])
    const [subSubCategories, setSubSubCategories] = useState<ISubSubCategory[]>([])

    const [showSubCategory, setShowSubCategory] = useState<boolean>(false)
    const [showSubSubCategory, setShowSubSubCategory] = useState<boolean>(false)

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | null>(null)

    const onCategoryClick = useCallback((cat: ICategory | null) => {
        cat && setSelectedCategory(cat)
        setShowSubCategory(true)
    }, [])


    const onSubCategoryClose = useCallback(() => {
        setShowSubCategory(false)
        setSelectedCategory(null)
    }, [])

    const onSubCategoryClick = useCallback((sub: ISubCategory | null) => {
        sub && setSelectedSubCategory(sub)
        setShowSubCategory(true)
        setShowSubSubCategory(true)
    }, [])

    const onSubSubCategoryClose = useCallback(() => {
        setShowSubSubCategory(false)
        setSelectedSubCategory(null)
    }, [])


    const closeDrawer = useCallback(() => {
        dispatch(closeCategoryDrawer())
        setSelectedCategory(null)
        setSelectedSubCategory(null)
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchCategories(storeName))
    }, [])

    //useEffect for fetching or set sub and subSub categories
    useEffect(() => {
        if (selectedCategory){

            const currentCategory = categories.find((cat: ICategory) => cat.id === selectedCategory.id)

            if (currentCategory){
                currentCategory.isSubCategoriesInitialized ?
                    setSubCategories(currentCategory.subCategories) :
                    dispatch(fetchSubCategories(currentCategory.id))

                if (selectedSubCategory){
                    const currentSubCategory = currentCategory.subCategories.find((sub: ISubCategory) =>
                        sub.id === selectedSubCategory.id)

                    if (currentSubCategory){
                        currentSubCategory.isSubSubCategoriesInitialized ?
                            setSubSubCategories(currentSubCategory.subSubCategories) :
                            dispatch(fetchSubSubCategories(selectedCategory.id, selectedSubCategory.id))
                    }
                }
            }
        }
    }, [categories, selectedCategory, selectedSubCategory])

    return (
        <div className={classes.drawer} style={{ zIndex: isOpen ? Z_INDEX_LAYER.DRAWER_ON : Z_INDEX_LAYER.DRAWER_OFF }}>
            <div className={classes.drawerOverlay} onClick={closeDrawer} style={{ opacity: isOpen ? 0.6 : 0 }}/>
            <div className={classes.drawerCategories} style={{ left: isOpen ? 0 : 'calc(-100% - 10px)' }}>
                <div className={classes.categories}>
                    <div className={classes.catalogHeader}>
                        <div className={classes.backBtn}>
                            <Button
                                style={{ height: '100%' }}
                                onClick={closeDrawer}
                            >
                                <Image src={'/icons/arrow_left.png'} width={24} height={24} alt="arrow left lefke"/>
                            </Button>
                        </div>
                        <h3 className={classes.categoriesTitle}>
                            Categories
                        </h3>
                        <span/>
                    </div>
                    <Link href={"/stores"}>
                        <a className={classes.to_stores_link} onClick={closeDrawer}>
                                <span>
                                    All Stores
                                </span>
                            <ArrowNextIcon width={20} height={20} color={COLOR.WHITE}/>
                        </a>
                    </Link>
                    <div>
                        { isCategoriesLoading ? <div className={classes.progress}>
                            <CustomCircularProgress color={"rgb(10, 173, 59)"}/>
                        </div> : <ul className={classes.categoriesList}>
                            {
                                categories.length ? categories.map((cat: ICategory) => {
                                    return (
                                        <li key={cat.id}>
                                            <div
                                                className={classes.categoriesItem}
                                                onClick={() => onCategoryClick(cat)}
                                            >
                                                <Image src={'/icons/temp/fire.png'} width={24} height={24} objectFit={"contain"} alt={"lefke fire png"}/>
                                                <span className={classes.categoriesItemText}>{ cat.nameEn }</span>
                                                <div className={classes.categoriesRightIcon}>
                                                    <Image src={'/icons/arrow_right.png'} width={16} height={16} alt="lefke arrow icon"/>
                                                </div>
                                            </div>
                                            <hr className={classes.line}/>
                                        </li>
                                    )
                                }) : <div className={classes.noCategory}>
                                    No categories
                                </div>
                            }
                        </ul>
                        }
                    </div>
                </div>
            </div>

            {/* SubCategories */}
            <div
                className={classes.drawerSubCategories}
                style={{ left: showSubCategory ? 0 : 'calc(-100% - 10px)' }}
            >
                <div className={classes.catalogHeader}>
                    <div className={classes.backBtn}>
                        <Button
                            style={{
                                height: '100%'
                            }}
                            onClick={onSubCategoryClose}
                        >
                            <Image src={'/icons/arrow_left.png'} width={24} height={24} alt="arrow left lefke"/>
                        </Button>
                    </div>
                    <h3 className={classes.categoriesTitle}>
                        { selectedCategory && selectedCategory.nameEn }
                    </h3>
                    <span/>
                </div>

                {
                    isSubCategoriesLoading ?
                        <div className={classes.progress}>
                            <CustomCircularProgress color={"rgb(10, 173, 59)"}/>
                        </div>
                        :
                        <ul className={classes.categoriesList}>
                            <Link href={`/catalog/${storeName}/${selectedCategory?.slug}`}>
                                <a
                                    key={'category'}
                                    className={classes.categoriesItem}
                                >
                                    <span className={classes.categoriesItemText} style={{ color: 'green' }}>
                                    All items
                                </span>
                                    <div className={classes.categoriesRightIcon}>
                                        <Image src={'/icons/arrow_right_green.png'} width={16} height={16} alt="lefke arrow icon"/>
                                    </div>
                                </a>
                            </Link>
                            <hr className={classes.line}/>
                        {
                            subCategories.length ? subCategories.map((sub: ISubCategory) => {
                                return (
                                    <li key={sub.id}>
                                        <div
                                            className={classes.categoriesItem}
                                            onClick={() => onSubCategoryClick(sub)}
                                        >
                                            <span className={classes.categoriesItemText}>{ sub.nameEn }</span>
                                            <div className={classes.categoriesRightIcon}>
                                                <Image src={'/icons/arrow_right.png'} width={16} height={16} alt="lefke arrow icon"/>
                                            </div>
                                        </div>
                                        <hr className={classes.line}/>
                                    </li>
                                )
                            }) : <div className={classes.noCategory}>
                                No categories
                            </div>
                        }
                    </ul>
                }
            </div>

            <div
                className={classes.drawerSubSubCategories}
                style={{ left: showSubSubCategory ? 0 : 'calc(-100% - 10px)' }}
            >
                <div className={classes.catalogHeader}>
                    <div className={classes.backBtn}>
                        <Button
                            style={{
                                height: '100%'
                            }}
                            onClick={onSubSubCategoryClose}
                        >
                            <Image src={'/icons/arrow_left.png'} width={24} height={24} alt="arrow left lefke"/>
                        </Button>
                    </div>
                    <h3 className={classes.categoriesTitle}>
                        { selectedSubCategory && selectedSubCategory.nameEn }
                    </h3>
                    <span/>
                </div>
                {
                    isSubSubCategoriesLoading ? <div className={classes.progress}>
                        <CustomCircularProgress color={"rgb(10, 173, 59)"}/>
                    </div>
                        :
                        <ul className={classes.categoriesList}>
                            <Link href={`/catalog/${storeName}/${selectedCategory?.slug}/${selectedSubCategory?.slug}`}>
                                <a
                                    key={'category'}
                                    className={classes.categoriesItem}
                                    // onClick={() => onSubCategoryClick(sub)}
                                >
                                    {/*<Image src={'/icons/temp/fire.png'} width={24} height={24} objectFit={"contain"} alt={"uygo fire png"}/>*/}
                                    <span className={classes.categoriesItemText} style={{ color: 'green' }}>
                                        All items
                                    </span>
                                    <div className={classes.categoriesRightIcon}>
                                        <Image src={'/icons/arrow_right_green.png'} width={16} height={16} alt="lefke arrow icon"/>
                                    </div>
                                </a>
                            </Link>
                            <hr className={classes.line}/>
                        {
                            subSubCategories.length ? subSubCategories.map((subSub: ISubSubCategory) => {
                                return (
                                    <li key={subSub.id}>
                                        <Link href={`/catalog/${storeName}/${selectedCategory?.slug}/${selectedSubCategory?.slug}/${subSub.slug}`}>
                                            <a
                                                className={classes.categoriesItem}
                                            >
                                                <span className={classes.categoriesItemText}>{ subSub.nameEn }</span>
                                                <div className={classes.categoriesRightIcon}>
                                                    <FiberManualRecordIcon classes={{ root: classes.fiberIcon }}/>
                                                </div>
                                            </a>
                                        </Link>
                                        <hr className={classes.line}/>
                                    </li>
                                )
                            }) : <div className={classes.noCategory}>
                                <span className={classes.noCategoryText}> No categories </span>
                                <SentimentVeryDissatisfiedIcon/>
                            </div>
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    drawer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        transition: 'z-index .4s'
    },
    drawerOverlay: {
        height: '100%',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#000',

        zIndex: Z_INDEX_LAYER.DRAWER_OFF,

        transition: 'opacity 0.1s'
    },
    drawerCategories: {
        height: '100%',
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#fff',
        transition: 'all .3s ease-in-out',
        boxShadow: '1px 0px 6px 0px rgba(0, 0, 0, 0.2)',
        zIndex: Z_INDEX_LAYER.DRAWER_CATEGORIES
    },
    catalogHeader: {
        position: 'relative',
        width: '100%',
        height: 56,
        backgroundColor: '#F3F4F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    backBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%'
    },
    categories: {
        // width: 324,
        position: 'relative',
        // padding: '40px 24px'
    },
    categoriesTitle: {
        fontSize: '16px',
        fontWeight: 500,
        display: 'inline-block',
        width: '250px',
        whiteSpace: 'nowrap',
        overflow: 'hidden !important',
        textOverflow: 'ellipsis',
        textAlign: 'center'
    },

    categoriesList: {

    },
    categoriesItem: {
        width: '100%',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    categoriesItemText: {
        fontSize: '14px',
        fontWeight: 400,
        marginLeft: 16,
        width: 240
    },
    categoriesRightIcon: {
        marginLeft: 'auto',
    },

    drawerSubCategories: {
        position: 'fixed',
        height: '100%',
        top: 0,
        backgroundColor: '#fff',
        width: '100%',
        boxShadow: '2px 0 2px 1px rgba(0, 0, 0, 0.2)',
        zIndex: Z_INDEX_LAYER.DRAWER_SUB_CATEGORIES,
        transition: 'all .5s'
    },

    drawerSubSubCategories: {
        position: 'fixed',
        height: '100%',
        top: 0,
        backgroundColor: '#fff',
        width: '100%',
        boxShadow: '2px 0 2px 1px rgba(0, 0, 0, 0.2)',
        zIndex: Z_INDEX_LAYER.DRAWER_SUB_SUB_CATEGORIES,
        transition: 'all .5s'
    },
    fiberIcon: {
        fontSize: '5px'
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 200
    },
    noCategory: {
        paddingTop: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noCategoryText: {
        marginRight: 10,
        fontSize: '18px'
    },
    line: {
        margin: 0,
        padding: 0
    },
    to_stores_link: {
        height: 48,
        backgroundColor: '#0AAD3B',
        padding: '12px 16px',
        margin: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 500,
        color: '#fff',
        textTransform: 'initial',
        borderRadius: 8,
    }
})
