import makeStyles from "@mui/styles/makeStyles"
import {ReactNode} from "react"

const useStyles = makeStyles({
    item: {
        marginTop: 8,
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '24px',

        '&:nth-child(1)': {
            marginTop: 0,
        }
    },
    title: {
        fontSize: '14px',
        fontWeight: 500,
    }
})

interface IFilterItemProps {
    title: string,
    children: ReactNode[] | ReactNode
}

function FilterItem({ title, children  }: IFilterItemProps) {

    const classes = useStyles()

    return (
        <li className={classes.item}>
            <div className={`${classes.title}`}>
                { title }
            </div>
            { children }
        </li>
    )
}

export default FilterItem
