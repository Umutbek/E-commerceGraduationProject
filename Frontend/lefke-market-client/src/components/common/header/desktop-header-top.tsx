import Link from "next/link"
import makeStyles from '@mui/styles/makeStyles';
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import {useCallback, useState, MouseEvent} from "react"
import {useRouter} from "next/router"

const useStyles = makeStyles({
    headerTop: {
        background: '#151C17',
        width: '100%',
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
        alignItems: 'center',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        '& li': {
            marginRight: '25.33px',

        },
        '& a:hover': {
            color: '#52CA41'
        }
    },
    langButton: {
        color: '#fff',
        textTransform: 'initial',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '16px',
    },
})

export default function DesktopHeaderTop(){

    const classes = useStyles()
    const router = useRouter()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const onClickLang = useCallback((lang: string) => {

        router.replace(router.pathname, router.pathname, {locale: lang})

        handleClose()
    }, [handleClose, router])



    return <>
        <div className={classes.headerTop}>
            <div className="main-container">
                <div className={classes.content}>
                    <ul className={classes.list}>
                        <li>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.00065 1.33301C5.42065 1.33301 3.33398 3.41967 3.33398 5.99967C3.33398 8.77967 6.28065 12.613 7.49398 14.073C7.76065 14.393 8.24732 14.393 8.51398 14.073C9.72065 12.613 12.6673 8.77967 12.6673 5.99967C12.6673 3.41967 10.5807 1.33301 8.00065 1.33301ZM8.00065 7.66634C7.08065 7.66634 6.33398 6.91967 6.33398 5.99967C6.33398 5.07967 7.08065 4.33301 8.00065 4.33301C8.92065 4.33301 9.66732 5.07967 9.66732 5.99967C9.66732 6.91967 8.92065 7.66634 8.00065 7.66634Z" fill="white"/>
                                    </svg>
                                </span>
                                <span style={{ marginLeft: 4 }}>Lefke</span>
                            </div>
                        </li>
                    </ul>
                    <ul className={classes.list}>
                        <li>
                            <Link href="/">
                                <a>
                                    About us
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/info/delivery">
                                <a>
                                    Delivery and Pick-up
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>
                                    For suppliers
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}

