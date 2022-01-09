import makeStyles from "@mui/styles/makeStyles"
import {BREAKPOINTS} from "../src/enums"
import CartContent from "../src/components/pages/cart/cart-content"

const useStyles = makeStyles({
    page: {
        minHeight: '80vh',
        paddingTop: 0,

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            // paddingTop: 110,
        }
    },
    title: {

    },
    emptyBasket: {
        width: 200,
        margin: '360px auto 0',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            margin: '160px auto 0',
        }
    },
    loginBtn: {
        marginTop: 16,
    }
})

function Cart() {

    const classes = useStyles()

    return (
        <div className={classes.page}>
            <CartContent/>
        </div>
    )
}

export default Cart
