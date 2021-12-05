import { useState } from 'react'
import makeStyles from "@mui/styles/makeStyles"
import {COLOR} from "../../../enums"
import clsx from "clsx"
// @ts-ignore
import SwipeableViews from 'react-swipeable-views'
import ProductDetailsInfoTab from "./product-details-info-tab"
import ProductDetailsFeedbacksTab from "./product-details-feedbacks-tab"

const useStyles = makeStyles({
    content: {
        maxWidth: 860,
        width: '100%',
    },
    line: {
        margin: 0,
        padding: 0,
    },
    tabNameList: {

    },
    tabNameItem: {
        display: 'inline-block',
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 500,
        paddingBottom: 9,
        marginRight: 40,
    },
    active: {
        borderBottom: `3px solid ${COLOR.MAIN}`
    }
})

interface IProductDetailsBottomTabs {
    product: any
}

function ProductDetailsBottomTabs({product}: IProductDetailsBottomTabs) {

    const classes = useStyles()

    const [index, setIndex] = useState(0)

    const handleChangeIndex = (index: number) => setIndex(index)

    return (
        <div className={classes.content}>
            <div className={classes.tabNameList}>
                <button
                    className={clsx('reset-button cursor-pointer', classes.tabNameItem, index === 0 ? classes.active : '')}
                    onClick={() => setIndex(0)}
                >
                    Information
                </button>
                <button
                    className={clsx('reset-button cursor-pointer', classes.tabNameItem,  index === 1 ? classes.active : '')}
                    onClick={() => setIndex(1)}
                >
                    Reviews (0)
                </button>
            </div>
            <hr className={classes.line}/>

            <SwipeableViews style={{ alignItems: 'baseline' }} index={index} onChangeIndex={handleChangeIndex}>
                <ProductDetailsInfoTab description={product.description}/>
                <ProductDetailsFeedbacksTab product={product}/>
            </SwipeableViews>
        </div>
    )
}

export default ProductDetailsBottomTabs
