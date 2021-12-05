import React from 'react'
import makeStyles from "@mui/styles/makeStyles"
import Rating from "../rating"
import clsx from "clsx"
import {COLOR} from "../../../enums"
import Button from "@mui/material/Button"
import {ArrowNextIcon, LikeIcon} from "../icons"
import Link from 'next/link'
import Image from "next/image"
import {BREAKPOINTS} from "../../../enums"
import {useDispatch, useSelector} from "react-redux"

interface IProductDetailCard {
    product: any
}

const useStyles = makeStyles({
    card: {
        width: '100%',
        minHeight: 317,

        boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.12)',
        borderRadius: 8,
        padding: 20,

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            marginTop: 20
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            padding: 0,
            boxShadow: 'none',
        },
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    article: {
        fontWeight: 400,
        color: COLOR.SECONDARY,
    },
    reviews: {
         display: 'flex',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            marginTop: 8,
        },
    },
    reviewReviews: {
        textDecoration: 'underline',
        color: COLOR.SECONDARY,
        marginLeft: 8,
    },
    reviewWrite: {
        color: COLOR.MAIN,
        lineHeight: '20px',
        fontSize: '14px',
        marginLeft: 16,
    },
    title: {
        display: 'block',
        marginTop: 16,
        fontSize: '24px',
        fontWeight: 400,
        color: COLOR.BLACK,
    },
    price: {
        fontSize: '32px',
        fontWeight: 500,
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 16,
        // flexWrap: 'wrap',
    },
    action: {

    },
    toCartBtn: {
        width: 235,
        height: 56,
        backgroundColor: COLOR.MAIN,
        color: COLOR.WHITE,
        fontSize: '20px',
        fontWeight: 500,
        fontStyle: 'normal',
        borderRadius: 4,

        '&:hover': {
            backgroundColor: COLOR.MAIN_LIGHT
        },

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '81.25%',
            height: 44,
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            maxWidth: '240px',
        },
    },
    toFavoriteBtn: {
        width: 235,
        height: 56,
        borderRadius: 4,
        border: `1px solid ${COLOR.GRAY}`,

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            maxWidth: '13.75%',
            height: 44,
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            maxWidth: '64px',
        },
    },
    toFavoriteBtnText: {
        color: COLOR.GRAY,
        fontSize: '20px',
        fontWeight: 500,
        fontStyle: 'normal',
        marginLeft: 11,

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            display: 'none'
        },
    },
    line: {
        margin: 0,
        padding: 0,
        marginTop: '16.5px',
        color: '#C4C4C4',
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 16,
        flexWrap: 'wrap',
    },
    storeLink: {
        position: 'relative',
        width: 160,
        height: 52,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        borderRadius: 4,

        '&:hover': {
            backgroundColor: '#e8e5e5',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '100%',
            marginBottom: 10
        },
    },
    delivery: {
        width: 128,
        height: 52,
        backgroundColor: 'rgba(10, 173, 59, 0.08)',
        borderRadius: 4,
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: '48%',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            marginBottom: 10
        },
    },
    icon: {
        margin: '14px 16px 14px 10px',
        width: 24,
        height: 24,
    },
    payment: {
        width: 178,
        height: 52,
        backgroundColor: 'rgba(10, 173, 59, 0.08)',
        borderRadius: 4,
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
        },
    }
})

function ProductDetailsCard({product}: IProductDetailCard) {

    const classes = useStyles()
    const dispatch = useDispatch()

    return (
        <div className={classes.card}>

            <div className={classes.top}>
                <span className={classes.article}> Code: { product.id } </span>
                <div className={classes.reviews}>
                    <Rating rate={5} disabled={true}/>
                    <button className={clsx("reset-button cursor-pointer", classes.reviewReviews)}>{ product.reviews?.length } reivews</button>
                    <button className={clsx("reset-button cursor-pointer", classes.reviewWrite)}>Write review</button>
                </div>
            </div>

            <span className={classes.title}>
                    { product.name }
                </span>

            <span className={classes.price}>
                { product.cost } <span className="som">TL</span>
            </span>

            <div className={classes.actions}>
                <Button classes={{ root: classes.toCartBtn }} onClick={() => handleAddToCart(product)}>
                    Add to Busket
                </Button>
                <Button classes={{ root: classes.toFavoriteBtn }}>
                    <LikeIcon width={22} height={22}/> <span className={classes.toFavoriteBtnText}>Favourites</span>
                </Button>
            </div>

            <hr className={classes.line}/>

            <div className={classes.bottom}>
                <Link href={`/stores/${product.supplier?.slug}`}>
                    <a className={classes.storeLink} title="Go to store page">
                        <Image loader={({src}) => src} src={product.supplier?.avatar} objectFit={'contain'} width={32} height={32} alt={'store info'}/>
                        <span> { product.supplier?.name } </span>
                        <ArrowNextIcon width={7} height={12}/>
                    </a>
                </Link>
            </div>

        </div>
    )
}

export default ProductDetailsCard
