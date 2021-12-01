import {memo, useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import makeStyles from '@mui/styles/makeStyles'
import Button from "@mui/material/Button"
import ClearIcon from "@mui/icons-material/Clear"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

import Image from "next/image"
import Link from 'next/link'

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

interface IDesktopCategoryDrawer { storeName: string }

function DesktopCategoryDrawer({storeName}: IDesktopCategoryDrawer) {

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

    const onCategoryMouseOver = useCallback((cat: ICategory | null) => {
        cat && setSelectedCategory(cat)
        setShowSubCategory(true)
    }, [])


    const onCategoryMouseLeave = useCallback(() => {
        setShowSubCategory(false)
    }, [])


    const onSubCategoryMouseOver = useCallback((sub: ISubCategory | null) => {
        sub && setSelectedSubCategory(sub)
        setShowSubCategory(true)
        setShowSubSubCategory(true)
    }, [])

    const onSubCategoryMouseLeave = useCallback(() => {
        setShowSubSubCategory(false)
        setShowSubCategory(false)
    }, [])


    const closeDrawer = useCallback(() => {
        dispatch(closeCategoryDrawer())
        setSelectedCategory(null)
        setSelectedSubCategory(null)
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchCategories(storeName))
    }, [])

    useEffect(() => {
        isOpen && (document.body.style.overflow = 'hidden')
        !isOpen && (document.body.style.overflow = 'unset')
    }, [isOpen])

    //useEffect for fetching or set sub and subSub categories
    useEffect(() => {
        if (selectedCategory) {

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

            <div className={classes.drawerCategories} style={{ left: isOpen ? 0 : -348 }}>
                <div className={classes.categories}>
                    <div style={{ padding: '24px 24px 0px' }}>
                        <Button onClick={closeDrawer} className={classes.closeBtn}>
                            <ClearIcon fontSize={"large"}/>
                        </Button>
                        <h3 className={classes.categoriesTitle}>Categories</h3>
                        <Link href={"/stores"}>
                            <a className={classes.to_stores_link} onClick={closeDrawer}>
                                <span>
                                    All Stores
                                </span>
                                <ArrowNextIcon width={20} height={20} color={COLOR.WHITE}/>
                            </a>
                        </Link>
                    </div>
                    { isCategoriesLoading ? <div className={classes.progress}>
                        <CustomCircularProgress color={"rgb(10, 173, 59)"}/>
                    </div> : <ul className={classes.categoriesList}>
                        {
                            categories.length ? categories.map((cat: ICategory) => {
                                return (
                                    <li
                                        key={cat.id}
                                        className={classes.categoriesItem}
                                        onMouseOver={() => onCategoryMouseOver(cat)}
                                        onMouseLeave={onCategoryMouseLeave}
                                    >
                                        <Link href={`/catalog/global/${cat.slug}`}>
                                            <a>
                                                <Image loader={({src}) => src} src={cat.icon ? cat.icon : '/icons/temp/fire.png'} width={24} height={24} objectFit={"contain"} alt={"lefke fire png"}/>
                                                <span className={classes.categoriesItemText}>{ cat.nameEn }</span>
                                                <div className={classes.categoriesRightIcon}>
                                                    <Image src={'/icons/arrow_right.png'} width={16} height={16} alt="lefke arrow icon"/>
                                                </div>
                                            </a>
                                        </Link>
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

            {/* SubCategories */}
            <div
                className={classes.drawerSubCategories}
                style={{ display: showSubCategory ? 'block' : 'none' }}
                onMouseOver={() => onCategoryMouseOver(null)}
                onMouseLeave={onCategoryMouseLeave}
            >
                {
                    isSubCategoriesLoading ? <div className={classes.progress}>
                        <CustomCircularProgress color={"rgb(10, 173, 59)"}/>
                    </div> : <ul className={classes.categoriesList}>
                        {
                            subCategories.length ? subCategories.map((sub: ISubCategory) => {
                                return (
                                    <li
                                        key={sub.id}
                                        className={classes.categoriesItem}
                                        onMouseOver={() => onSubCategoryMouseOver(sub)}
                                        onMouseLeave={onSubCategoryMouseLeave}
                                    >
                                        <Link href={`/catalog/global/${selectedCategory?.slug}/${sub.slug}`}>
                                            <a>
                                                <span className={classes.categoriesItemText}>{ sub.nameEn }</span>
                                                <div className={classes.categoriesRightIcon}>
                                                    <Image src={'/icons/arrow_right.png'} width={16} height={16} alt="lefke arrow icon"/>
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            }) : <div className={classes.noCategory}>
                                No categories
                            </div>
                        }
                    </ul>
                }
            </div>

            {/* SubSubCategories */}
            <div
                className={classes.drawerSubSubCategories}
                style={{ display: showSubSubCategory ? 'block' : 'none' }}
                onMouseOver={() => onSubCategoryMouseOver(null)}
                onMouseLeave={onSubCategoryMouseLeave}
            >
                {
                    isSubSubCategoriesLoading ? <div className={classes.progress}>
                        <CustomCircularProgress color={"rgb(10, 173, 59)"}/>
                    </div> : <ul className={classes.categoriesList}>
                        {
                            subSubCategories.length ? subSubCategories.map((subSub: ISubSubCategory) => {
                                return (
                                    <li
                                        key={subSub.id}
                                        className={classes.categoriesItem}
                                    >
                                        <Link href={`/catalog/${storeName}/${selectedCategory?.slug}/${selectedSubCategory?.slug}/${subSub.slug}`}>
                                            <a>
                                                <span className={classes.categoriesItemText}>{ subSub.nameEn }</span>
                                                <div className={classes.categoriesRightIcon}>
                                                    <FiberManualRecordIcon classes={{ root: classes.fiberIcon }}/>
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            }) : <div className={classes.noCategory}>
                                <span className={classes.noCategoryText}> No category </span>
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

        zIndex: Z_INDEX_LAYER.DRAWER_OVERLAY_OFF,

        transition: 'opacity 0.1s'
    },
    drawerCategories: {
        height: '100%',
        position: 'fixed',
        top: 0,
        width: 348,

        backgroundColor: '#fff',
        transition: 'all .3s ease-in-out',
        boxShadow: '1px 0px 6px 0px rgba(0, 0, 0, 0.2)',
        zIndex: Z_INDEX_LAYER.DRAWER_CATEGORIES
    },
    categories: {
        // width: 324,
        position: 'relative',
        // padding: '40px 24px'
    },
    categoriesTitle: {
        fontSize: '24px',
        fontWeight: 500,
        margin: 0,
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    categoriesList: {

    },
    categoriesItem: {
        padding: '8px 0',

        '& a': {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '0 24px',
            justifyContent: 'flex-start'
        }
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
        left: 348,
        backgroundColor: '#fff',
        width: 348,
        boxShadow: '2px 0 2px 1px rgba(0, 0, 0, 0.2)',
        zIndex: Z_INDEX_LAYER.DRAWER_SUB_CATEGORIES,
        paddingTop: 16
    },

    drawerSubSubCategories: {
        position: 'fixed',
        height: '100%',
        top: 0,
        left: 696,
        backgroundColor: '#fff',
        width: 348,
        boxShadow: '2px 0 2px 1px rgba(0, 0, 0, 0.2)',
        zIndex: Z_INDEX_LAYER.DRAWER_SUB_SUB_CATEGORIES,
        paddingTop: 16
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

    to_stores_link: {
        width: '100%',
        height: 48,
        backgroundColor: '#0AAD3B',
        padding: '12px 16px',
        margin: '16px 0',
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

export default memo(DesktopCategoryDrawer)
