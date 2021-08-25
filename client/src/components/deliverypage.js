import {React,useState} from 'react';
import './chekoutpage.css'
import Nav from './mainpage/nav';
import {currentuser} from './loginpage';

//components
import Orders from './order/orders';

function Deliverypage() {

    const [totalbill,setTotalbill]=useState(0);

    return (
        <>
            <Nav/>
            <div className="orderscheckoutpage">
                <div className="listsoforders">
                    <div className="orderlisthead">Orders</div>
                    <div className='orderslistcheckoutpage' >
                        <Orders userId={currentuser?.id} status="payed" totaller={[totalbill,setTotalbill]} hider={true} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deliverypage;