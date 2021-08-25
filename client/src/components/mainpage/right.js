import {React,useState} from 'react';
import './right.css';
import {currentuser} from '../loginpage';

//material UI
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

//components
import Orders from '../order/orders';

function Right() {

    const [totalbill,setTotalbill]=useState(0);

    const Checkoutbtn = withStyles({
        root:{
            width:"90%",
            height:"3rem",
            margin:"0.5rem"
        },
    })(Button);

    return (
        <div className="right">
            <div className="righthead">Orders</div>
            <Orders userId={currentuser?.id} status="pending" totaller={[totalbill,setTotalbill]} 
            hider={false}/>
            <Checkoutbtn variant="outlined" color="secondary">
                <AccountBalanceWalletOutlinedIcon/>Checkout
            </Checkoutbtn>
        </div>
    )
}

export default Right;