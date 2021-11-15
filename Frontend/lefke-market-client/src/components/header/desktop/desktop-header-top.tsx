import Link from "next/link"
import {makeStyles} from "@material-ui/core/styles";
import {Button, FormControl, Menu, MenuItem, Select} from "@material-ui/core";
import React from "react";

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


export default function HeaderTop(){

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return <>
        <div className={classes.headerTop}>
            <div className="main-container">
                <div className={classes.content}>
                    <ul className={classes.list}>
                        <li>Lefke</li>
                        <li>+905488533853</li>
                        <li>07:00 - 00:00</li>
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
                            <Link href="/">
                                <a>
                                    Delivery and pick up
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>
                                    How to become a supplier
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}
