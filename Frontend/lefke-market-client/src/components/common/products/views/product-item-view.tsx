import makeStyles from '@mui/styles/makeStyles'
import Image from "next/image"
import Link from 'next/link'
import Rating from "../../rating/rating"
import Button from "@mui/material/Button"
import {BREAKPOINTS, COLOR} from "../../../../enums"
import {IProduct} from "../interfaces"
import {Hidden} from "@mui/material"

interface IProductItemViewProps {
    handleFavoriteBtnClick: any,
    isInFavorites: boolean,
    isInCart: boolean,
    toggleAddToCart: any,
    product: IProduct,
}

function ProductItemView({product}: IProductItemViewProps){

    const classes = useStyles()

    return (
        <li className={classes.item}>
            <div className={classes.card}>

                <button className={`reset-button ${classes.like_button}`}>
                    <Image src='/icons/lefke_like2.png' width={32} height={32} alt="Lefke like icon"/>
                </button>

                <Link href={`/product-details/${product.slug || product.id}`}>
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

                <Link href="/">
                    <a className={`${classes.store} line-clamp-2`}>
                        { product.supplier.username }
                    </a>
                </Link>

                <Link href={`/product-details/${product.slug || product.id}`}>
                    <a className={`${classes.name} line-clamp-2`}>
                    { product.name }
                    </a>
                </Link>
                <div className={classes.price}>
                    { product.cost } <span className="TL">TL</span>
                </div>
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
        width: 178,
        marginBottom: 20,
        background: '#fff',
        borderRadius: '8px',
        padding: '15px 16px 24px',

        '&:hover': {
            boxShadow: '0px 0px 8px #BDBDBD',
            // transform: 'scale(1.1, 1.1)',
        },

        '@media screen and (max-width: 1360px)': {
            width: 175,
            padding: '20.5px 8px 16px'
        },

        '@media screen and (max-width: 768px)': {
            width: 160,
        }
    },
    leftElement: {
        marginRight: 0
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        display: 'block',
        height: '92.23px',

        '@media screen and (max-width: 1360px)': {
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
        fontSize: '11px',
    },
    image: {

    },
    rating: {
        marginTop: '23.88px',

        '@media screen and (max-width: 1360px)': {
            marginTop: 28
        }
    },
    name: {
        width: '100%',
        height: 40,
        marginTop: 16,
        fontSize: '14px',
        fontWeight: 400,

        '&:hover': {
            textDecoration: 'underline',
        },

        '@media screen and (max-width: 1360px)': {
            fontSize: '12px',
            marginTop: 8,
        }
    },


    store: {
        width: '100%',
        height: 15,
        marginTop: 16,
        fontSize: '14px',
        fontWeight: 400,
        color: '#0000FF',

        '&:hover': {
            textDecoration: 'underline',
        },

        '@media screen and (max-width: 1360px)': {
            fontSize: '12px',
            marginTop: 8,
        }
    },
    price: {
        marginTop: 8,
        fontWeight: 500,
        fontSize: '24px',

        '@media screen and (max-width: 1360px)': {
            fontSize: '18px',
            marginTop: 8,
        }
    },
    buttonIcons: {
        height: 24
    },
    like_button: {
        position: 'absolute',
        top: 8,
        right: 8,
        cursor: 'pointer',
        zIndex: 10,
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
    }
})


export default ProductItemView
