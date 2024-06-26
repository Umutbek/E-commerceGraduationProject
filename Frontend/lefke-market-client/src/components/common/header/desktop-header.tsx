import {MouseEvent, useEffect, useState} from 'react'
import Image from "next/image"
import {AppBar, Button, Hidden} from "@mui/material"
import DesktopHeaderTop from "./desktop-header-top"
import makeStyles from '@mui/styles/makeStyles'
import Link from 'next/link'
import {useDispatch, useSelector} from "react-redux"
import {useCallback} from "react"
import {openCategoryDrawer} from "../../../redux/states/catalog/actions"
import {getIsAuth, getUser} from "../../../redux/states/auth/getters"

import {openAuthModal, openCartModal} from "../../../redux/states/settings/actions"
import {useRouter} from "next/router"
import {BREAKPOINTS, COLOR} from "../../../enums"
import {StoreIcon} from "../icons"
import ProfileModal from "../profile/profile-modal"
import {fetchFavoritesFromServer} from "../../../redux/states/favorite/actions"
import {getCartItemsCount} from "../../../redux/states/cart/getters"

export default function DesktopHeader(){

    const classes = useStyles()
    const router = useRouter()

    const isAuth = useSelector(getIsAuth)
    const user = useSelector(getUser)
    const cartItemsCount = useSelector(getCartItemsCount)

    const dispatch = useDispatch()

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(true)

    const onOpenCategory = useCallback(() => {
        dispatch(openCategoryDrawer())
    }, [dispatch])

    const handleLoginClick = (e: MouseEvent) => {
        e.preventDefault()

        if (isAuth){
            setIsProfileModalOpen(true)
        } else {
            dispatch(openAuthModal())
        }
    }

    const handleCartClick = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(openCartModal())
    }

    useEffect(() => { setIsProfileModalOpen(false) }, [router.pathname, isAuth])
    useEffect(() => { dispatch(fetchFavoritesFromServer()) }, [isAuth])

    return (
        <>
            <DesktopHeaderTop/>

            <AppBar color={"inherit"} position={"sticky"}>
                <div className={classes.navbar}>
                    <div className="main-container">
                        <div className={classes.navbarContent}>
                            <ul className={classes.navbarLeft}>
                                <li className={classes.logoContainer}>
                                    <Link href="/">
                                        <a>
                                            <Image src={'/images/Logo.png'} layout={"fill"} objectFit={"contain"} alt="lefke logo"/>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Button
                                        variant="contained"
                                        onClick={onOpenCategory}
                                        classes={{ root: classes.catalogBtn }}
                                    >
                                        <Hidden only={["md", "sm", "xs", "lg"]}>
                                            Category
                                        </Hidden>
                                    </Button>
                                </li>
                                <li>
                                    <Link href="/stores" >
                                        <a className={classes.store_link} title="Go to store page...">
                                            <StoreIcon color={COLOR.MAIN}/>
                                            <Hidden only={["md", "sm", "xs", "lg"]}>
                                                    <span className={classes.store_link_text}>
                                                        Stores
                                                    </span>
                                            </Hidden>
                                        </a>
                                    </Link>
                                </li>
                                <li className={classes.search}>
                                    <input
                                        className={classes.searchInput}
                                        placeholder="Search..."
                                        type="text"
                                        onChange={e => router.push(`/results/${e.target.value}`)}
                                    />
                                </li>
                            </ul>
                            <ul className={classes.navbarRight}>
                                <li className={classes.navbarRightItem}>
                                    <a onClick={handleCartClick} className="cursor-pointer">
                                        <div className={classes.cart_icon_wrapper}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.5467 20.1813C9.99857 20.1813 10.3649 19.815 10.3649 19.3631C10.3649 18.9112 9.99857 18.5449 9.5467 18.5449C9.09483 18.5449 8.72852 18.9112 8.72852 19.3631C8.72852 19.815 9.09483 20.1813 9.5467 20.1813Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M18.5467 20.1813C18.9986 20.1813 19.3649 19.815 19.3649 19.3631C19.3649 18.9112 18.9986 18.5449 18.5467 18.5449C18.0948 18.5449 17.7285 18.9112 17.7285 19.3631C17.7285 19.815 18.0948 20.1813 18.5467 20.1813Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M3 3H6.27273L8.46545 13.9555C8.54027 14.3321 8.7452 14.6705 9.04436 14.9113C9.34351 15.1522 9.71784 15.2801 10.1018 15.2727H18.0545C18.4385 15.2801 18.8129 15.1522 19.112 14.9113C19.4112 14.6705 19.6161 14.3321 19.6909 13.9555L21 7.09091H7.09091" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span className="counter">
                                                { cartItemsCount }
                                            </span>
                                        </div>
                                        <span className={classes.navbarRightItemText}>Busket</span>
                                    </a>
                                </li>
                                <li className={classes.navbarRightItem}>
                                    <Link href="/favorites">
                                        <a>
                                            <Image src={'/icons/lefke_like.png'} width={24} height={24} alt="lefke like"/>
                                            <span className={classes.navbarRightItemText}>Favourites</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className={classes.navbarRightItem}>
                                    <a onClick={handleLoginClick} className="cursor-pointer">
                                        <Image src={'/icons/lefke_user.png'} width={24} height={24} alt="lefke user"/>
                                        <span className={classes.navbarRightItemText}>
                                            { user ? user[0].login : 'Login' }
                                        </span>
                                    </a>
                                    <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </AppBar>
        </>
    )
}

const useStyles = makeStyles({
    topBannerContainer: {
        width: '100%',
        height: '80px',
        position: "relative"
    },
    navbar: {
        width: '100%',
        height: 80,
        boxShadow: '0 1px 1px rgb(0 0 0 / 0.002)',
        // position: 'sticky',
        // top: 0,
    },
    navbarContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '80px',
    },
    navbarLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navbarLeftItem: {

    },
    logoContainer: {
        position: "relative",
        height: 80,
        width: 163,

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            width: 140
        }
    },
    search: {
        position: 'relative',
    },
    searchInput: {
        width: 465,
        height: 44,
        marginTop: 18,
        marginBottom: 18,
        marginLeft: 16,
        outline: 'none',
        border: 'none',
        borderRadius: 4,
        background: '#f2f2f2',
        padding: '10px 16px',
        fontSize: 16,
//         backgroundImage: `url(icons/lefke_search_green.png)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'top 13px right 16px',
        backgroundRepeat: 'no-repeat',

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            width: 400
        }
    },
    navbarRight: {
        width: 300,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        marginLeft: 'auto',
    },
    navbarRightItem: {
        position: 'relative',

        '& a': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            // marginRight: 35,
            height: '100%',
        },
        '& a:hover': {
            borderBottom: '4px solid green',
        },
    },
    navbarRightItemText: {
        // marginLeft: 12
    },
    catalogBtn: {
        marginLeft: 24,
        backgroundColor: '#0AAD3B',
        backgroundImage: `url(/icons/Category.png)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'top 13px left 25.5px',
        backgroundRepeat: 'no-repeat',
        height: 44,
        padding: '0 25px 0 54.5px',
        color: '#fff',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        textTransform: 'capitalize',

        '&:hover': {
            backgroundColor: '#078d2f',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            marginLeft: 16,
            padding: '0 20px',
            backgroundSize: '24px 24px',
            backgroundPosition: 'top 10px left 20px',
        }
    },
    store_link: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 44,
        marginLeft: 16,
        backgroundColor: '#fff',
        border: '1px solid #0AAD3B',
        color: '#0AAD3B',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        textTransform: 'capitalize',
        borderRadius: 4,

        '&:hover': {
            boxShadow: `0px 0px 4px ${COLOR.MAIN_LIGHT}`,
        },

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            width: 64
        },
    },
    store_link_text: {
        display: 'inline-block',
        marginLeft: 10,
    },
    cart_icon_wrapper: {
        width: 24,
        height: 24,
        position: 'relative',

        '& .counter': {
            top: -8,
            right: -8,
            position: 'absolute',
            width: 18,
            height: 18,
            backgroundColor: '#E52E2E',
            display: 'block',
            borderRadius: 50,
            fontSize: '12px',
            lineHeight: '18px',
            textAlign: 'center',
            color: COLOR.WHITE
        }
    }
})