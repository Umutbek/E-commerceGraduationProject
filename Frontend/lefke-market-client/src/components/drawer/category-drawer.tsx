import {Button, SwipeableDrawer} from "@material-ui/core"
import {useCallback, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {closeCategoryDrawer} from "../../redux/states/settings/actions"
import {makeStyles} from "@material-ui/core/styles"
import ClearIcon from '@material-ui/icons/Clear'


const useStyles = makeStyles({
    drawer: {
        width: 324,
        padding: '40px 24px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 500,
        margin: 0
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20
    }
})

export default function CategoryDrawer(){

    const dispatch = useDispatch()

    const classes = useStyles()

    // @ts-ignore
    const isOpen = useSelector(state => state.settings.isCategoryDrawerOpen)

    const [isCategoryL2Open, setIsCategoryL2Open] = useState(false)
    const [isCategoryL3Open, setIsCategoryL3Open] = useState(false)

    const [categoriesL1, setCategoriesL1] = useState([])
    const [categoriesL2, setCategoriesL2] = useState([])
    const [categoriesL3, setCategoriesL3] = useState([])

    const [selectedCategoryL1, setSelectedCategoryL1] = useState(null)
    const [selectedCategoryL2, setSelectedCategoryL2] = useState(null)
    const [selectedCategoryL3, setSelectedCategoryL3] = useState(null)

    const closeDrawer = useCallback(() => {
        dispatch(closeCategoryDrawer())
    }, [dispatch])

    return <>
        <SwipeableDrawer
            anchor={'left'}
            open={isOpen}
            onClose={closeDrawer}
            onOpen={(params) => console.log('on open drawer: ', params)}
        >
            <Button onClick={closeDrawer} className={classes.closeBtn}>
                <ClearIcon fontSize={'large'}/>
            </Button>
            <div className={classes.drawer}>
                <h3 className={classes.title}>Каталог</h3>
            </div>
            <ul>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
                <li>text</li>
            </ul>
        </SwipeableDrawer>
    </>
}
