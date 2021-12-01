import React, {useCallback, useState} from 'react'
import makeStyles from "@mui/styles/makeStyles"
import {Modal} from "@mui/material"
import Button from "@mui/material/Button"
import {BREAKPOINTS, COLOR} from "../../../../../../enums"
import MobileTopNavigation from "../../../../mobile-top-navigation"
import FilterList from "../filter-list"
import FilterItem from "../filter-item"
import FilterPrice from "../filter-price"

interface IFilterMobileProps {
    costInterval: any,
    setCostInterval: any
}

const useStyles = makeStyles({
    open_button: {
        width: '100%',
        height: 36,
        backgroundColor: COLOR.GRAY_5,
        boxShadow: 'none',
        marginTop: 8,
        justifyContent: 'left',
        marginLeft: 8,

        '&:hover': {
            backgroundColor: COLOR.GRAY_5,
            boxShadow: 'none',
        },

        '&:active': {
            backgroundColor: COLOR.GRAY
        },

        '& .filter-button-text': {
            color: '#151C17',
            marginLeft: 8
        },

        [`@media screen and (max-width: ${BREAKPOINTS.SM})`]: {
            justifyContent: 'center',
            marginLeft: 0,
        }
    },
    filter: {
        width: '100%',
        minHeight: '100vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: COLOR.WHITE,
    },
    reset_text: {
        fontSize: '16px',
        fontWeight: 700,
        color: COLOR.SECONDARY,
    },
    content: {
        height: 'calc(100vh - 56px)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
    },
    accept_button: {
        marginTop: 'auto',
        height: 44,
        backgroundColor: COLOR.MAIN,
        color: COLOR.WHITE,
        fontSize: '16px',
        fontWeight: 500,
        textTransform: 'initial',

        '&:hover': {
            backgroundColor: COLOR.MAIN,
        },
    },
    line: {
        marginTop: 8,
        height: 8,
        backgroundColor: COLOR.GRAY_2
    }
})

function FilterMobile({costInterval, setCostInterval} : IFilterMobileProps) {

    const classes = useStyles()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClose = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const handleReset = useCallback(() => {
        setCostInterval({
            min_cost: 0,
            max_cost: 0
        })
    }, [setCostInterval])

    return (
        <>
            <Button variant="contained" classes={{ root: classes.open_button }} onClick={() => setIsModalOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.856 12.8571C17.2151 12.8571 18.3631 13.7608 18.7318 15.0001L20.5703 15C21.0437 15 21.4275 15.3837 21.4275 15.8571C21.4275 16.3305 21.0437 16.7143 20.5703 16.7143L18.7316 16.715C18.3625 17.9538 17.2148 18.8571 15.856 18.8571C14.4973 18.8571 13.3495 17.9538 12.9805 16.715L3.42746 16.7143C2.95407 16.7143 2.57031 16.3305 2.57031 15.8571C2.57031 15.3837 2.95407 15 3.42746 15L12.9802 15.0001C13.349 13.7608 14.497 12.8571 15.856 12.8571ZM15.856 14.3571C15.0276 14.3571 14.356 15.0287 14.356 15.8571C14.356 16.6855 15.0276 17.3571 15.856 17.3571C16.6845 17.3571 17.356 16.6855 17.356 15.8571C17.356 15.0287 16.6845 14.3571 15.856 14.3571ZM8.99888 5.14282C10.3579 5.14282 11.5059 6.04654 11.8747 7.28582L20.5703 7.28568C21.0437 7.28568 21.4275 7.66944 21.4275 8.14282C21.4275 8.61621 21.0437 8.99997 20.5703 8.99997L11.8744 9.00068C11.5054 10.2395 10.3576 11.1428 8.99888 11.1428C7.64014 11.1428 6.49237 10.2395 6.12333 9.00068L3.42746 8.99997C2.95407 8.99997 2.57031 8.61621 2.57031 8.14282C2.57031 7.66944 2.95407 7.28568 3.42746 7.28568L6.12308 7.28582C6.49184 6.04654 7.63982 5.14282 8.99888 5.14282ZM8.99888 6.64282C8.17046 6.64282 7.49888 7.3144 7.49888 8.14282C7.49888 8.97125 8.17046 9.64282 8.99888 9.64282C9.82731 9.64282 10.4989 8.97125 10.4989 8.14282C10.4989 7.3144 9.82731 6.64282 8.99888 6.64282Z" fill="#151C17"/>
                </svg>
                <span className="filter-button-text">
                    Filter
                </span>
            </Button>

            <div className={classes.line}/>

            <Modal
                open={isModalOpen}
                onClose={handleClose}
            >
                <div className={classes.filter}>
                    <MobileTopNavigation
                        title={'Filter'}
                        rightComponent={<span className={classes.reset_text}>Reset</span>}
                        onLeftButtonClick={handleClose}
                        onRightButtonClick={handleReset}
                    />
                    <div className={classes.content}>

                        <FilterList>
                            <FilterItem title={'Cost'}>
                                <FilterPrice costInterval={costInterval} setCostInterval={setCostInterval}/>
                            </FilterItem>
                        </FilterList>

                        <Button onClick={handleClose} variant="contained" classes={{ root: classes.accept_button }}>
                            Search results
                        </Button>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FilterMobile
