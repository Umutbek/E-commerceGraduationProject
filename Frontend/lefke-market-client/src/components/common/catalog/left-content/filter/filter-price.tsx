import React from 'react'
import Som from "../../../../../../public/icons/som.svg"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles({
    price: {
        display: 'flex',
    },
    input_wrapper: {
        width: '50%',
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: '8px 26px 8px 16px',
        border: '1px solid #BDBDBD',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',

        '&:focus': {
            border: '1px solid #BDBDBD',
            outline: 'none',
        },
    },
    input_left: {
        borderRadius: '4px 0 0 4px',
        borderRightWidth: '0.5px'
    },
    input_right: {
        borderRadius: '0 4px 4px 0',
        borderLeftWidth: '0.5px'
    },
    som: {
        position: 'absolute',
        top: '12px',
        right: '11px',
        width: 16,
        height: 16
    }
})

interface IFilterListProps {
    costInterval: any,
    setCostInterval: (arg: any) => void
}

function FilterPrice({costInterval, setCostInterval}: IFilterListProps) {

    const classes = useStyles()

    return (<>
            <div className={classes.price}>
                <div className={classes.input_wrapper}>
                    <span className={classes.som}>
                        <Som/>
                    </span>
                    <input
                        type="number"
                        placeholder="From"
                        value={costInterval.min_cost}
                        className={`${classes.input} ${classes.input_left}`}
                        onChange={(e) =>
                            setCostInterval((oldVal: any) => ({...oldVal, min_cost: e.target.value}))}
                    />
                </div>
                <div className={classes.input_wrapper}>
                    <span className={classes.som}>
                        <Som/>
                    </span>
                    <input
                        type="number"
                        placeholder="To"
                        value={costInterval.max_cost}
                        className={`${classes.input} ${classes.input_right}`}
                        onChange={(e) =>
                            setCostInterval((oldVal: any) => ({...oldVal, max_cost: e.target.value}))}
                    />
                </div>
            </div>
        </>
    )
}

export default FilterPrice
