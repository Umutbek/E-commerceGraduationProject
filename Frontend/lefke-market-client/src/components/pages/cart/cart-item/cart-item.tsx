import {memo, useState} from "react"
import Image from 'next/image'
import Link from 'next/link'
import makeStyles from "@mui/styles/makeStyles"
import {IconButton} from "@mui/material"
import {RemoveIcon} from "../../../common/icons"
import Button from "@mui/material/Button"
import clsx from "clsx"
import {COLOR} from "../../../../enums"
import {IProduct} from "../../../common/products/interfaces"
import {useDispatch, useSelector} from "react-redux"
import {addToCart, decreaseItemInCart, deleteFromCart} from "../../../../redux/states/cart/actions"
import {getUser} from "../../../../redux/states/auth/getters"

interface ICartItemProps {
    item: IProduct,
    quantity: number,
}

function CartItem({ item, quantity }: ICartItemProps) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(getUser)

    const [cartItem, setCartItem] = useState(item)
    const [count, setCount] = useState(quantity)

    const [errors, setErrors] = useState({
    count: null,
    })


    const handleIncrement = () => {
        console.log("Hello")
        console.log("Count", count)
        console.log("Quantity", item.quantity)

        if (count>=item.quantity){
          setErrors(old => ({ ...old, count: 'You can select maximum ' + item.quantity + ' items'}))
          return
        }
        setCount(c => c + 1)
        dispatch(addToCart(item.id,  user[0]?.id, item.supplier))
    }


    const handleDecrement = () => {
        if (count<=10){

            setErrors(old => ({ ...old, count: null }))
            setCount(c => {
                if (c > 0) {
                    dispatch(decreaseItemInCart(item.id))
                    return c - 1
                }
                return c
        })}
    }

    const handleRemove = () => {
        dispatch(deleteFromCart(item.id))
        setCartItem(null)
    }

    if (!cartItem) {
        return null
    }

    return (
        <div className={classes.card}>
            <Link href={`/product-details/${ cartItem.slug || cartItem.id }`}>
                <a className={classes.image_wrapper}>
                    <Image loader={({src}) => src} src={cartItem.image || '/no-image-min.jpg'} layout="fill" objectFit="contain" alt={cartItem.name}/>
                </a>
            </Link>
            <div className={classes.center}>
                <p className={classes.name_wrapper}>
                    <Link href={`/product-details/${ cartItem.slug || cartItem.id }`}>
                        <a className={classes.name} title={cartItem.name}>
                            { cartItem.name }
                        </a>
                    </Link>
                </p>
                <p className={classes.quantity}>
                    Quantity : { cartItem.quantity }
                </p>
                <p className={classes.price}>
                    { cartItem.cost } <span className="TL">TL</span>
                </p>
                <div className={classes.amount_wrapper}>
                    <Button variant="outlined" classes={{ root: clsx(classes.amount_button, classes.minus) }} onClick={handleDecrement}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="#0AAD3B"/>
                        </svg>
                    </Button>
                    <input
                     value={count}
                     type="text"
                     className={classes.amount_input}
                     className={clsx(classes.amount_input, errors.code ? classes.inputErrorBorder : '')}

                     />
                    <Button variant="outlined" classes={{ root: clsx(classes.amount_button, classes.plus) }} onClick={handleIncrement}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill="white"/>
                        </svg>
                    </Button>
                </div>
                {errors.count && <span className={classes.inputErrorText}>{ errors.count }</span>}
            </div>
            <div className={classes.remove}>
                <IconButton onClick={handleRemove} title="Remove from busket">
                    <RemoveIcon/>
                </IconButton>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    card: {
        width: '100%',
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
    },
    inputErrorText: {
        fontSize: '12px',
        color: 'red'
    },

    inputErrorBorder: { borderColor: 'red' },
    image_wrapper: {
        display: 'block',
        position: 'relative',
        width: 60,
        height: 60,
    },
    center: {
        width: 252,
    },
    remove: {
        width: 40,
        height: 40,
    },
    name_wrapper: {
        position: 'relative',

        '& .name_tooltip_text': {
            visibility: 'hidden',
            position: 'absolute',
            backgroundColor: COLOR.GRAY_4,
            top: 0,
            left: 0,
            padding: 8,
            borderRadius: 4,
            zIndex: 1000,
        },

        '&:hover .name_tooltip_text': {
            visibility: 'visible'
        }

    },
    name: {
        fontSize: '14px',
        lineHeight: '16px',
        display: '-webkit-box',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',

        '&:hover': {
            textDecoration: 'underline',
        }
    },
    price: {
        marginTop: 8,
        fontSize: '18px',
        lineHeight: '20px',
        fontWeight: 500,
    },

    quantity: {
        marginTop: 8,
        fontSize: '12px',
        lineHeight: '20px',
    },

    amount_wrapper: {
        display: 'flex',
        marginTop: 16,
    },
    amount_button: {
        maxWidth: '32px',
        maxHeight: '32px',
        minWidth: '32px',
        minHeight: '32px',
        padding: 4,
    },
    minus: {
        border: `1px solid ${COLOR.MAIN}`,
        borderRadius: '4px 0px 0px 4px',

        '&:hover': {
            border: `1px solid ${COLOR.MAIN_LIGHT}`,
        }
    },
    plus: {
        borderRadius: '0px 4px 4px 0px',
        backgroundColor: COLOR.MAIN,
        border: 'none',

        '&:hover': {
            border: 'none',
            backgroundColor: COLOR.MAIN_LIGHT,
        }
    },
    amount_input: {
        width: 56,
        height: 32,
        textAlign: 'center',
        borderTop: '1px solid #DFDFDF',
        borderLeft: 'none',
        borderBottom: '1px solid #DFDFDF',
        borderRight: 'none',
        outline: 'none',
    }
})

export default memo(CartItem)
