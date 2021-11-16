import makeStyles from "@material-ui/core/styles/makeStyles"
import Image from "next/image"
import Rating from "../rating"
import Button from "@material-ui/core/Button"
import {ScreenTypes} from "../../constants"
import {useSelector} from "react-redux"

interface IProps { isLeft: boolean, screenType: number }

const useStyles = makeStyles({
    item: {
        position: 'relative',
        width: 244,
        // maxHeight: 406,
        marginRight: 20,
        marginBottom: 16,
        background: '#fff',
        borderRadius: '8px',
        padding: '27px 16px 24px',

        '@media screen and (max-width: 1360px)': {
            width: 175,
            marginRight: 12,
            padding: '20.5px 8px 16px'
        },

        '@media screen and (max-width: 768px)': {
            width: 160,
            marginRight: 12
        }
    },
    leftElement: {
        marginRight: 0
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '157px',

        '@media screen and (max-width: 1360px)': {
            height: '119px',
        }
    },
    imageRatio: {
        paddingTop: '90%',
        height: 0
    },
    imageContent: {
        position: "absolute",
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    image: {

    },
    rating: {
        marginTop: 35,

        '@media screen and (max-width: 1360px)': {
            marginTop: 28
        }
    },
    name: {
        maxHeight: 40,
        height: 40,
        marginTop: 16,
        fontSize: '14px',
        fontWeight: 400,
        overflow: 'auto',

        '@media screen and (max-width: 1360px)': {
            fontSize: '12px',
            marginTop: 8,
        }
    },
    price: {
        marginTop: 20,
        fontWeight: 500,
        fontSize: '24px',

        '@media screen and (max-width: 1360px)': {
            fontSize: '18px',
            marginTop: 8,
        }
    },
    buttonIcons: {
        height: 24
    }
})

export function ProductItem(props: IProps){

    const classes = useStyles()

    const isDesktop = props.screenType === ScreenTypes.desktop

    return (
        <li className={`${classes.item} ${props.isLeft ? classes.leftElement : ''}`}>
            <div className={classes.imageContainer}>
                <div className={classes.imageRatio}/>
                <div className={classes.imageContent}>
                    <Image src={'/images/example_image.png'} className={classes.image} layout={"fill"} objectFit={"cover"}/>
                </div>
            </div>
            <div className={classes.rating}>
                <Rating disabled rate={3}/>
            </div>
            <div className={classes.name}>
                Banana
            </div>
            <div className={classes.price}>
                12 tl/kg
            </div>
            <Button variant="contained" style={{
                width: '100%',
                color: '#fff',
                backgroundColor: '#0AAD3B',
                marginTop: 16,
                textTransform: 'uppercase',
                padding: isDesktop ? '8px 0' : '4px 0',
                fontSize: '16px',
                fontWeight: 500,
            }}>
                {
                   isDesktop ?
                        <span>
                            Add to busket
                        </span> :
                        <span className={classes.buttonIcons}>
                            <Image src={'/icons/plus.png'} width={24} height={24} alt="uygo plus icon"/>
                            <Image src={'/icons/lefke_cart3.png'} width={24} height={24} alt="uygo cart icon"/>
                        </span>
                }
            </Button>
        </li>
    )
}

ProductItem.defaultProps = { isLeft: false }

interface RendererProps {
    products: object[]
}

export default function ProductsRenderer(props: RendererProps) {

    // @ts-ignore
    const screenType = useSelector(state => state.settings.screenType)

    return (<>
        {
            products.map((p, index) => {

                let isLeft = false

                if (screenType === ScreenTypes.mobile && !((index + 1) % 2)){
                    isLeft = true
                } else if (screenType === ScreenTypes.laptop && !((index + 1) % 4)) {
                    isLeft = true
                } else if (screenType === ScreenTypes.desktop && !((index + 1) % 5)) {
                    isLeft = true
                }

                return (<ProductItem key={index} isLeft={isLeft} screenType={screenType}/>)
            })
        }
    </>)
}

export const renderProducts = (products: object[], screenType: number) => {
    return (<>
        {
            products.map((p, index) => {

                let isLeft = false

                if (screenType === ScreenTypes.mobile && !((index + 1) % 2)){
                    isLeft = true
                } else if (screenType === ScreenTypes.laptop && !((index + 1) % 4)) {
                    isLeft = true
                } else if (screenType === ScreenTypes.desktop && !((index + 1) % 5)) {
                    isLeft = true
                }

                return (<ProductItem key={index} isLeft={isLeft} screenType={screenType}/>)
            })
        }
    </>)
}

