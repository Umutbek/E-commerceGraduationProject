// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from "next/image"
import makeStyles from '@mui/styles/makeStyles'
import clsx from "clsx";
import {ArrowNextIcon, ArrowPrevIcon} from "../../../common/icons"
import {COLOR} from "../../../../enums"
import {BREAKPOINTS} from "../../../../enums"

const useStyles = makeStyles({
    banner: {
        marginTop: 24,
    },

    // swiper
    swiper: {
      position: 'relative',
    },

    // banner item
    swiperSlide: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    bannerRatio: {
        paddingTop: '23.0769%',
        height: 0
    },
    bannerContent: {
        position: "absolute",
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    bannerImage: {
        borderRadius: '8px',
    },
    bannerNextButton: {
        position: 'absolute',
        top: '50%',
        right: 0,
        border: 'none',

    },

    navButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '35%',
        width: 48,
        height: 88,
        backgroundColor: COLOR.WHITE,
        zIndex: 999,
        cursor: 'pointer',

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            display: 'none',
        }
    },
    nextButton: {
        right: 0,
        borderRadius: '8px 0px 0px 8px',
        boxShadow: '-1px 0px 8px rgba(0, 0, 0, 0.2)',
    },
    prevButton: {
        left: 0,
        borderRadius: '0px 8px 8px 0px',
        boxShadow: '-1px 0px 8px rgba(0, 0, 0, 0.2)',
    }
})

export default function Banner2() {

    const classes = useStyles()

    const items = [
        {
            url: '/images/product1.jpeg'
        },
        {
            url: '/images/product2.jpeg'
        }
    ]

    return (
        <div className={classes.banner}>
            <Swiper
                slidesPerView={1}
                className={classes.swiper}
                navigation={{ nextEl: `.${classes.nextButton}`, prevEl: `.${classes.prevButton}` }}
                loop={true}
                autoplay
            >
                {
                    items.map( (item, i) => (
                        <SwiperSlide key={i} className={classes.swiperSlide}>
                            <div className={classes.bannerRatio}/>
                            <div className={classes.bannerContent}>
                                <Image src={item.url} className={classes.bannerImage} layout={"fill"} objectFit={"cover"} alt={'Banner-Img'}/>
                            </div>
                        </SwiperSlide>
                    ) )
                }

                <div className={clsx(classes.navButton, classes.prevButton)}>
                    <ArrowPrevIcon width={24} height={24} color={COLOR.GRAY}/>
                </div>
                <div className={clsx(classes.navButton, classes.nextButton)}>
                    <ArrowNextIcon width={24} height={24} color={COLOR.GRAY}/>
                </div>
            </Swiper>
        </div>
    )
}
