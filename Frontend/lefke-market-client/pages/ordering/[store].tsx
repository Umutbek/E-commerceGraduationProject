import React, {ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState} from 'react'
import makeStyles from "@mui/styles/makeStyles"
import PhoneInput from 'react-phone-input-2'
import {Hidden, Radio} from "@mui/material"
import {BREAKPOINTS, COLOR, SCREEN_TYPE} from "../../src/enums"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import MobileTopNavigation from "../../src/components/common/mobile-top-navigation"
import {useRouter} from "next/router"
import {useDispatch, useSelector} from "react-redux"
import {getCartItems, getCartStores} from "../../src/redux/states/cart/getters"
import {IProduct} from "../../src/components/common/products/interfaces"
import {closeCartModal, openAuthModal} from "../../src/redux/states/settings/actions"
import {getIsAuth, getUser} from "../../src/redux/states/auth/getters"
import {getScreenType} from "../../src/redux/states/settings/getters"
import ApiContext from "../../src/helpers/api/api-context"
import Spinner from "../../src/components/common/spinners/spinner";
import {getCartFromServer} from "../../src/redux/states/cart/actions";
import {toast} from "react-toastify";

function Store() {

    const classes = useStyles()
    const router = useRouter()
    const dispatch = useDispatch()
    const cartStores = useSelector(getCartStores)
    const isAuth = useSelector(getIsAuth)
    const user = useSelector(getUser)
    const screenType = useSelector(getScreenType)

    const api = useContext(ApiContext)

    const store = router.query.store

    const [isLoading, setIsLoading] = useState(false)

    const [phone, setPhone] = useState(user?.login || '')
    const [deliveryType, setDeliveryType] = useState('delivery')
    const [paymentType, setPaymentType] = useState(1)
    const [address, setAddress] = useState(user?.address)
    const [orderProducts, setOrderProducts] = useState([])

    const [errors, setErrors] = useState({
        phone: null,
        address: null
    })


    useEffect(() => { dispatch(closeCartModal()) }, [])

    const cartStore = cartStores.find((c: any) => c.storeid.slug === store)

    const handleAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
        setErrors(old => ({...old, address: null}))
    }, [])

    const handlePhoneChange = useCallback((val: any) => {
        setPhone(val)
        setErrors(old => ({...old, phone: null}))
    }, [])

    const clearErrors = useCallback(() => {

    }, [])

    const handleClose = useCallback(() => router.push('/'), [])

    const handleToBack = useCallback(() => router.back(), [])


    const onSubmitOrder = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        if (isAuth) {
            try {

                const cartStore = cartStores.find((c: any) => c.storeid.slug === store)

                if (!cartStore) {
                    throw new Error('No busket')
                }

                const form = {
                    status: 1,
                    clientId: user[0].id,
                    storeId: cartStore.storeid.id,
                    cart: cartStore.id,
                    address: `${address}`,
                }

                const { success, data } = await api.createOrder(form)

                if (success) {
                    dispatch(getCartFromServer())
                    toast.success('Order successfully created')
                    router.push('/')
                } else {
                    toast.error(data)
                    console.error(data)
                }

            } catch (e) {
                console.log('e: ', e.message)
            }

        } else {
            screenType === SCREEN_TYPE.DESKTOP ? dispatch(openAuthModal()) : router.push('/login')
        }

        setIsLoading(false)
    }


    return (
        <div className={classes.page}>
            <Hidden only={["md", "lg", "xl"]}>
                <MobileTopNavigation
                    title=""
                    onLeftButtonClick={handleToBack}
                    onRightButtonClick={handleClose}
                />
            </Hidden>
            <div className="main-container">
                <div className={classes.content}>
                    <div className={classes.left_content}>
                        <Hidden only={["xs", "sm"]}>
                            <h1>
                                Give order
                            </h1>
                        </Hidden>
                        <form onSubmit={onSubmitOrder}>

                            <div className={classes.form_control}>
                                <label className={classes.title}>
                                    Phone number
                                </label>

                                <PhoneInput
                                    containerClass={classes.phone_input_container}
                                    inputStyle={{ width: '100%', height: 44 }}
                                    onlyCountries={['tr']}
                                    country={'tr'}
                                    value={phone}
                                    placeholder="+90 (548) 853 3853"
                                    masks={{tr: '(...) ...-....'}}
                                    onChange={handlePhoneChange}
                                />
                                <span className="text-danger">{ errors.phone }</span>
                            </div>

                            <div className={classes.form_control}>
                                <p className={classes.title}>Delivery type</p>
                                <div className={classes.radio_wrapper}>

                                    <label htmlFor="delivery-type-radio-delivery" className={classes.radio}>
                                        <Radio id="delivery-type-radio-delivery" checked={deliveryType === 'delivery'} onClick={() => setDeliveryType('delivery')} color="success"/>
                                        <span className={classes.radio_text}>
                                                <Hidden only={["sm", "xs"]}>
                                                    Delivery
                                                </Hidden>
                                                <Hidden only={["md", "lg", "xl"]}>
                                                    Delivery
                                                </Hidden>
                                            </span>
                                    </label>

                                    <label htmlFor="delivery-type-radio-pickup" className={classes.radio}>
                                        <Radio id="delivery-type-radio-pickup" checked={deliveryType === 'pickup'} onClick={() => setDeliveryType('pickup')} color="success"/>
                                        <span className={classes.radio_text}>
                                                Pick up
                                            </span>
                                    </label>

                                </div>
                                <div className={classes.address_wrapper}>
                                    <input value={address} className={classes.input} placeholder="Delivery address" type="text" onChange={handleAddressChange}/>
                                    <span className="text-danger">{ errors.address }</span>
                                </div>
                            </div>

                            <div className={classes.price}>

                                <div className={classes.total}>
                                    <span>Total cost</span>
                                    <span> { cartStore?.total_price } <span className="TL">TL</span> </span>
                                </div>
                            </div>

                            <Button variant="contained" classes={{ root: classes.accept_button }} type={"submit"}>
                                { isLoading ? <Spinner/> : 'Confirm order' }
                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    page: {
        height: 700,
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    left_content: {
        width: 420,

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: 328,
        }
    },
    right_content: {
        width: '50%',
        position: 'relative',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            display: 'none',
        }
    },
    map_wrapper: {
        width: '50vw',
        height: 800,
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 10,
    },
    form_control: {
        marginTop: 24,

        '&:nth-child(1)': {
            marginTop: 32,
        }
    },
    title: {
        display: 'block',
        fontSize: '14px',
        lineHeight: '24px',
    },
    phone_input_container: {
        marginTop: 8,
    },
    radio_wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    radio: {
        marginTop: 8,
        width: 202,
        height: 44,
        border: `1px solid ${COLOR.GRAY}`,
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: 156,
        }
    },
    radio_text: {
        fontSize: '14px',
    },
    input: {
        border: `1px solid ${COLOR.GRAY}`,
        borderRadius: 4,
        width: '100%',
        height: 44,
        marginTop: 8,
        padding: '12px 16px',
        fontSize: '14px',


        '&:focus': {
            outline: `none`,
            border: `1px solid ${COLOR.MAIN_LIGHT}`,
        }
    },

    price: {
        marginTop: 34,
    },
    price_wrapper: {
        display: 'flex',
        fontSize: '14px',
        lineHeight: '24px',
    },
    price_description: {

    },
    price_price: {

    },
    price_dots: {
        flexGrow: 1,
        borderBottom: "2px dotted #B7B7B7",
    },
    total: {
        marginTop: 8,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 500,
    },
    accept_button: {
        backgroundColor: COLOR.MAIN,
        width: '100%',
        height: 44,
        textTransform: 'initial',
        color: COLOR.WHITE,
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '20px',
        marginTop: 28,

        '&:hover': {
            backgroundColor: COLOR.MAIN_LIGHT,
        }
    },

    address_wrapper: {
        position: 'relative',
    },

    open_map_button: {
        marginTop: 8,

        '& span': {
            fontSize: '14px',
            lineHeight: '24px',
            marginRight: 5,
        }
    },
    map_wrapper_mobile: {
        width: '90%',
        height: '70vh',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: COLOR.WHITE,
        borderRadius: 4,
    },
    map_address_mobile: {
        position: 'absolute',
        bottom: 50,
        left: 10,
        zIndex: 9002,
        display: 'flex',
        width: '90%',
        flexWrap: 'wrap',
    },
    map_input: {
        border: `1px solid ${COLOR.GRAY}`,
        borderRadius: 4,
        width: '100%',
        height: 30,
        marginTop: 8,
        padding: '12px 16px',
        fontSize: '14px',
        backgroundColor: COLOR.WHITE,
    },
    map_buttons: {
        marginTop: 8,
    },
    map_accept_button: {
        backgroundColor: COLOR.MAIN
    },
    map_cancel_button: {
        backgroundColor: COLOR.SECONDARY,
        marginLeft: 10,
    }
})

export default Store
