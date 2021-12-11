import makeStyles from "@mui/styles/makeStyles"
import Image from "next/image"
import {useDispatch, useSelector} from "react-redux"
import UButton from "../src/components/common/buttons/UButton"
import {COLOR, LISTING} from "../src/enums"
import {openAuthModal} from "../src/redux/states/settings/actions"
import ProductsList from "../src/components/common/products/products-list"
import {getIsAuth} from "../src/redux/states/auth/getters"
import {getFavorites} from "../src/redux/states/favorite/getters"
import {useContext} from "react"
import ApiContext from "../src/helpers/api/api-context"
import {IProduct} from "../src/components/common/products/interfaces"
import ProductItem from "../src/components/common/products/product-item"

const useStyles = makeStyles({
    page: {
      minHeight: '47vh'
    },
    emptyBasket: {
        width: 200,
        margin: '89px auto 0',
    },
    loginBtn: {
        marginTop: 16,
    }
})

function Favorites() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const api = useContext(ApiContext)

    const isAuth = useSelector(getIsAuth)
    const favorites = useSelector(getFavorites)

    const handleLoginClick = () => dispatch(openAuthModal())

    return (
        <div className={classes.page}>
            <div className="main-container">
                <h1> Favourites </h1>

                {
                    favorites.length ?
                        <div className="favorites">
                            <ProductsList>
                                {
                                    favorites.map((product: IProduct) => (
                                        <ProductItem key={product.id} product={product} api={api} listing={LISTING.COLUMN}/>
                                    ))
                                }
                            </ProductsList>
                        </div>
                        :
                        <div className={'text-align-center'}>
                            <div className={classes.emptyBasket}>
                                <Image src={'/icons/empty-favorites.png'} width={200} height={200} alt="lefke empty basket"/>
                            </div>
                            {
                                isAuth ? <>
                                    <h2> You have not added a product </h2>
                                    <h5> There will be your favorite products </h5>
                                </> : <>
                                    <h2> Please, log in  </h2>
                                    <h5>You will be able to see all your favorite products on any device. </h5>
                                    <UButton
                                        className={classes.loginBtn}
                                        width={135}
                                        height={40}
                                        borderRadius={'8px'}
                                        background={COLOR.MAIN}
                                        variant="contained"
                                        onClick={handleLoginClick}
                                    >
                                        Log in
                                    </UButton>
                                </>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export const getStaticProps = async (params: any) => ({
    props: {
        ...(await (params.locale, ['common', 'footer']))
    }
})

export default Favorites
