import Image from "next/image";
import DesktopHeaderTop from "./desktop-header-top";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button} from "@material-ui/core";

import Link from 'next/link'
import {useDispatch} from "react-redux"
import {useCallback} from "react"
import {openCategoryDrawer} from "../../../redux/states/settings/actions"


const useStyles = makeStyles({

    navbar: {
        width: '100%',
        height: 80,
        boxShadow: '0 1px 1px rgb(0 0 0 / 0.002)',
        position: 'sticky',
        top: 0
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
        width: 163
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
        backgroundImage: `url(icons/uygo_search_green.png)`,
        backgroundSize: '18px 18px',
        backgroundPosition: 'top 13px right 16px',
        backgroundRepeat: 'no-repeat',

        ['@media screen and (max-width: 992px)']: {
            width: 400
        }
    },
    navbarRight: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    navbarRightItem: {
        '& a': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginRight: 35,
            height: '100%',
        },
        '& a:hover': {
            borderBottom: '4px solid green',
        },
    },
    navbarRightItemText: {
        // marginLeft: 12
    },
})

export default function DesktopHeader(){

    const classes = useStyles()

    const dispatch = useDispatch()

    const onOpenCategory = useCallback(() => {
        dispatch(openCategoryDrawer())
    }, [dispatch])

    return (
        <>
            <DesktopHeaderTop/>

            <AppBar color={"inherit"} position={"sticky"}>
                <div className={classes.navbar}>
                    <div className="main-container">
                        <div className={classes.navbarContent}>
                            <ul className={classes.navbarLeft}>
                                <li className={classes.logoContainer}>
                                    <Image src={'/icons/Logo.png'} layout={"fill"} objectFit={"contain"} alt="Lefke market"/>
                                </li>
                                <li style={{ marginLeft: 32 }}>
                                    <Button
                                        variant="contained"
                                        onClick={onOpenCategory}
                                        style={{
                                            backgroundColor: '#0AAD3B',
                                            backgroundImage: `url(icons/Category.png)`,
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
                                        }}
                                    >
                                        Category
                                    </Button>
                                </li>
                                <li style={{ marginLeft: 16 }}>
                                    <Button variant="contained" style={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #0AAD3B',
                                        backgroundImage: `url(icons/Store.png)`,
                                        backgroundSize: '18px 18px',
                                        backgroundPosition: 'top 13px left 25.5px',
                                        backgroundRepeat: 'no-repeat',
                                        height: 44,
                                        padding: '0 25px 0 54.5px',
                                        color: '#0AAD3B',
                                        fontWeight: 500,
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        textTransform: 'capitalize',
                                    }}>
                                        Stores
                                    </Button>
                                </li>

                                <li className={classes.search}>
                                    <input className={classes.searchInput} placeholder="Search..." type="text"/>
                                </li>
                            </ul>
                            <ul className={classes.navbarRight}>
                                <li className={classes.navbarRightItem}>
                                    <Link href="/">
                                        <a>
                                            <Image src={'/icons/lefke_like.png'} width={24} height={24} alt="Lefke market"/>
                                            <span className={classes.navbarRightItemText}>Favourites</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className={classes.navbarRightItem}>
                                    <Link href="/">
                                        <a>
                                            <Image src={'/icons/lefke_cart2.png'} width={24} height={24}/>
                                            <span className={classes.navbarRightItemText}>Busket</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className={classes.navbarRightItem}>
                                    <Link href="/">
                                        <a>
                                            <Image src={'/icons/lefke_user.png'} width={24} height={24} alt="Lefke market"/>
                                            <span className={classes.navbarRightItemText}>Sign in</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </AppBar>
        </>
    )
}
