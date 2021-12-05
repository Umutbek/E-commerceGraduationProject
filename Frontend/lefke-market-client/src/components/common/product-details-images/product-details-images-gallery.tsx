import {useEffect, useState} from 'react'
import makeStyles from "@mui/styles/makeStyles"
import Image from "next/image"
import clsx from "clsx"
import {COLOR} from "../../../enums"

interface IProductDetailGalleryProps {
    images: any[]
}

const useStyles = makeStyles({
    gallery: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    imageList: {
        width: 88,
    },
    imageItem: {
        width: '100%',
        height: 88,
        marginBottom: 18,
        border: '1px solid #F5F5F5',
    },
    imageItemActive: {
        border: `1px solid ${COLOR.MAIN}`,
    },
    imageBig: {
        width: 640
    }
})

function ProductDetailsImagesGallery({ images }: IProductDetailGalleryProps) {

    const classes = useStyles()
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)


    useEffect(() => {
        if (images.length){
            setSelectedImage(images[0])
            setSelectedImageIndex(0)
        }
    }, [images])

    const handleSelectImage = (image: any, index: number) => {
        setSelectedImage(image)
        setSelectedImageIndex(index)
    }

    return (
        <div className={classes.gallery}>
            <div className={classes.imageList}>
                {
                    images.map((image, index) => {
                        const activeClass = index === selectedImageIndex ? classes.imageItemActive : ''
                        const classNames = clsx('reset-button', 'cursor-pointer', classes.imageItem, activeClass)
                        return (
                            <button key={index} className={classNames} onClick={() => handleSelectImage(image, index)}>
                                <Image loader={({src}) => src} src={image.thumbnail} objectFit="contain" width={88} height={88} alt="lefke image"/>
                            </button>
                        )
                    })
                }
            </div>
            <div className={classes.imageBig}>
                { selectedImage && <Image loader={({src}) => src} src={selectedImage.original} objectFit="contain" width={640} height={466} alt="lefke image"/> }
            </div >
        </div>
    )
}

export default ProductDetailsImagesGallery
