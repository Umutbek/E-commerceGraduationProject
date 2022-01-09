import makeStyles from '@mui/styles/makeStyles'
import Image from "next/image"
import Link from 'next/link'
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import CollapseOnScroll from "../on-scroll/collapse-on-scroll"
import {useDispatch, useSelector} from "react-redux"
import {useCallback, useEffect, useState} from "react"
import {openCategoryDrawer} from "../../../redux/states/catalog/actions"
import {COLOR, Z_INDEX_LAYER} from "../../../enums"
import {CatalogIcon} from "../icons"
import {useRouter} from "next/router"

const allowedPaths = [
    '/',
    '',
    '/profile',
    '/product-details/[slugOrId]',
    '/catalog/[store]/[category]',
    '/catalog/[store]/[category]/[subCategory]',
    '/catalog/[store]/[category]/[subCategory]/[subSubCategory]',
    '/stores',
    '/stores/[slugOrId]',
    '/results',
    '/results/[searchText]',
    '/info/[infoType]',
]

export default function MobileHeader(){

    console.log('MOBILE HEADER')
    const classes = useStyles()
    const router = useRouter()

    const dispatch = useDispatch()

    const onOpenCategory = useCallback(() => {
        dispatch(openCategoryDrawer())
    }, [dispatch])


    if (!allowedPaths.includes(router.pathname)) return null

    return <>
            <CollapseOnScroll component={AppBar} threshold={400}>
                <div className={classes.mobileHeader}>
                    <div className="main-container">
                        <div className={classes.mobileNavContainer}>
                            <Link href={'/'}>
                                <a className={classes.logoContainer}>
                                    <Image src={'/Logo.png'} width={113} height={40} alt={''}/>
                                </a>
                            </Link>
                            <Button
                                variant={"contained"}
                                classes={{ root: classes.catalogButton }}
                                onClick={onOpenCategory}
                            >
                                <CatalogIcon color={COLOR.WHITE}/>
                                <span className={classes.buttonText}>
                                    Category
                                </span>
                            </Button>
                        </div>
                        <div className={classes.mobileSearchContainer}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className={classes.searchInput}
                                onChange={e => router.push(`/results/${e.target.value}`)}
                            />
                        </div>
                    </div>
                </div>
            </CollapseOnScroll>
    </>
}

const useStyles = makeStyles({
    mobileBanner: {
        width: '100%',
        height: 57,
        position: 'relative',
    },
    mobileHeader: {
        background: '#FFFFFF',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        position: "sticky",
        top: 0,
        padding: '16px 0 0',
        zIndex: Z_INDEX_LAYER.HEADER,
    },
    mobileNavContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {

    },
    mobileSearchContainer: {
        height: 45,
        // padding: '10px 16px',
        marginTop: 10,
    },
    basketBtn: {
        backgroundColor: '#0AAD3B'
    },
    searchInput: {
        width: '100%',
        padding: '6px 16px',
        border: "none",
        background: '#F2F2F2',
        borderRadius: '4px',
        outline: 'none',
        fontSize: '14px',
        lineHeight: '24px',
        '&:focus': {
            outline: '1px solid green'
        }
    },
    catalogButton: {
        // width: '119',
        height: '40px',
        backgroundColor: COLOR.MAIN,
        padding: '8px 12px',

        '&:focus': {
            backgroundColor: COLOR.MAIN_HOVER,
        },
        '&:hover': {
            backgroundColor: COLOR.MAIN_HOVER,
        }
    },
    buttonText: {
        marginLeft: 10,
        color: COLOR.WHITE,
    }
})
