import {React,useState} from 'react';
import './chekoutpage.css'
import Nav from './mainpage/nav';
import {currentuser} from './loginpage';
import {useHistory} from 'react-router-dom';

//graphql
import { graphql } from 'react-apollo';
import { payOrder,getSpecificOrdersQuery } from '../queries/queries';
// import {flowRight as compose} from 'lodash';

//components
import Orders from './order/orders';

//Material UI
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

function CheckoutPage(params) {

    let history = useHistory();

    const [totalbill,setTotalbill]=useState(0);

    const Checkoutbtn = withStyles({
        root:{
            width:"10rem",
            height:"3rem",
            margin:"0.5rem"
        },
    })(Button);

    function PayTheOrder(userId){
        params.payOrder({
            variables: {
                userId:userId,
            },
            refetchQueries: [{ 
                query: getSpecificOrdersQuery,
                variables: {
                    userId: currentuser.id,
                    status: 'pending',
                }
            }]
        })
        history.push('/delivery')
    }

    return (
        <>
            <Nav/>
            <div className="orderscheckoutpage">
                <div className="listsoforders">
                    <div className="orderlisthead">Checkout</div>
                    <div className='orderslistcheckoutpage' >
                        <Orders userId={currentuser?.id} status="pending" totaller={[totalbill,setTotalbill]} hider={false} />
                    </div>
                </div>
                <div className="payment">
                    <div className="paymentcard">
                        <div className="priceofpayment">
                            {`Total:${totalbill}`}
                        </div>
                        <div className="paymenttaxinfo">
                            inclusive of all taxes (dummy payment)
                            <br/>
                            <br/>
                            Delivery address: BITS Pilani Goa campus
                        </div>
                        <Checkoutbtn onClick={()=>PayTheOrder(currentuser.id)} variant="outlined" color="secondary">
                            <AccountBalanceWalletOutlinedIcon/>Checkout
                        </Checkoutbtn>
                    </div>
                </div>
            </div>
        </>
    )
}

export default graphql(payOrder,{name:'payOrder'})(CheckoutPage);