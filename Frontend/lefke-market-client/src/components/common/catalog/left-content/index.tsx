import makeStyles from "@mui/styles/makeStyles"
import Categories from "./categories"
import Filter from "./filter"

const useStyles = makeStyles({
    content: {
        position: 'sticky',
        top: 100,
    }
})

interface ILeftContentProps {
    context: string,
    store: string,
    category: string,
    subCategory: string,
    subSubCategory: string,
    costInterval: any,
    setCostInterval: any,
}

function LeftContent({context, store, category, subCategory, subSubCategory, costInterval, setCostInterval}: ILeftContentProps) {

    const classes = useStyles()

    return (
        <section className={classes.content}>

            <Categories context={context} store={store} category={category} subCategory={subCategory} subSubCategory={subSubCategory}/>

            <Filter costInterval={costInterval} setCostInterval={setCostInterval}/>

        </section>
    )
}

export default LeftContent
