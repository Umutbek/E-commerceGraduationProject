import {useRouter} from "next/router"
import makeStyles from "@mui/styles/makeStyles"
import MobileTopNavigation from "../src/components/common/mobile-top-navigation"
import {useSelector} from "react-redux"
import {getScreenType} from "../src/redux/states/settings/getters"
import {BREAKPOINTS, SCREEN_TYPE} from "../src/enums"
import {useContext, useEffect, useState} from "react"
import Spinner, {FullContentSpinner} from "../src/components/common/spinners/spinner";
import OrdersList from "../src/components/pages/orders/orders-list"
import OrdersItem from "../src/components/pages/orders/orders-item"
import ApiContext from "../src/helpers/api/api-context"

function MyOrders() {

    const api = useContext(ApiContext)
    const [isOrdersLoading, setIsOrdersLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const classes = useStyles()
    const router = useRouter()
    const screenType = useSelector(getScreenType)

    const fetchOrders = async () => {

        setIsOrdersLoading(true)
        const { success, data } = await api.getOrders()

        if (success){
            setOrders(data)
        }
        setIsOrdersLoading(false)
    }

    useEffect(() => {
        fetchOrders().then(null)
    }, [])


    return (
        <div className={classes.page}>
            { (screenType === SCREEN_TYPE.MOBILE || screenType === SCREEN_TYPE.MINI_LAPTOP) &&
                <MobileTopNavigation isFixed title={'My orders'} onLeftButtonClick={() => router.back()} rightComponent={null}/>
            }

            <div className="main-container">
                <h1>My orders</h1>
                    {
                        isOrdersLoading ? <FullContentSpinner/> :
                            <OrdersList>
                                { orders.map(order =>
                                    <OrdersItem key={order.id} id={order.id} date={order.date} store={order.storeId} client={order.clientId} cart={order.cart}>{ order.status }</OrdersItem>
                                )}
                            </OrdersList>
                    }
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    page: {
        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            paddingTop: 56
        }
    }
})

export default MyOrders
