import {ReactNode, useCallback} from "react"
import Link from 'next/link'
import Image from 'next/image'
import makeStyles from "@mui/styles/makeStyles"
import { Badge } from '@mui/material';

import {BREAKPOINTS, COLOR, STATUSES} from "../../../../enums"

interface IStoresItemProps {
    icon: string,
    id: number | string,
    slug: string | null,
    children: ReactNode | ReactNode[]
}

const useStyles = makeStyles({

    card: {
        position: 'relative',
        width: 244,
        marginBottom: 16,
        background: '#fff',
        borderRadius: '8px',
        padding: '27px 16px 24px',

        '&:hover': {
            boxShadow: '0px 0px 8px #BDBDBD',
        },

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            width: 175,
            padding: '20.5px 8px 16px'
        },

        [`@media screen and (max-width: ${BREAKPOINTS.MD})`]: {
            width: 160,
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
        marginTop: 10,
    },
    store: {
        height: 25,
        marginTop: 16,
        fontSize: '14px',
        fontWeight: 400,
        color: '#0000FF',
        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            fontSize: '12px',
            marginTop: 8,
        },

        '&:hover': {
            textDecoration: 'underline',
        }
    },
    date: {
        fontSize: '10px',
        lineHeight: '24px',
        color: '#828282',
        marginTop: 25,
    },

    price: {
        display: 'block',
        marginTop: 20,
        fontWeight: 500,
        fontSize: '24px',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
            fontSize: '18px',
            marginTop: 8,
        }
    },
    imageContainer: {
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '157px',

        [`@media screen and (max-width: ${BREAKPOINTS.LG})`]: {
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
    badge1: {
      fontSize: 15,
      padding: '5px 10px',
      background: '#BDBDBD',
    },
    badge2: {
      fontSize: 15,
      padding: '5px 10px',
      background: '#0275d8',
    },
    badge3: {
      fontSize: 15,
      padding: '5px 10px',
      background: '#0275d8',
    },
    badge4: {
      fontSize: 15,
      padding: '5px 10px',
      background: '#5bc0de',
    },
    badge5: {
      fontSize: 15,
      padding: '5px 10px',
      background: '#47C16C',
    },
    badge6: {
      fontSize: 15,
      padding: '5px 10px',
      background: '#E52E2E'
    }
})


function OrdersItem({id, store, client, date, cart, children }: IStoresItemProps) {

    const classes = useStyles()

    const getStatusWithBadge = useCallback((statusId) => {

    switch (statusId) {
      case STATUSES.NEW: return <Badge className={classes.badge1 }>Not confirmed</Badge>
      case STATUSES.PACKING: return <Badge className={classes.badge2 }>Packing</Badge>
      case STATUSES.PACKED: return <Badge className={classes.badge3 }>Packed</Badge>
      case STATUSES.ON_WAY: return <Badge className={classes.badge4 }>On way</Badge>
      case STATUSES.DELIVERED: return <Badge className={classes.badge5 }>Delivered</Badge>
      case STATUSES.DECLINED: return <Badge className={classes.badge6 }>Declined</Badge>
      default: return 'primary'
    }
    })
    return (
        <Link href={`/`}>
            <div className={classes.card}>

                <a>
                    {getStatusWithBadge(children)}
                </a>

                <a className={classes.imageContainer}>
                    <div className={classes.imageRatio}/>
                    <div className={classes.imageContent}>
                        <Image loader={({src}) => src} src= { cart.listitem[0].item.image } className={classes.image} layout={"fill"} objectFit={"contain"} alt="image"/>
                    </div>
                </a>
                <p className={classes.store}>
                    { store.username }
                </p>
                <p className={classes.title}>
                    { cart.listitem[0].item.name }
                </p>
                <p className={classes.price}>
                    { cart.listitem[0].item.cost } <span className="TL">TL</span>
                </p>
                <p className={classes.date}>
                    Ordered : {date}
                </p>
            </div>
        </Link>
    )
}

export default OrdersItem
