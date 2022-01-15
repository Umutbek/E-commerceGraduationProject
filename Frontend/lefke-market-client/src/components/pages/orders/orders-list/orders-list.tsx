import makeStyles from '@mui/styles/makeStyles'
import {BREAKPOINTS} from "../../../../enums"

interface IProps {
    title?: string,
    children: JSX.Element[] | JSX.Element,
}

const useStyles = makeStyles({
    container: {
        marginTop: '0px',
        paddingTop: 32,
    },
    title: {
        fontSize: '32px',
        fontWeight: 500,

        '@media screen and (max-width: 1360px)': {
            fontSize: '18px',
        }
    },
    list: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '0 4px',
        // flexFlow: 'row wrap',

        '&::after': {
            content: '""',
            flex: 'auto'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            padding: 0,
        }
    }
})

function OrdersList({title = null, children}: IProps){

    const classes = useStyles()

    return (
        <div className={`${classes.container}`}>
            { title && <h2 className={classes.title}>{ title }</h2> }
            <ul className={classes.list}>
                { children }
            </ul>
        </div>
    )
}

export default OrdersList

