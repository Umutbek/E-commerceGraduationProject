import {useCallback} from 'react'
import makeStyles from "@mui/styles/makeStyles"
import Link from "next/link"
import {COLOR} from "../../../../../../enums";

const useStyles = makeStyles({
    category: {
        border: `1px solid ${COLOR.GRAY}`,
        borderRadius: 4,

        '& li:hover': {
            color: COLOR.MAIN
        },
    },
    title: {
        display: 'inline-block',
        padding: '8px 16px',
        fontSize: '16px',
        fontWeight: 500,
    },
    list: {
        padding: '16px 16px'
    },
    item: {
        marginTop: 8,
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '24px',

        '&:nth-child(1)': {
            marginTop: 0,
        }
    },
    line: {
        margin: 0,
        padding: 0,
        height: 1,
        backgroundColor: '#C4C4C4'
    }
})

interface ICategoriesDesktopProps {
    categories: any[]
}

function CategoriesDesktop({ categories }: ICategoriesDesktopProps) {

    const classes = useStyles()

    return (
        <div className={classes.category}>
            <span className={classes.title}>Categories</span>
            <div className={classes.line}/>
            <ul className={classes.list}>
                { categories.map(c => (
                    <li key={c.id} className={classes.item}>
                        <Link href={c.link}>
                            <a>{ c.nameEn }</a>
                        </Link>
                    </li>
                )) }
            </ul>
        </div>
    )
}

export default CategoriesDesktop
