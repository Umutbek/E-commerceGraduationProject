import {ReactNode} from 'react'
import makeStyles from "@mui/styles/makeStyles";

interface IFilterListProps {
    children: ReactNode
}

const useStyles = makeStyles({
    list: {
        padding: '16px 16px'
    }
})

function FilterList({children}: IFilterListProps) {

    const classes = useStyles()

    return (
        <ul className={classes.list}>
            { children }
        </ul>
    )
}

export default FilterList
