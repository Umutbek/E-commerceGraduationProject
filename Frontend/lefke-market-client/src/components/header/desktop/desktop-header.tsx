import Image from "next/image";
import DesktopHeaderTop from "./desktop-header-top";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button} from "@material-ui/core";

import Link from 'next/link'
import {useDispatch} from "react-redux"
import {useCallback} from "react"


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

    return (
        <>
            <DesktopHeaderTop/>

            <AppBar color={"inherit"} position={"sticky"}>
                <div className={classes.navbar}>
                    <div className="main-container">
                        <div className={classes.navbarContent}>
                            <ul className={classes.navbarLeft}>
                                <li className={classes.logoContainer}>
                                    <Image src={'/icons/test.png'} layout={"fill"} objectFit={"contain"} alt="Lefke market"/>
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
