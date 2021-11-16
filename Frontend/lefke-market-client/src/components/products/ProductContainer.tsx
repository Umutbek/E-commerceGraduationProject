import {makeStyles} from "@material-ui/core/styles"

interface IProps {
    children: JSX.Element[] | JSX.Element,
    title: string | JSX.Element,
    style: object,
    className: string,
    titleStyle: object,
    titleClassName: string
}

const useStyles = makeStyles({
    container: {
        marginTop: '80px',

        '@media screen and (max-width: 1360px)': {
            marginTop: 40
        },

        '@media screen and (max-width: 768px)': {
            marginTop: 30
        }
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    }
})

export default function ProductContainer(props: IProps){

    const classes = useStyles()

    return (
        <div style={{ ...props.style }} className={`${classes.container} ${props.className}`}>
            <h2 className={classes.title}>{ props.title }</h2>
            <ul className={classes.list}>
                { props.children }
            </ul>
        </div>
    )
}

ProductContainer.defaultProps = {
    title: '',
    className: '',
    style: {},
    titleClassName: '',
    titleStyle: {},
}
