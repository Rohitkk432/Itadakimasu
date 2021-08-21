import React from 'react';
import './right.css';
import {currentuser} from '../loginpage';

//components
import Orders from '../order/orders';

function Right() {
    return (
        <div className="right">
            <div className="righthead">Orders</div>
            <Orders userId={currentuser?.id} status="pending" />
        </div>
    )
}

export default Right;