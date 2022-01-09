import React, {useEffect} from 'react'
import NextNprogress from "nextjs-progressbar"
import {SCREEN_TYPE} from "../../../enums"
import CartModal from "../../pages/cart/cart-modal"
import AuthModal from "../auth/auth-modal"
import ScrollToTop from "../scroll-to-top"
import dynamic from "next/dynamic"
import makeStyles from "@mui/styles/makeStyles"
import {useDispatch, useSelector} from "react-redux"
import {getScreenType} from "../../../redux/states/settings/getters"
import {getCartFromServer} from "../../../redux/states/cart/actions"
import {ToastContainer} from "react-toastify"

const DesktopCategoryDrawer = dynamic(() => import('../drawer/category/desktop-drawer'), { ssr: false })
const MobileCategoryDrawer = dynamic(() => import('../drawer/category/mobile-drawer'), { ssr: false })
const DesktopHeader = dynamic(() => import('../header/desktop-header'), { ssr: false })
const MobileHeader = dynamic(() => import('../header/mobile-header'), { ssr: false })
const MobileBottomNavigation = dynamic(() => import('../mobile-bottom-navigation'), { ssr: false })


const useStyles = makeStyles({
    site: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',

    },
    siteContent: {
        position: 'relative',
        backgroundColor: '#fff',
    },
    header: { },
})

interface ILayout {
    children: JSX.Element | JSX.Element[]
}

function Layout({children}: ILayout) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const screenType = useSelector(getScreenType)

    useEffect(() => {
        dispatch(getCartFromServer())
    }, [])

    return (
        <>
            <NextNprogress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />

            { screenType === SCREEN_TYPE.DESKTOP ? <>
                <DesktopHeader/>
            </> : <>
                <MobileHeader/>
            </> }

            <div className={classes.site}>
                <div className={classes.siteContent} id="scroller">
                    {/*<RouteGuard>*/}
                    { children }
                    {/*</RouteGuard>*/}
                </div>
            </div>

            { screenType !== SCREEN_TYPE.DESKTOP ? <>
                <MobileCategoryDrawer storeName="global"/>
                <MobileBottomNavigation/>
            </> : <>
                <DesktopCategoryDrawer storeName="global"/>
                <CartModal/>
            </> }

            <AuthModal/>
            <ScrollToTop/>
            <ToastContainer/>
        </>
    )
}

export default Layout
