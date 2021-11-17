import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import ChatIcon from '@material-ui/icons/Chat';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import {useRouter} from "next/router";

const useStyles = makeStyles({
    root: {
        width: '100%',
        '& .MuiBottomNavigationAction-root': {
            padding: '6px 0px 8px',
            minWidth: '70px'
        }
    }
});

export default function MobileBottomNavigation() {
    const classes = useStyles();
    const router = useRouter();

    const [value, setValue] = React.useState('/' + router.route.split('/')[1]);

    console.log(router)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        router.push(`${newValue}`, undefined, { shallow: true })
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels color="green">
            <BottomNavigationAction label="Main" value="/" icon={<HomeIcon />} />
            <BottomNavigationAction label="Stores" value="/stores" icon={<ViewListIcon />} />
            <BottomNavigationAction label="Chat" value="/chat" icon={<ChatIcon />} />
            <BottomNavigationAction label="Busket" value="/cart" icon={<ShoppingCartIcon />} />
            <BottomNavigationAction label="Profile" value="/profile" icon={<PersonIcon />} />
        </BottomNavigation>
    );
}
