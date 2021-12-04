import Image from 'next/image'
import makeStyles from "@mui/styles/makeStyles"
import BreadcrumbList from "../../src/components/common/breadcrumb-list"
import {BREAKPOINTS, COLOR} from "../../src/enums"
import StoreCategoryList from "../../src/components/pages/stores/store-category-list"
import StoreCategoryItem from "../../src/components/pages/stores/store-category-item"
import ApiContext from "../../src/helpers/api/api-context"
import {useCallback, useContext, useEffect, useState} from "react"
import {useRouter} from "next/router"
import Button from "@mui/material/Button"
import clsx from "clsx"
import SwipeableViews from 'react-swipeable-views'
import {FullContentSpinner} from "../../src/components/common/spinners/spinner"
import {GetStaticPaths} from "next"


const breadCrumbs = [
    { name: 'Main', link: '/' },
    { name: 'Stores', link: '/stores' },
]

const useStyles = makeStyles({
    page: {
        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            paddingTop: 120
        },
    },
    content: {
        marginTop: 24,
    },
    header: {
        marginTop: 20,
        padding: 8,
        display: 'flex',
        borderBottom: `1px solid #c4c4c4`,
        alignItems: 'center',
        flexWrap: 'wrap',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            padding: 0,
        },
    },
    header_info: {
        display: 'flex',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
        },
    },
    header_nav: {
        marginLeft: 104,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            marginLeft: 0,
        },
    },
    logo_wrapper: {
        width: 40,
        height: 40,
        position: 'relative',
    },
    title: {
        fontSize: '32px',
        lineHeight: '40px',
        fontWeight: 500,
        marginLeft: 24,
    },
    categories: {
        marginTop: 32,
        overflow: 'hidden',
    },
    nav_button: {
        fontSize: '20px',
        fontWeight: 500,
        color: COLOR.SECONDARY,

        '&:nth-child(1)': {
            marginRight: 32
        }
    },
    nav_button_active: {
        color: COLOR.MAIN,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            borderBottom: `1px solid ${COLOR.MAIN}`,
            borderRadius: 0,
        },
    },
    about: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            marginTop: 16
        },
    },
    about_left: {
        width: '46.15%',

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: '100%'
        },
    },
    about_right: {
        width: '49.23%',

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: '100%',
            marginTop: 16,
        },
    },
    about_block: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 16,

        '&:nth-child(1)': {
            marginTop: 32,
        }
    },
    about_text: {
        marginLeft: 8,
        color: '#373737',
    },
    about_description: {
        marginTop: 22,
        color: '#373737',
    }
})

export default function StorePage(){

    const api = useContext(ApiContext)
    const classes = useStyles()
    const router = useRouter()

    const slugOrId = router.query.slugOrId

    const [store, setStore] = useState(null)
    const [storeCategories, setStoreCategories] = useState([])
    const [isStoreCategoriesLoading, setIsStoreCategoriesLoading] = useState(false)
    const [contentIndex, setContentIndex] = useState(0)


    const fetchStoreInfo = useCallback(async (slugOrId) => {
        const { success, data } = await api.getStoreInfo(slugOrId)

        console.log("SlugOrID", slugOrId)

        if (success){
            setStore(data)
        }

    }, [])


    const fetchStoreCategories = useCallback(async (slugOrId) => {
        setIsStoreCategoriesLoading(true)
        const { success, data } = await api.getStoreCategories(slugOrId)

        if (success){
            setStoreCategories(data)
        }

        setIsStoreCategoriesLoading(false)
    }, [])


    useEffect(() => {
        if (slugOrId){
            fetchStoreInfo(slugOrId).then(null)
            fetchStoreCategories(slugOrId).then(null)
        }
    }, [slugOrId])


    const handleChangeContentIndex = (index: number) => setContentIndex(index)

    return <>
        <div className={classes.page}>
            <div className="main-container">
                <div className={classes.content}>
                    <BreadcrumbList items={[...breadCrumbs, { name: store?.name, link: `/stores/${slugOrId}` }]}/>

                    <div className={classes.header}>

                        <div className={classes.header_info}>
                            <div className={classes.logo_wrapper}>
                                {
                                    store?.avatar && <Image loader={({src}) => src} src={store.avatar} layout="fill" objectFit="cover" alt=""/>
                                }
                            </div>
                            <span className={classes.title}>
                                { store?.name }
                            </span>
                        </div>

                        <div className={classes.header_nav}>
                            <Button
                                variant="text"
                                classes={{
                                    root: clsx(classes.nav_button, contentIndex === 0 ? classes.nav_button_active : '')
                                }}
                                onClick={() => setContentIndex(0)}
                            >
                                Categories
                            </Button>
                            <Button
                                variant="text"
                                classes={{
                                    root: clsx(classes.nav_button, contentIndex === 1 ? classes.nav_button_active : '')
                                }}
                                onClick={() => setContentIndex(1)}
                            >
                                About Store
                            </Button>
                        </div>

                    </div>

                    <SwipeableViews style={{ alignItems: 'baseline' }} index={contentIndex} onChangeIndex={handleChangeContentIndex}>
                        <div className={classes.categories}>
                            <StoreCategoryList>
                                {
                                    isStoreCategoriesLoading ? <FullContentSpinner/> :
                                        storeCategories.map(category =>
                                            <StoreCategoryItem
                                                key={category.id}
                                                icon={category.icon}
                                                slug={category.slug}
                                                link={`/catalog/${store?.slug}/${category.slug}`}
                                            >
                                                { category.nameEn }
                                            </StoreCategoryItem>)
                                }
                            </StoreCategoryList>
                        </div>
                        <div className={classes.about}>

                            <div className={classes.about_left}>
                                <div className={classes.about_block}>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.05629 2.41781L8.22329 2.06681C8.86258 1.87403 9.55018 1.92044 10.1578 2.19737C10.7654 2.4743 11.2514 2.96283 11.5253 3.57181L12.4273 5.57781C12.6628 6.10161 12.7283 6.68599 12.6148 7.24895C12.5013 7.81191 12.2144 8.3252 11.7943 8.71681L10.3003 10.1098C10.2566 10.1505 10.229 10.2055 10.2223 10.2648C10.1783 10.6618 10.4473 11.4348 11.0673 12.5098C11.5183 13.2908 11.9273 13.8398 12.2743 14.1468C12.5163 14.3618 12.6493 14.4078 12.7063 14.3918L14.7163 13.7768C15.2652 13.6089 15.8529 13.617 16.397 13.7999C16.9411 13.9828 17.4143 14.3314 17.7503 14.7968L19.0313 16.5728C19.4208 17.1129 19.6012 17.776 19.5388 18.439C19.4765 19.102 19.1757 19.7198 18.6923 20.1778L17.8063 21.0178C17.3361 21.4631 16.7585 21.7791 16.1299 21.9348C15.5013 22.0906 14.8431 22.081 14.2193 21.9068C11.4653 21.1378 8.99629 18.8138 6.78429 14.9828C4.56929 11.1468 3.79229 7.84281 4.50829 5.06981C4.66947 4.44615 4.98858 3.87451 5.43487 3.41001C5.88115 2.94551 6.43957 2.60379 7.05629 2.41781ZM7.48929 3.85481C7.11937 3.96626 6.78437 4.1711 6.51657 4.44958C6.24878 4.72806 6.0572 5.07081 5.96029 5.44481C5.35829 7.77681 6.04729 10.7058 8.08329 14.2328C10.1163 17.7548 12.3053 19.8148 14.6233 20.4628C14.9974 20.567 15.3922 20.5726 15.7691 20.479C16.146 20.3854 16.4923 20.1959 16.7743 19.9288L17.6613 19.0888C17.8811 18.8806 18.0179 18.5997 18.0462 18.2982C18.0745 17.9968 17.9925 17.6953 17.8153 17.4498L16.5353 15.6748C16.3826 15.463 16.1673 15.3044 15.9198 15.2212C15.6723 15.1379 15.405 15.1343 15.1553 15.2108L13.1403 15.8278C11.9703 16.1758 10.9083 15.2348 9.76829 13.2598C9.00029 11.9298 8.64229 10.8998 8.73129 10.0988C8.77829 9.68281 8.97129 9.29881 9.27729 9.01281L10.7713 7.61981C10.9623 7.44182 11.0928 7.20849 11.1445 6.95256C11.1961 6.69663 11.1663 6.43095 11.0593 6.19281L10.1573 4.18681C10.0328 3.91022 9.81201 3.68832 9.53604 3.56248C9.26006 3.43663 8.94775 3.41543 8.65729 3.50281L7.48929 3.85481Z" fill="#0AAD3B"/>
                                    </svg>
                                </span>
                                    <span className={classes.about_text}>
                                    { store?.phone }
                                </span>
                                </div>

                                <div className={classes.about_block}>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C17.523 2 22 6.478 22 12C22 17.522 17.523 22 12 22C6.477 22 2 17.522 2 12C2 6.478 6.477 2 12 2ZM12 3.667C7.405 3.667 3.667 7.405 3.667 12C3.667 16.595 7.405 20.333 12 20.333C16.595 20.333 20.333 16.595 20.333 12C20.333 7.405 16.595 3.667 12 3.667ZM11.25 6C11.4312 6.00001 11.6063 6.06564 11.7429 6.18477C11.8795 6.30389 11.9684 6.46845 11.993 6.648L12 6.75V12H15.25C15.44 12.0001 15.6229 12.0722 15.7618 12.202C15.9006 12.3317 15.9851 12.5093 15.998 12.6989C16.011 12.8885 15.9515 13.0759 15.8316 13.2233C15.7117 13.3707 15.5402 13.4671 15.352 13.493L15.25 13.5H11.25C11.0688 13.5 10.8937 13.4344 10.7571 13.3152C10.6205 13.1961 10.5316 13.0316 10.507 12.852L10.5 12.75V6.75C10.5 6.55109 10.579 6.36032 10.7197 6.21967C10.8603 6.07902 11.0511 6 11.25 6Z" fill="#0AAD3B"/>
                                    </svg>
                                </span>
                                    <span className={classes.about_text}>
                                    { store?.work_time }
                                </span>
                                </div>

                                <div className={classes.about_block}>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.9991 11.9988V11.9938C21.9991 9.03471 20.7109 6.37733 18.6651 4.54991L18.6551 4.54158C18.6299 4.51434 18.6016 4.49002 18.5709 4.46908L18.5693 4.46825C16.7524 2.87292 14.4158 1.99531 11.9979 2.00002C9.47135 2.00002 7.16478 2.93831 5.40652 4.48658L5.41735 4.47741C5.39616 4.49349 5.37662 4.51163 5.35902 4.53158V4.53241C4.30201 5.46836 3.45593 6.61823 2.87685 7.90584C2.29776 9.19345 1.99888 10.5894 2 12.0013C2 14.9595 3.28661 17.6168 5.33069 19.4451L5.34069 19.4534C5.36716 19.4834 5.39677 19.5105 5.42902 19.5343L5.43069 19.5351C7.24714 21.1281 9.58191 22.0044 11.9979 22C14.4252 22.0037 16.77 21.1193 18.5901 19.5134L18.5793 19.5226C19.6546 18.5877 20.5166 17.4327 21.1069 16.1358C21.6972 14.8389 22.002 13.4303 22.0008 12.0054V11.9996L21.9991 11.9988ZM18.281 18.5026C17.7856 18.102 17.2529 17.7498 16.6902 17.451L16.636 17.4243C17.1468 15.9519 17.4543 14.2545 17.4835 12.4887V12.4754H21.0342C20.9144 14.7598 19.9312 16.9134 18.2835 18.5001L18.281 18.5026ZM12.4762 17.2485C13.5453 17.306 14.5445 17.541 15.4661 17.9235L15.4061 17.9018C14.6678 19.5851 13.6287 20.7417 12.4762 20.9959V17.2485ZM12.4762 16.2952V12.4754H16.5327C16.5005 14.0572 16.2262 15.6248 15.7194 17.1235L15.7519 17.0144C14.7173 16.5891 13.617 16.3461 12.4995 16.2961L12.477 16.2952H12.4762ZM12.4762 11.5221V7.70227C13.6238 7.6499 14.7536 7.39868 15.8152 6.9598L15.7494 6.98397C16.2119 8.33308 16.496 9.88801 16.5327 11.5046V11.5221H12.4762ZM12.4762 6.74898V3.00331C13.6287 3.25746 14.6678 4.40908 15.4061 6.09734C14.5445 6.45566 13.5453 6.68982 12.5004 6.74815L12.4762 6.74898ZM14.8544 3.41579C15.8364 3.74331 16.7547 4.23714 17.5693 4.87573L17.5502 4.86073C17.181 5.15072 16.7669 5.42404 16.3302 5.66153L16.2836 5.68486C15.9307 4.85217 15.4456 4.08199 14.8469 3.40412L14.8544 3.41329V3.41579ZM11.5213 3.00581V6.74898C10.4934 6.69654 9.4821 6.46825 8.53139 6.07401L8.59138 6.09567C9.33302 4.41241 10.3705 3.25663 11.5229 3.00248L11.5213 3.00581ZM7.71475 5.68236C7.26305 5.43933 6.83265 5.15863 6.42814 4.84323L6.44814 4.85823C7.23905 4.23838 8.12867 3.75611 9.0797 3.43162L9.14303 3.41246C8.56006 4.07196 8.08505 4.81949 7.73559 5.62736L7.71475 5.68153V5.68236ZM11.5229 7.70144V11.5213H7.46643C7.5031 9.88718 7.78725 8.33224 8.28223 6.87397L8.24973 6.98314C9.2839 7.40768 10.3836 7.6504 11.5004 7.7006L11.5229 7.70144ZM11.5229 12.4746V16.2944C10.3753 16.3468 9.24555 16.598 8.1839 17.0369L8.24973 17.0127C7.78725 15.6644 7.5031 14.1087 7.46643 12.4921V12.4746H11.5229ZM11.5229 17.2477V20.9934C10.3705 20.7392 9.33135 19.5876 8.59305 17.8993C9.45468 17.541 10.4538 17.3077 11.4988 17.2494L11.5229 17.2485V17.2477ZM9.14803 20.5809C8.16636 20.2543 7.24806 19.7616 6.43314 19.1243L6.45314 19.1393C6.82229 18.8493 7.23644 18.576 7.67309 18.3385L7.71975 18.3151C8.06964 19.1482 8.55477 19.9177 9.15553 20.5925L9.14803 20.5842V20.5809ZM16.2844 18.3143C16.7677 18.5768 17.1818 18.8493 17.571 19.1534L17.551 19.1384C16.7601 19.7583 15.8705 20.2406 14.9194 20.565L14.8561 20.5842C15.4391 19.925 15.9141 19.1778 16.2636 18.3701L16.2844 18.316V18.3143ZM21.0342 11.5221H17.4835C17.458 9.79797 17.1604 8.08868 16.6019 6.45732L16.636 6.57232C17.2247 6.26239 17.782 5.89625 18.3001 5.47903L18.2801 5.49403C19.9244 7.07482 20.908 9.2204 21.0325 11.4979L21.0333 11.5213L21.0342 11.5221ZM5.71817 5.49487C6.19815 5.88485 6.7373 6.24233 7.30894 6.54649L7.3631 6.57315C6.85229 8.04559 6.54481 9.74302 6.51564 11.5088V11.5221H2.96413C3.08387 9.2377 4.06712 7.08414 5.71484 5.49737L5.71734 5.49487H5.71817ZM2.96496 12.4754H6.51564C6.54118 14.1995 6.83872 15.9088 7.39727 17.5402L7.3631 17.4252C6.7373 17.7577 6.19899 18.1152 5.69901 18.5185L5.71901 18.5035C4.07469 16.9227 3.09109 14.7771 2.96663 12.4996L2.96579 12.4762L2.96496 12.4754Z" fill="#0AAD3B"/>
                                    </svg>
                                </span>
                                    <span className={classes.about_text}>
                                    { store?.site }
                                </span>
                                </div>

                                <div className={classes.about_block}>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.84341 4.56789C7.47635 2.93495 9.69109 2.01758 12.0004 2.01758C14.3097 2.01758 16.5245 2.93495 18.1574 4.56789C19.7903 6.20083 20.7077 8.41557 20.7077 10.7249C20.7077 13.0342 19.7903 15.249 18.1574 16.8819L16.9704 18.0559C16.0954 18.9139 14.9604 20.0179 13.5644 21.3679C13.1448 21.7736 12.584 22.0004 12.0004 22.0004C11.4168 22.0004 10.856 21.7736 10.4364 21.3679L6.94541 17.9719C6.50641 17.5409 6.13941 17.1779 5.84341 16.8819C5.03483 16.0734 4.39342 15.1135 3.95581 14.0571C3.5182 13.0006 3.29297 11.8684 3.29297 10.7249C3.29297 9.58142 3.5182 8.44914 3.95581 7.39272C4.39342 6.3363 5.03483 5.37642 5.84341 4.56789ZM17.0964 5.62789C15.7446 4.27635 13.9113 3.51716 11.9997 3.51735C10.0881 3.51754 8.25495 4.27708 6.90341 5.62889C5.55187 6.9807 4.79268 8.81404 4.79287 10.7256C4.79306 12.6372 5.5526 14.4703 6.90441 15.8219L8.39041 17.2899C9.41689 18.2928 10.4462 19.2928 11.4784 20.2899C11.6183 20.4252 11.8053 20.5009 11.9999 20.5009C12.1945 20.5009 12.3815 20.4252 12.5214 20.2899L15.9154 16.9899C16.3854 16.5289 16.7784 16.1399 17.0954 15.8219C18.4469 14.4703 19.2062 12.6372 19.2062 10.7259C19.2062 8.81453 18.4469 6.98146 17.0954 5.62989L17.0964 5.62789ZM12.0004 7.99889C12.3946 7.99889 12.785 8.07654 13.1492 8.2274C13.5134 8.37827 13.8444 8.5994 14.1231 8.87816C14.4019 9.15692 14.623 9.48786 14.7739 9.85208C14.9248 10.2163 15.0024 10.6067 15.0024 11.0009C15.0024 11.3951 14.9248 11.7855 14.7739 12.1497C14.623 12.5139 14.4019 12.8449 14.1231 13.1236C13.8444 13.4024 13.5134 13.6235 13.1492 13.7744C12.785 13.9252 12.3946 14.0029 12.0004 14.0029C11.2139 13.9885 10.4644 13.666 9.91318 13.1047C9.36201 12.5433 9.0532 11.7881 9.0532 11.0014C9.0532 10.2147 9.36201 9.45944 9.91318 8.89812C10.4644 8.33679 11.2139 8.01425 12.0004 7.99989V7.99889ZM12.0004 9.49889C11.8032 9.49889 11.6079 9.53774 11.4256 9.61322C11.2434 9.68871 11.0778 9.79934 10.9383 9.93882C10.7989 10.0783 10.6882 10.2439 10.6127 10.4261C10.5373 10.6083 10.4984 10.8036 10.4984 11.0009C10.4984 11.1981 10.5373 11.3935 10.6127 11.5757C10.6882 11.7579 10.7989 11.9235 10.9383 12.063C11.0778 12.2024 11.2434 12.3131 11.4256 12.3886C11.6079 12.464 11.8032 12.5029 12.0004 12.5029C12.3986 12.5029 12.7805 12.3447 13.0621 12.0631C13.3437 11.7815 13.5019 11.3996 13.5019 11.0014C13.5019 10.6032 13.3437 10.2213 13.0621 9.93967C12.7805 9.65808 12.3986 9.49989 12.0004 9.49989V9.49889Z" fill="#0AAD3B"/>
                                    </svg>
                                </span>
                                    <span className={classes.about_text}>
                                    { store?.address }
                                </span>
                                </div>

                                <div className={classes.about_description}>
                                    { store?.description }
                                </div>
                            </div>
                        </div>
                    </SwipeableViews>

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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { slugOrId: "kivano" } },
        ],
        fallback: true,
    }
}
