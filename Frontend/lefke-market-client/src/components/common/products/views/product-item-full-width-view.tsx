import Link from "next/link"
import Image from "next/image"
import Rating from "../../rating"
import clsx from "clsx"
import Button from "@mui/material/Button"
import {BREAKPOINTS, COLOR} from "../../../../enums"
import makeStyles from "@mui/styles/makeStyles"
import {IProduct} from "../interfaces"

interface IProductItemFullWidthViewProps {

    handleFavoriteBtnClick: (e: MouseEvent) => void,
    isInFavorites: boolean,
    product: IProduct,
}

function ProductItemFullWidthView({ product, handleFavoriteBtnClick, isInFavorites }: IProductItemFullWidthViewProps) {

    const classes = useStyles()

    return (
        <div className={classes.card}>
            <Link href={`/product-details/${ product.slug || product.id }`}>
                <a className={classes.imageContainer}>
                    <Image loader={({src}) => src} src={product.image} layout={'fill'} objectFit={'contain'} alt={``}/>
                </a>
            </Link>
            <div className={classes.infoContainer}>

                <div className={classes.info_left_block}>
                    <div className={classes.infoTop}>
                        <span className={classes.infoArticle}>Code: { product.id }</span>
                        <span className={classes.infoRatingIcon}>
                        <Rating rate={product.rating}/>
                    </span>
                        <span>{ product.rating }</span>
                    </div>

                    <Link href="/stores">
                        <a className={clsx(classes.infoStore, 'line-clamp-2')}>
                            { product.supplier.username }
                        </a>
                    </Link>

                    <Link href={`/product-details/${ product.slug || product.id }`}>
                        <a className={classes.infoName}>
                            { product.name }
                        </a>
                    </Link>
                    <div className={clsx('line-clamp-2', classes.infoDescription)}>
                        { product.description }
                    </div>
                </div>

                <div className={classes.info_right_block}>
                    <p className={classes.info_price}>
                        { product.cost } <span className="TL">TL</span>
                    </p>
                    <div className={classes.info_actions}>
                        <Button variant="contained" classes={{ root: classes.info_to_cart_btn }}>
                            busket
                        </Button>

                        <button className={clsx('reset-button', 'cursor-pointer', classes.info_favorite_btn)} onClick={handleFavoriteBtnClick}>
                            <Image src={isInFavorites ? '/icons/lefke_liked.png' : `/icons/lefke_like2.png`} width={32} height={32} alt="lefke like icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    card: {
        width: '100%',
        position: 'relative',
        minHeight: 144,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 16,

        '&:hover': {
            boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.12)',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            borderBottom: `1px solid ${COLOR.GRAY}`
        },
    },
    imageContainer: {
        display: 'block',
        width: '18.5567%',
        position: 'relative',
    },
    infoContainer: {
        width: '78.1443%',
        display: 'flex',
        flexWrap: 'wrap',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            marginLeft: 16
        },
    },
    info_left_block: {
        width: '70.9762%',
        padding: '0 16px',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            padding: 0,
        },
    },
    info_right_block: {
        width: '29.0237%',
        padding: '16px',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            padding: 0,
        },
    },
    infoTop: {
        display: 'flex',
    },
    infoArticle: {
        fontSize: '14px',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            display: 'none'
        }
    },
    infoRatingIcon: {
        marginLeft: 16,
        marginRight: 8,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            marginLeft: 0,
        }
    },
    infoRatingText: {
        fontSize: '14px',
        lineHeight: '20px',
    },
    infoName: {
        fontSize: '20px',
        lineHeight: '24px',
        marginTop: 8,
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',

        '&:hover': {
            textDecoration: 'underline'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            fontSize: '14px',
            lineHeight: '16px',
            marginTop: 12,

            display: '-webkit-box',
            '-webkit-line-clamp': 1,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
        }
    },

    infoStore: {
        fontSize: '20px',
        lineHeight: '24px',
        marginTop: 8,
        color: '#0000FF',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',

        '&:hover': {
            textDecoration: 'underline'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            fontSize: '14px',
            lineHeight: '16px',
            marginTop: 12,

            display: '-webkit-box',
            '-webkit-line-clamp': 1,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
        }
    },
    infoDescription: {
        marginTop: 8,
        fontSize: '14px',
        lineHeight: '18px',
        color: COLOR.SECONDARY,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            display: 'none',
        }
    },

    info_price: {
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '24px',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            fontSize: '18px',
            lineHeight: '20px',
            marginTop: 4,
        }
    },
    info_actions: {
        marginTop: 24,
        display: 'flex',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            marginTop: 8
        }
    },
    info_to_cart_btn: {
        width: 140,
        height: 32,
        backgroundColor: COLOR.MAIN,
        fontSize: '14px',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100px',
            height: '24px',
            fontSize: '12px',
            lineHeight: '24px',
            padding: '0',
        }
    },
    info_favorite_btn: {
        marginLeft: 16,
        transform: 'translateY(0)',

        '&:hover': {
            transform: 'translateY(-3px)'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            position: 'absolute',
            top: 16,
            right: 16,
        }
    },
})

export default ProductItemFullWidthView;
