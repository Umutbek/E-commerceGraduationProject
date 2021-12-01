import React from 'react'
import {ORDERING} from "../../../../../enums"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles({
    sorting: {
        display: 'flex',
        // justifyContent: 'space-between'
    },
    sortingHeaderTitle: {
        display: 'inline-block',
        padding: '4px 0'
    },
    sortingList: {
        display: 'flex',
        marginLeft: 12,
    },
    sortingItem: {

        padding: '0 12px',

        '& a': {
            padding: '4px 0 3px',
            cursor: 'pointer',
            display: 'inline-block',
            borderBottom: '1px solid inherit',
        },
        '& a:hover': {
            color: '#0AAD3B',
            borderBottom: '1px solid #0AAD3B'
        }
    },
    sortingItemActive: {
        '& a':{
            color: '#0AAD3B',
            borderBottom: '1px solid #0AAD3B'
        }
    },
})

interface IDesktopSortingProps {
    ordering: string,
    onSelectOrder: (ordering: string) => void
}


function SortingDesktop({ ordering, onSelectOrder }: IDesktopSortingProps) {

    const classes = useStyles()

    return (
        <div className={classes.sorting}>
            <span className={classes.sortingHeaderTitle}>Sort by: </span>
            <ul className={classes.sortingList}>
                <li className={`${classes.sortingItem} ${ordering === ORDERING.views ? classes.sortingItemActive : ''}`}>
                    <a onClick={() => onSelectOrder(ORDERING.views)}>
                        Popularity
                    </a>
                </li>
                <li className={`${classes.sortingItem} ${ordering === ORDERING.price ? classes.sortingItemActive : ''}`}>
                    <a onClick={() => onSelectOrder(ORDERING.price)}>
                        Cost
                    </a>
                </li>
                <li className={`${classes.sortingItem} ${ordering === ORDERING.rating ? classes.sortingItemActive : ''}`}>
                    <a onClick={() => onSelectOrder(ORDERING.rating)}>
                        Rating
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SortingDesktop
