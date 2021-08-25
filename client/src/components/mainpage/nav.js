import React from 'react';
import {Link} from 'react-router-dom';

//components
import SignoutButton from '../utils/signoutbutton'

//material UI
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
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
            width: "10rem",
            padding: '0 30px',
            margin:'0.5rem',
            marginRight:"2rem",
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
                <Link to='/home'>
                    <NavLink label="Recents" value="recents" icon={<HomeIcon />} />
                </Link>
                <Link to='/checkout'>
                    <NavLink label="checkout" value="checkout" icon={<ReceiptIcon />} />
                </Link>
                <Link to='/delivery'>
                    <NavLink label="Delivery" value="Delivery" icon={<LocationOnIcon />} />
                </Link>
                <SignoutButton/>
            </NavContainer>
        </>
    )
}

export default Nav;