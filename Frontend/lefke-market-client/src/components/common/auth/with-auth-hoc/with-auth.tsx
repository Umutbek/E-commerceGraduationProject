import {useSelector} from "react-redux"
import {getIsAuth} from "../../../../redux/states/auth/getters"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"


const withAuth = (Component: any) => {
    const Auth = (props: any) => {
        // Login data added to props via redux-store (or use react context for example)
        const isAuth = useSelector(getIsAuth)
        const router = useRouter()
        const [isInit, setIsInit] = useState(false)

        // If user is not logged in, return login component

        useEffect(() => {
            if (!isAuth) {
                router.push('/login').then(null)
            } else {
                setIsInit(true)
            }
        }, [isAuth])

        // If user is logged in, return original component
        return (<>
            { isInit ? <Component {...props} /> : null }
        </>)
    }

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth
}

export default withAuth
