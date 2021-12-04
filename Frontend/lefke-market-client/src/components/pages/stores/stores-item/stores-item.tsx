import {ReactNode} from "react"
import Link from 'next/link'
import Image from 'next/image'
import makeStyles from "@mui/styles/makeStyles"
import {BREAKPOINTS, COLOR} from "../../../../enums"

interface IStoresItemProps {
    icon: string,
    id: number | string,
    slug: string | null,
    children: ReactNode | ReactNode[]
}

const useStyles = makeStyles({
    card: {
        width: 200,
        height: 124,
        border: `1px solid ${COLOR.GRAY}`,
        padding: '10px 0',
        borderRadius: 4,

        '&:hover p': {
            color: COLOR.MAIN
        },

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: 156
        }
    },
    image_wrapper: {
        width: 150,
        height: 70,
        position: 'relative',
        margin: '0 auto',
    },
    title: {
        fontSize: '16px',
        lineHeight: '24px',
        color: '#151C17',
        textAlign: 'center',
        marginTop: 10,
    }
})

function StoresItem({ icon, id, slug, children }: IStoresItemProps) {

    const classes = useStyles()

    return (
        <Link href={`/stores/${slug}`}>
            <a className={classes.card}>
                <div className={classes.image_wrapper}>
                    {
                        typeof icon === "string" && icon.length ?
                            <Image loader={({src}) => src} src={icon} layout={"fill"} objectFit={'contain'} alt={''}/> : null
                    }
                </div>
                <p className={classes.title}>
                    { children }
                </p>
            </a>
        </Link>
    )
}

export default StoresItem
