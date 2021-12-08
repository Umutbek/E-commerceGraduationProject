import {useState} from 'react'
import Button from "@mui/material/Button"
import {CartIcon, FavoriteIcon, LogoutIcon, SettingsIcon} from "../icons"
import {COLOR} from "../../../enums"
import Modal from "@mui/material/Modal"
import {useRouter} from "next/router"
import {logout} from "../../../redux/states/auth/actions"
import makeStyles from "@mui/styles/makeStyles"
import {useDispatch} from "react-redux"

function ProfileContent() {

    const classes = useStyles()
    const router = useRouter()
    const dispatch = useDispatch()

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const openLogoutModal = () => setIsLogoutModalOpen(true)
    const closeLogoutModal = () => setIsLogoutModalOpen(false)

    const handleLogout = () => {
        closeLogoutModal()
        dispatch(logout())
        router.push('/')
    }

    return (
        <>
            <div className={classes.profile}>
                <ul className={classes.list}>
                    <li className={classes.item}>
                        <Button variant="text" classes={{ root: classes.button }} onClick={() => router.push('/favorites')}>
                            <FavoriteIcon width={32} height={32} color={COLOR.BLACK}/>
                            <span className={classes.text}>
                            Favourites
                        </span>
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button variant="text" classes={{ root: classes.button }} onClick={() => router.push('/my-orders')}>
                            <CartIcon width={32} height={32} color={COLOR.BLACK}/>
                            <span className={classes.text}>
                            My Orders
                        </span>
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button variant="text" classes={{ root: classes.button }} onClick={() => router.push('/#')}>
                            <SettingsIcon width={32} height={32} color={COLOR.BLACK}/>
                            <span className={classes.text}>
                            Settings
                        </span>
                        </Button>
                    </li>
                    <li className={classes.item}>
                        <Button variant="text" classes={{ root: classes.button }} onClick={openLogoutModal}>
                            <LogoutIcon width={32} height={32} color={COLOR.BLACK}/>
                            <span className={classes.text}>
                            Logout
                        </span>
                        </Button>
                    </li>
                </ul>
            </div>
            <Modal open={isLogoutModalOpen} onClose={closeLogoutModal}>
                <div className={classes.modal_content}>
                    <p className={classes.modal_title}>
                        Are you sure you want to log out?
                    </p>
                    <div className={classes.modal_actions}>
                        <Button variant="outlined" className={classes.modal_agree_btn} onClick={handleLogout}>
                            Yes
                        </Button>
                        <Button variant="contained" className={classes.modal_cancel_btn} onClick={closeLogoutModal}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const useStyles = makeStyles({
    profile: {
        width: '100%',
        height: '100%',
    },
    list: {
        padding: 10
    },
    item: {
        marginBottom: 16,
    },
    button: {
        height: 40,
        width: '100%',
        padding: '0 8px',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: '16',
        color: COLOR.BLACK,
        marginLeft: 16
    },
    modal_content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        backgroundColor: COLOR.WHITE,
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)',
        borderRadius: 8,
        padding: '24px 12px'
    },
    modal_title: {
        fontSize: 18,
    },
    modal_actions: {
        marginTop: 16,
        display: 'flex',
    },
    modal_agree_btn: {

    },
    modal_cancel_btn: {
        marginLeft: 24
    }
})

export default ProfileContent
