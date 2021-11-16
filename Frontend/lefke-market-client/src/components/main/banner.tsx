import {Carousel} from "react-responsive-carousel"
import Image from "next/image"
import {makeStyles} from "@material-ui/core/styles"
import React from "react"

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

export default function Banner() {

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
            <Carousel
                autoPlay
                showThumbs={false}
                transitionTime={1000}
                infiniteLoop
                interval={3000}
                // renderArrowNext={() => <>
                //     <button className={classes.bannerNextButton}>
                //         hi
                //     </button>
                // </>}
            >
                {
                    items.map( (item, i) => (
                        <div key={i} className={classes.bannerItem}>
                            <div className={classes.bannerRatio}/>
                            <div className={classes.bannerContent}>
                                <Image src={item.url} className={classes.bannerImage} layout={"fill"} objectFit={"cover"}/>
                            </div>
                        </div>
                    ) )
                }
            </Carousel>
        </div>
    )
}
