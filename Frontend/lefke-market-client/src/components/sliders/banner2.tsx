// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from "next/image";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    banner: {
        marginTop: 24,
    },
    bannerItem: {
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
                navigation
            >
                {
                    items.map( (item, i) => (
                        <SwiperSlide key={i} className={classes.bannerItem}>
                            <div className={classes.bannerRatio}/>
                            <div className={classes.bannerContent}>
                                <Image src={item.url} className={classes.bannerImage} layout={"fill"} objectFit={"cover"}/>
                            </div>
                        </SwiperSlide>
                    ) )
                }
            </Swiper>
        </div>
    )
}
