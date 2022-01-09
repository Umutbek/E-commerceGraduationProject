import makeStyles from "@mui/styles/makeStyles"
import Modal from "@mui/material/Modal"
import CartContent from "../cart-content"
import {useDispatch, useSelector} from "react-redux"
import {getIsCartModalOpen} from "../../../../redux/states/settings/getters"
import {closeCartModal} from "../../../../redux/states/settings/actions"

const useStyles = makeStyles({
    modal_content: {
        width: 438,
        backgroundColor: '#fff',
        position: 'absolute' as 'absolute',
        top: 0,
        right: 0,
    },
})

function CartModal() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isCartModalOpen = useSelector(getIsCartModalOpen)

    const handleClose = () => dispatch(closeCartModal())

    return (
        <Modal style={{ overflow: "auto" }} disableAutoFocus disableEnforceFocus open={isCartModalOpen} onClose={handleClose}>
            <div className={classes.modal_content}>
                <CartContent/>
            </div>
        </Modal>
    )
}

export default CartModal
