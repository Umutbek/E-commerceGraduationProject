import makeStyles from "@mui/styles/makeStyles"
import {useRouter} from "next/router"
import AuthModal from "../src/components/common/auth/auth-modal"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {openAuthModal} from "../src/redux/states/settings/actions"

const useStyles = makeStyles({
    loginPage: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

})

function LoginPage() {
    const classes = useStyles()
    const router = useRouter()
    const dispatch = useDispatch()

    const returnUrl = router.query.returnUrl

    const returnToPage = () => {
        if (returnUrl && typeof returnUrl === 'string'){
            router.push(returnUrl)
        } else {
            router.back()
        }
    }

    const toMain = () => {
        router.push('/')
    }

    useEffect(() => {
        dispatch(openAuthModal())
    }, [])

    return (
        <div className={classes.loginPage}>
            <AuthModal
                onSuccess={returnToPage}
                onClose={toMain}
            />
        </div>
    )
}

export default LoginPage
