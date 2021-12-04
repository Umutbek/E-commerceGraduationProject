import {ReactNode} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import makeStyles from "@mui/styles/makeStyles"
import {BREAKPOINTS, COLOR} from "../../../../enums"

interface IStoreItem {
    icon: string,
    slug: string | null,
    link: string,
    children: ReactNode | ReactNode[]
}

const useStyles = makeStyles({
    card: {
        width: 200,
        height: 200,
        position: 'relative',
        padding: 20,
        backgroundColor: COLOR.GRAY_4,
        borderRadius: 8,
        overFlow: 'hidden',

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: 156,
            height: 142,
        },

        '&:hover': {
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1), 0px 2px 16px rgba(70, 86, 70, 0.16), 0px 2px 5px rgba(70, 86, 70, 0.06)'
        }
    },
    title: {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '24px',
        position: 'relative',
        zIndex: 10,
        transition: 'all 0.1s ease-in-out',

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            fontSize: '14px',
        },
    },
    image_wrapper: {
        position: 'absolute',
        width: 104,
        height: 100,
        top: 105,
        left: 96,
        zIndex: 9,

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            width: 90,
            top: 53,
            left: 66,
        },
    }
})

function StoreCategoryItem({icon = '', slug, link, children}: IStoreItem) {

    const classes = useStyles()

    return (
        <Link href={link}>
            <a className={classes.card}>
                <p className={classes.title}>
                    { children }
                </p>
                {
                    typeof icon === "string" && icon.length ?
                        <div className={classes.image_wrapper}>
                            <Image loader={({ src }) => src} src={typeof icon === "string" && icon.length ? icon : ''} layout="fill" objectFit="contain" alt="fsdf"/>
                        </div> : null
                }
            </a>
        </Link>
    )
}

export default StoreCategoryItem
