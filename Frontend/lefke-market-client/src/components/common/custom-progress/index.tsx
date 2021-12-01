import CircularProgress from '@mui/material/CircularProgress'

interface ICustomCircularProgress {
    color?: string
}

export const CustomCircularProgress = ({color = 'inherit'}: ICustomCircularProgress) =>
    <CircularProgress style={{ color }}/>
