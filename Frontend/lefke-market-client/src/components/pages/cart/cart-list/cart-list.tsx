import {ReactNode, memo} from "react"
import Link from 'next/link'
import makeStyles from "@mui/styles/makeStyles"
import {COLOR} from "../../../../enums"

interface ICartListProps {
    children: ReactNode | ReactNode[],
    storeName: string,
    storeSlug: string,
    storeTotalSum: number,
}

const useStyles = makeStyles({
    list: {
        backgroundColor: COLOR.GRAY_2,
        marginTop: 16,
        borderRadius: 4,
    },
    header: {
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 500,
        borderBottom: "1px solid rgba(189, 189, 189, 0.25)"
    },
    content: {

    },
    footer: {
        padding: '8px 16px 16px',
        borderTop: "1px solid rgba(189, 189, 189, 0.25)",
    },
    sum: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 500,
        alignItems: 'center',
    },
    sum_left: {
        fontSize: '14px',
    },
    sum_right: {
        fontSize: '18px',
    },
    place_order_button: {
        display: 'block',
        marginTop: 16,
        padding: '10px 0',
        width: '100%',
        height: 44,
        backgroundColor: COLOR.MAIN,
        color: COLOR.WHITE,
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 500,
        borderRadius: 4,
        textAlign: 'center',

        '&:hover': {
            backgroundColor: COLOR.MAIN_LIGHT,
        }
    }
})

function CartList({ storeName, storeSlug, storeTotalSum, children }: ICartListProps) {

    const classes = useStyles()

    return (
        <div className={classes.list}>
            <div className={classes.header}>
                { storeName }
            </div>

            { children }

            <div className={classes.footer}>
                <div className={classes.sum}>
                    <span className={classes.sum_left}>
                        To pay
                    </span>
                    <span className={classes.sum_right}>
                        { storeTotalSum } <span className="TL">TL</span>
                    </span>
                </div>
                <Link href={`/ordering/${storeSlug}`}>
                    <a className={classes.place_order_button}>
                        Buy
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default memo(CartList)
