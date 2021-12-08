import {getIsAuthModalOpen} from "../../../redux/states/settings/getters"
import {useDispatch, useSelector} from "react-redux"
import {closeAuthModal, openAuthModal} from "../../../redux/states/settings/actions"
import AuthContent from "./auth-content"
import Modal from "@mui/material/Modal"

interface IAuthModalProps {
    onClose?: () => void,
    onSuccess?: () => void
}

export default function AuthModal({ onClose = null, onSuccess = () => {} }: IAuthModalProps) {

    const dispatch = useDispatch()

    const open = useSelector(getIsAuthModalOpen)

    const handleOpen = () => dispatch(openAuthModal())

    const handleClose = () => dispatch(closeAuthModal())

    return (
        <Modal open={open} onClose={handleClose}>
            <AuthContent
                open={open}
                onClose={onClose || handleClose}
                onSuccess={onSuccess}
            />
        </Modal>
    )
}

// <AuthContent open={open}/>
