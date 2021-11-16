import {makeStyles} from "@material-ui/core/styles"
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import {useState} from "react"

interface IProps {
    rate: number,
    disabled: boolean
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
    rating: {
        cursor: 'pointer',
    }
})

export default function Rating(props: IProps){

    const classes = useStyles()

    const [rate, setRate] = useState(props.rate)

    return (
        <div className={classes.container}>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1
                return (
                    <label key={index}>
                        <input
                            className={classes.radio}
                            type="radio"
                            disabled={props.disabled}
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating)
                                alert(`Are you sure you want to give ${givenRating} stars ?`)
                            }}
                        />
                        <div className={classes.rating}>
                            { givenRating < rate || givenRating === rate ?
                                <StarIcon style={{ color: '#F2C94C' }}/> : <StarBorderIcon style={{ color: '#F2C94C' }}/>
                            }
                        </div>
                    </label>
                )
            })}
        </div>
    )
}

Rating.defaultProps = { rate: 1, disabled: true }
