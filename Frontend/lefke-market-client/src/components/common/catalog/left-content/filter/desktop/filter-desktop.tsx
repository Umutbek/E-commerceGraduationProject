import makeStyles from "@mui/styles/makeStyles"
import {COLOR} from "../../../../../../enums"
import FilterPrice from "../filter-price"
import FilterList from "../filter-list"
import FilterItem from "../filter-item"

interface IFilterDesktopProps {
    costInterval: any,
    setCostInterval: any
}

function FilterDesktop ({ costInterval, setCostInterval }: IFilterDesktopProps) {

    const classes = useStyles()

    return (
        <div className={classes.filter}>
            <span className={classes.title}>
                Filter
            </span>
            <div className={classes.line}/>
            <FilterList>
                <FilterItem title={'Cost'}>
                    <FilterPrice costInterval={costInterval} setCostInterval={setCostInterval}/>
                </FilterItem>
            </FilterList>
        </div>
    )
}


const useStyles = makeStyles({
    filter: {
        marginTop: 24,
        border: `1px solid ${COLOR.GRAY}`,
        borderRadius: 4,
    },
    title: {
        display: 'inline-block',
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: 500,
    },
    line: {
        margin: 0,
        padding: 0,
        height: 1,
        backgroundColor: '#C4C4C4'
    }
})

export default FilterDesktop
