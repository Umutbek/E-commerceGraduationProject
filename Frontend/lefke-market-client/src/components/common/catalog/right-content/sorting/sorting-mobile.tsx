import {useCallback, useState} from 'react'
import makeStyles from "@mui/styles/makeStyles"
import {COLOR, ORDERING} from "../../../../../enums"
import {Modal, Radio} from "@mui/material"
import Button from "@mui/material/Button";

interface IMobileSortingProps {
    ordering: string,
    onSelectOrder: (ordering: string) => void
}

const useStyles = makeStyles({
    sort_open: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: COLOR.MAIN,
        textTransform: 'initial',
        fontSize: '14px'
    },
    sort_button_text: {
        marginLeft: 8,
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 400,
        color: COLOR.BLACK,
    },
    sort_list: {
        width: '320px',
        padding: '8px 0',
        backgroundColor: COLOR.WHITE,
        borderRadius: 4,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    sort_item: {
        'border-top': `1px solid ${COLOR.GRAY}`,

        '&:nth-child(1)': {
            'border-top': 'none',
        }
    },
    sort_button: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        fontSize: '16px',
        lineHeight: '24px',
    }
})

function SortingMobile({ordering, onSelectOrder}: IMobileSortingProps) {

    const classes = useStyles()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listingText, setListingText] = useState('By popularity')

    const handleClose = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const onSortClick = useCallback((ordering: string) => {
        onSelectOrder(ordering)
        setIsModalOpen(false)
    }, [])

    const handlePopularClick = () => {
        onSortClick(ORDERING.view)
        setListingText('By popularity')
    }

    const handlePriceClick = () => {
        onSortClick(ORDERING.price)
        setListingText('By cost')
    }

    const handleRatingClick = () => {
        onSortClick(ORDERING.rating)
        setListingText('By rating')
    }

    return (
        <>
            <Button variant="text" classes={{root: classes.sort_open }} onClick={() => setIsModalOpen(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.7154 5.57139C8.18879 5.57139 8.57254 5.98467 8.57254 6.49447V15.5014L10.5379 13.5367C10.8469 13.2277 11.3331 13.204 11.6693 13.4654L11.7501 13.5367C12.0848 13.8715 12.0848 14.4142 11.7501 14.7489L8.32149 18.1775C7.98676 18.5122 7.44405 18.5122 7.10931 18.1775L3.68074 14.7489C3.346 14.4142 3.346 13.8715 3.68074 13.5367C4.01547 13.202 4.55819 13.202 4.89292 13.5367L6.85826 15.5014V6.49447C6.85826 6.01866 7.19255 5.62693 7.62201 5.57681L7.7154 5.57139ZM16.8929 5.78816L20.3215 9.21673C20.6562 9.55147 20.6562 10.0942 20.3215 10.4289C19.9868 10.7636 19.444 10.7636 19.1093 10.4289L17.144 8.46339V17.5371C17.144 18.0105 16.7602 18.3943 16.2868 18.3943C15.8134 18.3943 15.4297 18.0105 15.4297 17.5371V8.46339L13.4643 10.4289C13.1296 10.7636 12.5869 10.7636 12.2522 10.4289C11.9174 10.0942 11.9174 9.55147 12.2522 9.21673L15.6807 5.78816C16.0155 5.45343 16.5582 5.45343 16.8929 5.78816Z" fill="#0AAD3B"/>
                </svg>
                <span className={classes.sort_button_text}> { listingText } </span>
            </Button>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ul className={classes.sort_list}>
                    <li className={classes.sort_item}>
                        <button className={`reset-button cursor-pointer ${classes.sort_button}`} onClick={handlePopularClick}>
                            <span>
                                Popularity
                            </span>
                            <Radio color="success" checked={ordering === ORDERING.views}/>
                        </button>
                    </li>
                    <li className={classes.sort_item}>
                        <button className={`reset-button cursor-pointer ${classes.sort_button}`} onClick={handlePriceClick}>
                            <span>
                                Cost                            </span>
                            <Radio color="success" checked={ordering === ORDERING.price}/>
                        </button>
                    </li>
                    <li className={classes.sort_item}>
                        <button className={`reset-button cursor-pointer ${classes.sort_button}`} onClick={handleRatingClick}>
                            <span>
                                Rating
                            </span>
                            <Radio color="success" checked={ordering === ORDERING.rating}/>
                        </button>
                    </li>
                </ul>
            </Modal>
        </>
    )
}

export default SortingMobile
