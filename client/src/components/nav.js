import React from 'react';

//material UI
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function Nav() {

    //styling
    const NavLink = withStyles({
        root:{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'primary',
            height: "2.5rem",
            padding: '0 30px',
            margin:'0.5rem',
        },
    })(BottomNavigationAction);
    const NavContainer = withStyles({
        root:{
            width:"100vw",
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'primary',
            height: "3.5rem",
            display:'flex',
            justifyContent:"flex-start",
            alignItems:"center",
        },
    })(BottomNavigation);


    return (
        <>
            <NavContainer>
                <NavLink label="Recents" value="recents" icon={<HomeIcon />} />
                <NavLink label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <NavLink label="Delivery" value="Delivery" icon={<LocationOnIcon />} />
                <NavLink label="checkout" value="checkout" icon={<ReceiptIcon />} />
            </NavContainer>
        </>
    )
}

export default Nav;