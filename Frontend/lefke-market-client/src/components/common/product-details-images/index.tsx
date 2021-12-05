import dynamic from "next/dynamic"
import {useSelector} from "react-redux"
import {getScreenType} from "../../../redux/states/settings/getters"
import {SCREEN_TYPE} from "../../../enums"

const ProductDetailsImagesGallery = dynamic(() => import('./product-details-images-gallery'))
const ProductDetailsImagesSlider = dynamic(() => import('./product-details-images-slider'))

interface IProductDetailsImages {
    images: any[]
}

function ProductDetailsImages({ images }: IProductDetailsImages) {

    const screenType = useSelector(getScreenType)
    const isDesktop = screenType === SCREEN_TYPE.DESKTOP

    return (
        <>
            {
                isDesktop ? <ProductDetailsImagesGallery images={images}/> : <ProductDetailsImagesSlider images={images}/>
            }
        </>
    )
}

export default ProductDetailsImages
