import makeStyles from '@mui/styles/makeStyles'
import {StarIcon} from '../icons'
import {useCallback, useState} from "react"
import {COLOR} from "../../../enums"

interface IProps {
    rate: number,
    disabled?: boolean,
    className?: string,
    onChange?: (number?: number) => void
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 20
    },
    radio: {
        display: 'none'
    },
})

export default function Rating({ rate = 1, disabled = true, className = '', onChange = () => {} }: IProps){

    const classes = useStyles()

    const [rateNumber, setRateNumber] = useState(rate)

    const handleRateChange = useCallback(number => {
        setRateNumber(number)
        onChange(number)
    }, [])

    return (
        <div className={`${classes.container} ${className}`}>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1
                return (
                    <label key={index}>
                        <input
                            className={classes.radio}
                            type="radio"
                            disabled={disabled}
                            value={givenRating}
                            onClick={() => handleRateChange(givenRating)}
                        />
                        <div className={disabled ? 'cursor-default' : 'cursor-pointer'}>
                            {
                                <StarIcon
                                    color={
                                        givenRating < rateNumber || givenRating === rateNumber ?
                                            COLOR.STAR :
                                            COLOR.GRAY_4
                                    }
                                />
                            }
                        </div>
                    </label>
                )
            })}
        </div>
    )
}
