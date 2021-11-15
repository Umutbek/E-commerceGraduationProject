import {makeStyles} from "@material-ui/core/styles";
import Image from "next/image";
import {AppBar, Button} from "@material-ui/core";
import CollapseOnScroll from "../../onScroll/collapseOnScroll";
import {useDispatch} from "react-redux"
import {useCallback} from "react"
import {openCategoryDrawer} from "../../../redux/states/settings/actions";


const useStyles = makeStyles({
    mobileBanner: {
        width: '100%',
        height: 57,
        position: 'relative',
    },
    mobileHeader: {
        background: '#FFFFFF',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        position: "sticky",
        top: 0,
        padding: '16px 0 8px'
    },

    mobileSearchContainer: {
        height: 56,
        marginTop: 10
    },
    basketBtn: {
        backgroundColor: '#0AAD3B',
        '&:focus': {
            outline: '1px solid green'
        }
    },
    searchInput: {
        width: '100%',
        padding: '6px 16px',
        border: "none",
        background: '#F2F2F2',
        borderRadius: '4px',
        outline: 'none',
        fontSize: '14px',
        lineHeight: '24px',
        '&:focus': {
            outline: '1px solid green'
        }
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonText: {
        marginLeft: 10
    }
})

const buttonStyle = {
    width: '48%',
    backgroundColor: '#F3F4F7',
}


export default function MobileHeader(){

    const classes = useStyles()

    return <>
            <CollapseOnScroll component={AppBar} threshold={400}>
                <div className={classes.mobileHeader}>
                    <div className="main-container">
                        <div className={classes.mobileNavContainer}>
                            <div className={classes.logoContainer}>
                                <Image src={'/Logo.png'} width={113} height={40}/>
                            </div>
                        </div>
                        <div className={classes.mobileSearchContainer}>
                            <input type="text" placeholder="Search" className={classes.searchInput}/>
                        </div>
                        <div className={classes.buttons}>
                            <Button
                                variant={"contained"}
                                style={buttonStyle}
                            >
                                <Image src={'/icons/Category_gray.png'} width={18} height={18}/>
                                <span className={classes.buttonText}>
                                Category
                            </span>
                            </Button>
                            <Button
                                variant={"contained"}
                                style={buttonStyle}
                            >
                                <Image src={'/icons/Store_gray.png'} width={18} height={18}/>
                                <span className={classes.buttonText}>
                                Stores
                            </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </CollapseOnScroll>
    </>
}
