import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ProductContainer from "../products/ProductContainer"
import {renderProducts} from "../products/ProductItem"
import Banner2 from "../sliders/banner2"
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    mainContent: {
        ['@media screen and (max-width: 1360px)']: {
            paddingTop: 160,
        }
    },
})

function MainContent() {

    const classes = useStyles()
    const screenType = useSelector(state => state.settings.screenType)

    const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

    return (
        <main className={classes.mainContent}>
            <div className="main-container">
                <Grid container>
                    <Grid item xs={12}>
                        <Banner2/>
                    </Grid>
                    <Grid item xs={12}>
                        <ProductContainer title={"List of items"}>
                            { renderProducts(arr, screenType) }
                        </ProductContainer>
                    </Grid>
                </Grid>
                </div>
        </main>
    )
}

function Item(props: any)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default MainContent
