import {useCallback, useContext, useEffect, useState} from 'react'
import Image from "next/image"
import makeStyles from "@mui/styles/makeStyles"
import {COLOR, SCREEN_TYPE} from "../../../enums"
import Rating from "../rating"
import Button from "@mui/material/Button"
import {useDispatch, useSelector} from "react-redux"
import {getScreenType} from "../../../redux/states/settings/getters"
import {BREAKPOINTS} from "../../../enums"
import ApiContext from "../../../helpers/api/api-context"
import { getDateFromNow } from '../../../helpers/date'
import {CustomCircularProgress} from "../custom-progress";

const useStyles = makeStyles({
    content: {
        marginTop: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexWrap: 'wrap',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            alignItems: 'baseline',
        }
    },
    leave: {
        width: '33%',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLOR.GRAY_2,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            marginTop: 14,
        }
    },
    feedbacks: {
        width: '61%',
        borderRadius: 4,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            marginTop: 32,
        }
    },
    openLeaveButton: {
        display: 'none',
        width: '100%',
        height: '32px',

        color: COLOR.MAIN,
        border: `1px solid ${COLOR.MAIN}`,

        '&:hover': {
            border: `1px solid ${COLOR.MAIN}`,
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            display: 'block'
        }
    },
    leaveTitle: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 500,
    },
    leaveSubTitle: {
        fontSize: '14px',
        lineHeight: '18px',
        color: COLOR.SECONDARY,
    },
    leaveRating: {
        marginTop: 16,
    },
    leaveTextarea: {
        margin: '20px 0 0 0',
        fontFamily: 'inherit',
        width: '100%',
        height: 120,
        padding: 12,
        resize: 'none',
        border: `1px solid ${COLOR.GRAY}`,
        fontSize: '14px',
        lineHeight: '18px',

        '&:focus': {
            border: `1px solid ${COLOR.MAIN}`,
            outline: `1px solid ${COLOR.MAIN}`,
        }
    },
    leaveButton: {
        marginTop: 16,
        width: '100%',
        height: 40,
        backgroundColor: COLOR.MAIN,
        color: COLOR.WHITE,
        textTransform: 'initial',
        fontSize: '16px',
        lineHeight: '24px',

        '&:hover': { backgroundColor: COLOR.MAIN_LIGHT }
    },

    card: {

    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    name: { marginLeft: 8 },
    rating: { marginLeft: 40 },
    date: {
        marginLeft: 'auto',
        fontSize: '14px',
        color: COLOR.GRAY_3,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: '100%',
            marginTop: 8,
        }
    },
    cardBody: {
        marginTop: 16,
        fontSize: '16px',
        lineHeight: '20px',
    },
    line: {
        margin: '16px 0 24px',
        color: COLOR.GRAY
    },

    noFeedbacksText: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: COLOR.SECONDARY,
        fontSize: '16px',
        lineHeight: '24px',
    }
})

interface IProductDetailsFeedbacksTab {
    product: any
}

function ProductDetailsFeedbacksTab({ product }: IProductDetailsFeedbacksTab) {

    const classes = useStyles()
    const api = useContext(ApiContext)
    const dispatch = useDispatch()

    const screenType = useSelector(getScreenType)

    const [feedbacks, setFeedbacks] = useState([])
    const [leaveOpen, setLeaveOpen] = useState(false)
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0)

    const [addLoading, setAddLoading] = useState(false)

    const isLeaveOpen = leaveOpen || !(screenType === SCREEN_TYPE.MOBILE)


    return (
        <div className={classes.content}>

            {/* Leave feedback */}
            <Button className={classes.openLeaveButton} variant={'outlined'}>
                Write review
            </Button>

            <form className={classes.leave} style={{ display: isLeaveOpen ? 'flex' : 'none' }}>
                <span className={classes.leaveTitle}>Write review</span>
                <span className={classes.leaveSubTitle}>Rate product</span>
                <Rating className={classes.leaveRating} rate={rating} disabled={false} onChange={val => setRating(val)}/>
                <textarea
                    className={classes.leaveTextarea}
                    placeholder="Write about product"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Button classes={{ root: classes.leaveButton }} type='submit' disabled={addLoading}>
                    Submit
                </Button>
            </form>


            <div className={classes.feedbacks}>
                {
                    Array.isArray(feedbacks) && (
                        feedbacks.length ? feedbacks.map((f: any, index: number) => (
                                <div key={index} className={classes.card}>
                                    <div className={classes.cardHeader}>
                                        <Image loader={({src}) => src} src='/images/avatar.png' width={32} height={32} alt={'user avatar'}/>
                                        <h6 className={classes.name}> 'Umutbek'</h6>
                                        <Rating className={classes.rating} rate={f.star || 0} disabled/>
                                        <span className={classes.date}>{ getDateFromNow(f.date) }</span>
                                    </div>
                                    {/* card body */}
                                    <div className={classes.cardBody}>
                                        { f.text }
                                    </div>
                                    <hr className={classes.line}/>
                                </div>
                            ))
                            :
                            <div className={classes.noFeedbacksText}>
                                <span>
                                    No reviews. <br/>
                                    Buy this product from us and be the first reviewer
                                </span>
                            </div>
                    )
                }
            </div>

        </div>
    )
}

export default ProductDetailsFeedbacksTab
