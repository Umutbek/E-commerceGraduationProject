import {CatalogListIcon, ListIcon} from "../../../icons";
import {COLOR, LISTING} from "../../../../../enums";
import makeStyles from "@mui/styles/makeStyles";

interface IListingProps {
    listing: number,
    setListing: (listing: number) => void
}

const useStyles = makeStyles({
    listing: {
        width: 72,
        display: 'flex',
        justifyContent: 'space-between',
    }
})

function Listing({ listing, setListing }: IListingProps) {

    const classes = useStyles()

    return (
        <div className={classes.listing}>
            <CatalogListIcon
                className={'cursor-pointer'}
                color={listing === LISTING.COLUMN ? COLOR.MAIN : COLOR.SECONDARY}
                onClick={() => setListing(LISTING.COLUMN)}
            />
            <ListIcon
                className={'cursor-pointer'}
                color={listing === LISTING.ROW ? COLOR.MAIN : COLOR.SECONDARY}
                onClick={() => setListing(LISTING.ROW)}
            />
        </div>
    )
}

export default Listing
