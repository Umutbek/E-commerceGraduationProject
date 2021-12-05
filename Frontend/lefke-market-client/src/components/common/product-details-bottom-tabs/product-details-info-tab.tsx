import React from 'react'
import makeStyles from "@mui/styles/makeStyles"
import {BREAKPOINTS} from "../../../enums"


const useStyles = makeStyles({
    content: { marginTop: 32 },
    row: {
        display: 'flex',
        fontSize: '16px',
        lineHeight: '24px',
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    leftCol: {
        width: '25%',
        fontWeight: 500,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
        }
    },
    rightCol: {
        width: '75%',
        fontWeight: 400,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            marginTop: 16
        }
    }
})

interface IProductDetailsInfoTab {
    description: string
}

function ProductDetailsInfoTab({ description }: IProductDetailsInfoTab) {

    const classes = useStyles()

    return (
        <div className={classes.content}>

            <div className={classes.row}>
                <div className={classes.leftCol}>
                    Description
                </div>
                <div className={classes.rightCol}>
                    { description }
                </div>
            </div>

        </div>
    )
}

export default ProductDetailsInfoTab
