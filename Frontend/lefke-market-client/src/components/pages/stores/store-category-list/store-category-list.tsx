import {ReactNode} from 'react'
import makeStyles from "@mui/styles/makeStyles";

interface IStoreListProps {
    children: ReactNode | ReactNode[]
}

const useStyles = makeStyles({
    list: {
        display: 'flex',
        justifyContent: 'space-between',
        flexFlow: 'row wrap',
        gap: '20px',

        '&::after': {
            content: '""',
            flex: 'auto'
        }
    }
})

function StoreCategoryList({ children }: IStoreListProps) {

    const classes = useStyles()

    return (
        <ul className={classes.list}>
            { children }
        </ul>
    )
}

export default StoreCategoryList
