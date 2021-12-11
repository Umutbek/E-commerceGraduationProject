import {ReactNode} from 'react'
import Button from "@mui/material/Button"
import makeStyles from "@mui/styles/makeStyles"
import {Theme} from "@mui/material"

interface IUButtonProps {
    children: ReactNode | ReactNode[],
    width: string | number,
    height: string | number,
    borderRadius: string | number,
    background: string | number,
    color?: string | number,
    className?: string,
    variant?: 'contained' | 'outlined' | 'text',
    onClick?: () => void,
}

const useStyles = makeStyles<Theme, IUButtonProps>(theme => ({
    root: {
        background: props => props.background,
        width: props => props.width,
        height: props => props.height,
        borderRadius: props => props.borderRadius,
    },
}));

function UButton(props : IUButtonProps) {

    const classes = useStyles(props)

    return (
        <Button className={props.className} classes={{ root: classes.root }} variant={props.variant} onClick={props.onClick}>
            { props.children }
        </Button>
    )
}

export default UButton
