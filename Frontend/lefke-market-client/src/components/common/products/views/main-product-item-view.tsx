import makeStyles from '@mui/styles/makeStyles'
import Image from "next/image"
import Link from 'next/link'
import Rating from "../../../common/rating/rating"
import Button from "@mui/material/Button"
import {BREAKPOINTS, COLOR} from "../../../../enums"
import clsx from "clsx"
import {IProduct} from "../interfaces"
import {Hidden} from "@mui/material"

interface IMainProductItemViewProps {
    handleFavoriteBtnClick: any,
    isInFavorites: boolean,
    product: IProduct,
}



function MainProductItemView({handleFavoriteBtnClick, product, isInFavorites}: IMainProductItemViewProps){

    console.log("Product", product)

    const classes = useStyles()

    return (
        <li className={classes.item}>
            <div className={classes.card}>

                <button className={`reset-button ${classes.like_button}`} onClick={handleFavoriteBtnClick}>
                    <Image src={isInFavorites ? '/icons/lefke_liked.png' : `/icons/lefke_like2.png`} width={32} height={32} alt="lefke like icon"/>
                </button>

                <Link href={product.slug ? `/product-details/${product.slug}` : `/product-details/${product.id}`}>
                    <a className={classes.imageContainer}>
                        <div className={classes.imageRatio}/>
                        <div className={classes.imageContent}>
                            <Image loader={({src}) => src} src={product.image} className={classes.image} layout={"fill"} objectFit={"contain"} alt={product.name}/>
                        </div>
                    </a>
                </Link>
                <div className={classes.rating}>
                    <Rating disabled rate={product.rating}/>
                </div>
                <Link href="/stores">
                    <a className={clsx(classes.store, 'line-clamp-2')}>
                        { product.supplier.username }
                    </a>
                </Link>
                <Link href={product.slug ? `/product-details/${product.slug}` : `/product-details/${product.id}`}>
                    <a className={clsx(classes.name, 'line-clamp-2')}>
                        { product.name }
                    </a>
                </Link>

                <span className={classes.price}>
                { product.cost } <span className="TL">TL</span>
            </span>
                <Button
                    variant="contained"
                    classes={{ root: classes.to_cart_button }}
                >
                    <Hidden only={["sm", "xs"]}>
                        <span>Add to busket</span>
                    </Hidden>
                </Button>
            </div>
        </li>
    )
}

const useStyles = makeStyles({
    item: {
        display: 'flex',
        justifyContent: 'center',
        width: '20%',

        [`@media screen and (max-width: ${BREAKPOINTS.XL})`]: {
            width: '25%',
        },

        [`@media screen and (max-width: 868px)`]: {
            width: '33.333%',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: '50%',
        }
    },
    card: {
        position: 'relative',
        width: 244,
        marginBottom: 16,
        background: '#fff',
        borderRadius: '8px',
        padding: '27px 16px 24px',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: 175,
            padding: '20.5px 8px 16px'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: 160,
        }
    },
    leftElement: {
        marginRight: 0
    },
    imageContainer: {
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '157px',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            height: '119px',
        }
    },
    imageRatio: {
        paddingTop: '90%',
        height: 0
    },
    imageContent: {
        position: "absolute",
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    image: {

    },
    rating: {
        marginTop: 35,

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            marginTop: 28
        }
    },
    name: {
        height: 20,
        marginTop: 16,
        fontSize: '14px',
        fontWeight: 400,

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            fontSize: '12px',
            marginTop: 8,
        },

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    store: {
        height: 15,
        marginTop: 16,
        fontSize: '14px',
        fontWeight: 400,
        color: '#0000FF',
        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            fontSize: '12px',
            marginTop: 8,
        },

        '&:hover': {
            textDecoration: 'underline',
        }
    },
    price: {
        display: 'block',
        marginTop: 20,
        fontWeight: 500,
        fontSize: '24px',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            fontSize: '18px',
            marginTop: 8,
        }
    },
    buttonIcons: {
        height: 24
    },
    to_cart_button: {
        width: '100%',
        color: '#fff',
        backgroundColor: COLOR.MAIN,
        marginTop: 16,
        textTransform: 'uppercase',
        fontSize: '16px',
        fontWeight: 500,
        padding: '8px 0',

        '&:hover': {
            backgroundColor: COLOR.MAIN_LIGHT,
        },

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            padding: '4px 0',
        }
    },
    like_button: {
        position: 'absolute',
        top: 8,
        right: 8,
        cursor: 'pointer',
        zIndex: 10,
    },
})

export default MainProductItemView
