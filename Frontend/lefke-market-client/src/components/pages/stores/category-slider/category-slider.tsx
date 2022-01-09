import {Swiper, SwiperSlide} from "swiper/react"
import makeStyles from "@mui/styles/makeStyles"
import Button from "@mui/material/Button"
import clsx from "clsx"
import {BREAKPOINTS, COLOR} from "../../../../enums"
import {ArrowNextIcon} from "../../../common/icons"

const useStyles = makeStyles({
    swiper: {
        height: 36,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            borderBottom: '1px solid #c4c4c4',
        }
    },
    swiper_slide: {
        width: 'auto',
    },
    link: {
        display: 'inline-block',
        padding: 0,
        margin: 0,
        minWidth: 10,
        color: '#151C17',
        fontSize: '16px',
        fontWeight: 400,
        textTransform: 'initial',
        borderRadius: 0,
        height: '100%',
    },
    link_active: {
        color: COLOR.MAIN,

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            borderBottom: `2px solid ${COLOR.MAIN}`,
        }
    }
})

interface ICategorySliderProps {
    categories: any,
    selectedCategorySlug: string,
    setSelectedCategorySlug: (categorySlug: string) => void,
}

function CategorySlider({ categories = [], selectedCategorySlug, setSelectedCategorySlug }: ICategorySliderProps) {

    const classes = useStyles()

    const onCategorySelect = (categorySlug: string) => {
        if (selectedCategorySlug === categorySlug){
            setSelectedCategorySlug('')
        } else {
            setSelectedCategorySlug(categorySlug)
        }
    }

    return (
            <Swiper
                className={classes.swiper}
                spaceBetween={24}
                slidesPerView={'auto'}
            >
                {
                    [{ nameEn: 'All', slug: '' }, ...categories].map((c: any) => (
                        <SwiperSlide key={c.id} className={classes.swiper_slide}>
                            <Button
                                variant="text"
                                classes={{ root: clsx(classes.link, selectedCategorySlug === c.slug ? classes.link_active : '') }}
                                onClick={() => onCategorySelect(c.slug)}
                            >
                                { c.nameEn }
                            </Button>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
    )
}

export default CategorySlider
