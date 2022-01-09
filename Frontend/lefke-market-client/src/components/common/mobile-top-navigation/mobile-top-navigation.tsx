import {ReactNode, MouseEvent} from 'react'
import makeStyles from "@mui/styles/makeStyles"
import {IconButton} from "@mui/material"
import {ArrowPrevIcon, CrossIcon} from "../icons"
import {COLOR, SCREEN_TYPE, Z_INDEX_LAYER} from "../../../enums"
import {useRouter} from "next/router"
import {useSelector} from "react-redux"
import {getScreenType} from "../../../redux/states/settings/getters"

const useStyles = makeStyles({
    navigation: {
        width: '100%',
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR.GRAY_5,
        padding: '0 8px',
    },
    left: {
        width: 100
    },
    right: {
        width: 100,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    center: {
        textAlign: 'center'
    }
})

interface IMobileTopNavigation {
    leftComponent?: ReactNode | string,
    rightComponent?: ReactNode | string,
    title: ReactNode | string,
    titleSize?: string,
    titleWeight?: number,
    onLeftButtonClick?: (e: MouseEvent) => void | null,
    onRightButtonClick?: (e: MouseEvent) => void | null,
    isFixed?: boolean,
}

const LeftComp = <ArrowPrevIcon width={24} height={24} color={COLOR.SECONDARY}/>
const RightComp = <CrossIcon/>

const fixedStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: Z_INDEX_LAYER.MOBILE_TOP_NAVIGATION,
}

function MobileTopNavigation(
    {
        leftComponent = LeftComp,
        rightComponent = RightComp,
        title = '',
        titleSize = '20px',
        titleWeight = 500,
        onLeftButtonClick = () => {},
        onRightButtonClick = () => {},
        isFixed = false,
    }: IMobileTopNavigation) {

    const classes = useStyles()
    const router = useRouter()
    const screenType = useSelector(getScreenType)

    const handleLeftButtonClick = (e: MouseEvent) => {
        if (onLeftButtonClick && typeof onLeftButtonClick === 'function'){
            onLeftButtonClick(e)
        } else {
            router.back()
        }
    }

    const handleRightButtonClick = (e: MouseEvent) => onRightButtonClick(e)

    const navStyle = isFixed ? fixedStyle : {}

    if (screenType === SCREEN_TYPE.DESKTOP) {
        return null
    }

    return (
        <div className={classes.navigation} style={{ ...navStyle }}>
            <div className={classes.left}>
                <IconButton onClick={handleLeftButtonClick}>
                    { leftComponent }
                </IconButton>
            </div>
            <h3 className={classes.center} style={{ fontSize: titleSize, fontWeight: titleWeight }}>
                { title }
            </h3>
            <div className={classes.right}>
                <IconButton onClick={handleRightButtonClick}>
                    { rightComponent }
                </IconButton>
            </div>
        </div>
    )
}

export default MobileTopNavigation
