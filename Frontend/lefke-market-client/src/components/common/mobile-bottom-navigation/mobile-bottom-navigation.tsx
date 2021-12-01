import {ChangeEvent} from 'react'
import makeStyles from '@mui/styles/makeStyles'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import {useRouter} from "next/router"
import {BasketIcon, HomeIcon, ProfileIcon, StoreIcon} from "../icons"
import {COLOR} from "../../../enums"
import {AppBar} from "@mui/material"
import CollapseOnScroll from "../on-scroll/collapse-on-scroll"

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    bottom_nav_container: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
})

const homeNavRoutes = [
    '/'
]

const storeNavRoutes = [
    '/stores'
]

const cartNavRoutes = [
    '/cart'
]

const profileNavRoutes = [
    '/profile'
]



export default function MobileBottomNavigation() {
    console.log('MOBILE BOTTOM NAVIGATION')
    const classes = useStyles()
    const router = useRouter()

    const val = router.pathname

    const handleChange = (event: ChangeEvent<{}>, newValue: string) => router.push(`${newValue}`)

    return (
        <CollapseOnScroll component={AppBar} threshold={400}>
            <div className={classes.bottom_nav_container}>
                <BottomNavigation value={val} onChange={handleChange} className={classes.root} showLabels color="green">
                    <BottomNavigationAction label="Main" value="/" icon={<HomeIcon color={homeNavRoutes.includes(val) ? COLOR.MAIN : COLOR.GRAY}/>} />
                    <BottomNavigationAction label="Stores" value="/stores" icon={<StoreIcon  color={storeNavRoutes.includes(val) ? COLOR.MAIN : COLOR.GRAY}/>} />
                    <BottomNavigationAction label="Busket" value="/cart" icon={<BasketIcon color={cartNavRoutes.includes(val) ? COLOR.MAIN : COLOR.GRAY} />} />
                    <BottomNavigationAction label="Profile" value="/profile" icon={<ProfileIcon color={profileNavRoutes.includes(val) ? COLOR.MAIN : COLOR.GRAY} />} />
                </BottomNavigation>
            </div>
        </CollapseOnScroll>
    )
}
