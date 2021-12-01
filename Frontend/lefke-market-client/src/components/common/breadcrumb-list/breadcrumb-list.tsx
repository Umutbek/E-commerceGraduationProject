import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "next/link"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles({
    breadcrumbs: {
        fontWeight: 400,
        fontSize: '16px',
        color: '#151C17',

        '& li': {
            color: '#151C17',

            '&:last-child': {
                color: '#828282',
            }
        }
    },
})

interface IItem {
    name: string,
    link: string
}

interface IBreadcrumbListProps {
    items: IItem[]
}

const itms = [
    { name: 'Catalog', link: '/catalog' },
    { name: 'Catalog', link: '/catalog' },
    { name: 'Catalog', link: '/catalog' }
]

function BreadcrumbList({ items }: IBreadcrumbListProps) {

    const classes = useStyles()

    return (
        <div className={classes.breadcrumbs}>
            <Breadcrumbs aria-label="breadcrumb" classes={{ root: classes.breadcrumbs }}>
                {
                    items.map((b, i) => (
                        <Link key={i} href={b.link}>
                            <a>
                                { b.name }
                            </a>
                        </Link>
                    ))
                }
            </Breadcrumbs>
        </div>
    )
}

export default BreadcrumbList
