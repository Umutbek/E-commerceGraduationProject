import {Card, CardContent, Checkbox, FormControlLabel, FormGroup, Hidden} from "@mui/material"
import clsx from "clsx"
import React, {useState, useEffect, useContext, ChangeEvent, useCallback, FormEvent} from "react"
import { Theme } from "@mui/material/styles"
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import Button from "@mui/material/Button"
import ApiContext from "../../../helpers/api/api-context"
import {useDispatch} from "react-redux"
import {loginSuccess} from "../../../redux/states/auth/actions"
import {closeAuthModal} from "../../../redux/states/settings/actions"
import {CustomCircularProgress} from "../custom-progress"
import {BREAKPOINTS, COLOR} from "../../../enums"
import MobileTopNavigation from "../mobile-top-navigation"
import {useRouter} from "next/router"
import PhoneInput from "react-phone-input-2"
import Modal from "@mui/material/Modal"


const TAB = {
    LOGIN: { ID: 1, HEIGHT: '400px', TITLE: 'Login' },
    REGISTRATION: { ID: 2, HEIGHT: '650px', TITLE: 'Registration' },
    SMS_CHECK: { ID: 3, HEIGHT: '300px', TITLE: 'Код подтверждения' }
}

interface IAuthContentProps {
    open: boolean | null,
    onSuccess?: () => void,
    onClose: () => void,
}


export default function AuthContent({ open, onSuccess, onClose }: IAuthContentProps){

    const classes = useStyles()
    const api = useContext(ApiContext)
    const dispatch = useDispatch()
    const router = useRouter()

    const [tab, setTab] = useState(TAB.LOGIN)
    const [returnTab, setReturnTab] = useState(TAB.LOGIN)

    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [isRegistrationLoading, setIsRegistrationLoading] = useState(false)
    const [isVerificationLoading, setIsVerificationLoading] = useState(false)

    const [phone, setPhone] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [agreed, setAgreed] = useState(false)
    const [inputCode, setInputCode] = useState<string>('')
    const [serverCode, setServerCode] = useState<string>('')
    const [confirmPass, setConfirmPassword] = useState<string>('')

    const [errors, setErrors] = useState({
        phone: null,
        code: null,
        confirm: null,
        loginErrorMessage: null,
        verificationErrorMessage: null,
        registrationErrorMessage: null,
    })

    useEffect(() => {
        if (inputCode.length && serverCode.length && inputCode === serverCode){
            handleVerificationClick().then(null)
            return
        }
    }, [inputCode, serverCode])


    const onTabChange = (tab: any) => {
        setErrors(old => ({ ...old, phone: null }))
        setPhone('')
        setTab(tab)
    }

    const handlePhoneChange = (val: string) => {
        setErrors(old => ({ ...old, phone: null }))
        setPhone(val)
    }

    const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputStr = e.target.value
        setErrors(old => ({ ...old, code: null }))
        setInputCode(inputStr)
    }

    const handleConfPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputConfirm = e.target.value
        setErrors(old => ({ ...old, confirm: null }))
        setConfirmPassword(inputConfirm)
    }

    const handleFullNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value), [])
    const handleAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value), [])

    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsRegistrationLoading(true)

        // inputs validation
        if (phone.length !== 12){
            setErrors(old => ({ ...old, phone: 'Invalid phone number' }))
            setIsRegistrationLoading(false)
            return
        }

        if (confirmPass !== inputCode){
            setErrors(old => ({ ...old, confirm: 'Passwords do not match' }))
            setIsRegistrationLoading(false)
            return
        }

        const { success, data } = await api.register(phone, fullName, address, inputCode)


        if (success){
            setReturnTab(TAB.REGISTRATION)
            setTab(TAB.LOGIN)
        } else {
            setErrors(old => ({ ...old, registrationErrorMessage: data.message }))
        }

        setIsRegistrationLoading(false)
    }

    const handleVerificationClick = async () => {
        setIsVerificationLoading(true)

        if (phone.length !== 12){
            setErrors(old => ({ ...old, phone: 'Invalid phone number' }))
            setIsRegistrationLoading(false)
            return
        }

        const { success, data } = await api.verifyCode(phone, inputCode)


        if (success) {
            dispatch(loginSuccess(data))
            dispatch(closeAuthModal())
            onSuccess()
        } else {
            setErrors(old => ({ ...old, code: data.detail, verificationErrorMessage: data.message }))
        }
        setIsVerificationLoading(false)
    }



    const clearErrors = useCallback(() => {

    }, [])

    const loginInputsTabIndex = tab.ID === TAB.LOGIN.ID ? 0 : -1
    const registrationInputsTabIndex = tab.ID === TAB.REGISTRATION.ID ? 0 : -1

    return <>
        <div className={classes.modal_content}>
            <div className={classes.authWrapper}>
                <Card className={classes.card} style={{ minHeight: tab.HEIGHT }}>
                    <CardContent className={classes.cardContent}>
                        {
                            <div className={classes.tab}>

                                <div className={classes.tabs}>
                                    <Button
                                        variant="text"
                                        className={clsx(classes.tabButton, tab.ID === TAB.LOGIN.ID ? classes.tabButtonActive : '')}
                                        onClick={() => onTabChange(TAB.LOGIN)}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="text"
                                        className={clsx(classes.tabButton, tab.ID === TAB.REGISTRATION.ID ? classes.tabButtonActive : '')}
                                        onClick={() => onTabChange(TAB.REGISTRATION)}
                                    >
                                        Registration
                                    </Button>
                                </div>

                                <div className={classes.tabPanels}>

                                    <section className={clsx(classes.tabPanel, tab.ID === TAB.LOGIN.ID ? classes.showPanel : classes.hidePanelLeft)}>
                                        <div className={classes.tabContent}>
                                            <h4 className={classes.formTitle}>
                                                To follow the history of purchases, you need an Authorization
                                            </h4>
                                            <div className={classes.formControl}>
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
                                                { errors.phone && <span className={classes.inputErrorText}>{errors.phone}</span> }
                                            </div>

                                            <div className={classes.formControl}>
                                                <input
                                                    tabIndex={registrationInputsTabIndex}
                                                    className={clsx(classes.textInput, errors.code ? classes.inputErrorBorder : '')}
                                                    placeholder="Password"
                                                    type="password"
                                                    value={inputCode}
                                                    onChange={handleCodeChange}
                                                />
                                                {errors.code && <span className={classes.inputErrorText}>{ errors.code }</span>}
                                            </div>
                                            <Button
                                                variant="contained"
                                                classes={{ root: clsx(classes.btn, classes.greenBtn) }}
                                                onClick={handleVerificationClick}
                                            >
                                                { isVerificationLoading ? <CustomCircularProgress/> : 'Login' }
                                            </Button>
                                        </div>
                                    </section>

                                    <section className={clsx(classes.tabPanel, tab.ID === TAB.REGISTRATION.ID ? classes.showPanel : classes.hidePanelRight)}>
                                        <form className={classes.tabContent} onSubmit={handleRegisterSubmit}>
                                            <h4 className={classes.formTitle}>
                                                To follow the history of purchases, you need an Authorization
                                            </h4>

                                            <div className={classes.formControl}>
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
                                                { errors.phone && <span className={classes.inputErrorText}>{errors.phone}</span> }
                                            </div>

                                            <div className={classes.formControl}>
                                                <input
                                                    tabIndex={registrationInputsTabIndex}
                                                    className={classes.textInput}
                                                    placeholder="Full name"
                                                    type="text"
                                                    value={fullName}
                                                    onChange={handleFullNameChange}
                                                    required
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <input
                                                    tabIndex={registrationInputsTabIndex}
                                                    className={classes.textInput}
                                                    placeholder="Address"
                                                    type="text"
                                                    value={address}
                                                    onChange={handleAddressChange}
                                                    required
                                                />
                                            </div>

                                            <div className={classes.formControl}>
                                                <input
                                                    tabIndex={registrationInputsTabIndex}
                                                    className={clsx(classes.textInput, errors.code ? classes.inputErrorBorder : '')}
                                                    placeholder="Password"
                                                    type="password"
                                                    value={inputCode}
                                                    onChange={handleCodeChange}
                                                />
                                                {errors.code && <span className={classes.inputErrorText}>{ errors.code }</span>}
                                            </div>

                                            <div className={classes.formControl}>
                                                <input
                                                    tabIndex={registrationInputsTabIndex}
                                                    className={clsx(classes.textInput, errors.confirm ? classes.inputErrorBorder : '')}
                                                    placeholder="Confirm password"
                                                    type="password"
                                                    value={confirmPass}
                                                    onChange={handleConfPasswordChange}
                                                    required
                                                />
                                                {errors.confirm && <span className={classes.inputErrorText}>{ errors.confirm }</span>}
                                            </div>

                                            <Button
                                                tabIndex={registrationInputsTabIndex}
                                                variant="outlined"
                                                classes={{ root: clsx(classes.btn, classes.greenBtn) }}
                                                type="submit"
                                            >
                                                { isRegistrationLoading ? <CustomCircularProgress/> : 'Register' }
                                            </Button>
                                        </form>
                                    </section>
                                </div>
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal_content: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,


            [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
                width: '100%',
                height: '100%',
            },
        },
        authWrapper: {
            width: 424,
            height: 720,

            [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
                height: '100%',
                width: '100%',
            }
        },
        card: {
            margin: '0 auto',
            width: 424,
            padding: '40px 32px 32px 32px',
            borderRadius: '0 0 4px 4px',

            [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
                height: '100%',
                width: '100%',
                padding: '40px 16px 32px 16px',
                borderRadius: 0,
            }
        },
        cardContent: {
            padding: 0,
        },
        tab: { width: '100%' },
        tabs: {
            display: 'flex',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '24px',
        },
        tabButton: {
            textTransform: 'initial',
            paddingBottom: 4,
            borderBottom: '4px solid #fff',
            marginRight: 24,
            transition: 'border 0.3s ease-in-out',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 500,
            color: COLOR.BLACK,
        },
        tabButtonActive: { borderBottom: '4px solid #0AAD3B'},
        tabPanels: { position: 'relative' },
        tabPanel: {

            width: '100%',
            position: 'absolute',
            top: 0,
            transition: 'all 0.3s ease-in-out'
        },
        showPanel: { left: 0, },
        hidePanelRight: { left: 'calc(100% + 64px)' },
        hidePanelLeft: { left: 'calc(-100% - 64px)' },

        tabContent: {

        },
        formTitle: {
            marginTop: 16,
            fontSize: '14px',
            color: '#828282',
            fontWeight: 'inherit',
        },
        formControl: {
            position: 'relative',
            marginTop: 16,
            fontSize: '16px',
            color: '#000',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        phone_input_container: {
            width: '100%',
            fontSize: '14px',
            fontWeight: 'inherit',
            lineHeight: '24px',
            color: 'inherit',
            fontStyle: 'inherit',
            fontFamily: 'inherit',
            borderRadius: 8,

            '& input': {
                border: `1px solid ${COLOR.GRAY}`,
            },

            '& input:focus': {
                border: `1px solid ${COLOR.MAIN}`
            }
        },
        phoneInputLabel: {
            position: 'absolute',
            padding: '12px 0 12px 44px',
            backgroundImage: `url(icons/ky_flag.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '16px 50%',
            backgroundSize: '24px 24px',
        },
        textInput: {
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #BDBDBD',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 400,
            color: 'inherit',
            fontStyle: 'inherit',
            fontFamily: 'inherit',

            '&:focus': {
                outline: 'none',
                border: `1px solid ${COLOR.MAIN}`
            }
        },
        inputErrorText: {
          fontSize: '12px',
          color: 'red'
        },
        inputErrorBorder: { borderColor: 'red' },
        error_text: {
            display: 'block',
            fontSize: '14px',
            color: 'red',
            marginTop: 8,
            textAlign: 'center',
        },
        btn: {
            width: '100%',
            height: 48,
            marginTop: 24,
            textTransform: 'initial',
            fontSize: '16px',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        whiteBtn: {
            border: '1px solid #0AAD3B',
            background: '#FFFFFF',
            color: '#0AAD3B',
        },
        greenBtn: {
            background: '#0AAD3B',
            color: '#FFFFFF',

            '&:hover': {
                background: '#08882f',
            }
        },
        backBtn: {
            backgroundColor: 'inherit',
            width: 30,
            marginLeft: '-26px',
            height: 48,

            '&:hover': {
              backgroundColor: '#dadbdc',
            }
        },


        agreement: { marginTop: 24 },
        agreementCheckbox: { marginTop: -35 },
        agreementText: {
            fontSize: '12px',
            fontWeight: 400,

            '& a': { color: '#0AAD3B' }
        },
        smsCheckTop: {
            display: 'flex',
            alignItems: 'center',


            [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
                display: 'none',
            }
        },

        smsCheckMessage: {
            margin: '16px 0 20px',
            textAlign: 'center',
        },

        mobileHeader: {
            padding: '16px 8px',
            background: '#F3F4F7',
            display: 'none',
            justifyContent: 'space-between',
            alignItems: 'center',

            [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
                display: 'flex'
            }
        },
        mobileBtn: {
            background: 'inherit',
            boxShadow: 'none',
        },


    //    map

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

    }),
)
