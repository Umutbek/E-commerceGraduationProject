import Link from 'next/link'
import {Swiper, SwiperSlide} from "swiper/react"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles({
    swiper: {
        height: 36,
    },
    swiper_slide: {
        width: 'auto',
    },
    link: {
        display: 'inline-block',
        marginTop: 6,
    }
})

interface ICategoriesMobileProps {
    categories: any[]
}

function CategoriesMobile({ categories }: ICategoriesMobileProps) {

    const classes = useStyles()

    return (
        <Swiper
            className={classes.swiper}
            spaceBetween={24}
            slidesPerView={'auto'}
        >
            {
                categories.map(c => (
                    <SwiperSlide key={c.id} className={classes.swiper_slide}>
                        <Link href={c.link}>
                            <a className={classes.link}>{ c.nameEn }</a>
                        </Link>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default CategoriesMobile
