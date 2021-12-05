import Image from 'next/image'
import makeStyles from "@mui/styles/makeStyles"
import {Swiper, SwiperSlide} from "swiper/react"

interface IProductDetailsImagesSlider {
    images: any[]
}

const useStyles = makeStyles({
    swiper: {
        width: '100%',
    },
    swiperSlide: {
        position: 'relative',
        width: '100%',
        height: 317,
    }
})

function ProductDetailsImagesSlider({ images }: IProductDetailsImagesSlider) {

    const classes = useStyles()

    return (
        <div>
            <Swiper className={classes.swiper} pagination={{ clickable: true }}>
                { images.map((img, index) => (
                    <SwiperSlide className={classes.swiperSlide} key={index}>
                        <Image loader={({src}) => src} src={img.original} layout={'fill'} objectFit={'contain'} alt={'image'}/>
                    </SwiperSlide>
                )) }
            </Swiper>
        </div>
    )
}

export default ProductDetailsImagesSlider
