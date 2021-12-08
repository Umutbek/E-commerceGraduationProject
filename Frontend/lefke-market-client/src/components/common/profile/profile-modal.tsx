import React from 'react'
import makeStyles from "@mui/styles/makeStyles"
import ProfileContent from "./profile-content"

const useStyles = makeStyles({
    profile_modal: {
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: 10000,

        backgroundColor: '#fff',
        width: 200,
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.12)',
        borderRadius: 4,
        transition: 'opacity .2s ease-in-out',
        zIndex: -1000,
        opacity: 0,
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    active: {
        zIndex: 1000,
        opacity: 1,
        left: 'calc(-40%)',
    },
})

interface IProfileModalProps {
    isOpen: boolean,
    onClose: () => void,
}

function ProfileModal({isOpen, onClose}: IProfileModalProps) {

    const classes = useStyles()

    return (
        <>
            <div className={`${classes.profile_modal} ${isOpen ? classes.active : ''}`} onClick={e => e.stopPropagation()}>
                <ProfileContent/>
            </div>
            {
                isOpen ? <div className={classes.backdrop} onClick={onClose}/> : null
            }
        </>
    )
}

export default ProfileModal
