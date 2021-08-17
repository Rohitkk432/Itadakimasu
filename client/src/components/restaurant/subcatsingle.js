import {React,useState} from 'react';
import './subcatsingle.css'

//components
import CustomModal from '../customization/custommodal';

//material UI
import {List,ListItem,ListItemText,Collapse} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

//graphql
import { graphql} from 'react-apollo';
import { getDishbysubQuery } from '../../queries/queries';

function Subcatsingle(params) {
    const [open, setOpen] = useState(true);
    const subcatname= params.head;

    //Material UI styling
    const Subcat = withStyles({
        root:{
            margin:"0.5rem",
            width:"95%",
            borderRadius:"10px",
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            boxShadow: '0 3px 5px 2px rgba(0,0,0, .2)',
        },
    })(ListItem);
    const Dish = withStyles({
        root:{
            margin:"0.5rem",
            width:"93%",
            borderRadius:"6px",
            border:"rgba(255, 105, 135, .7) solid 1px",
            borderLeft:"rgba(255, 105, 135, .7) solid 20px",
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            // boxShadow: '0 3px 5px 2px rgba(0,0,0, .2)',
        },
    })(ListItem);
    

    return (
        <>
            <Subcat button onClick={()=>setOpen(!open)}>
                <ListItemText primary={subcatname} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </Subcat>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {   
                    params.data?.dishbysub?.map((_data,idx)=>{
                        return(
                            <div key={idx}>
                                <List component="div" disablePadding>
                                    <Dish>
                                        <ListItemText primary={
                                            <div className="dishinfo">
                                                <div>{_data.name}</div>
                                                <div>{_data.showprice}</div>
                                            </div>
                                        } />
                                        <CustomModal dishId={_data.id} />
                                    </Dish>
                                </List>
                            </div>
                        )
                    })
                }
            </Collapse>
        </>
    )
}

export default  graphql(getDishbysubQuery, {
        options: (params) => {
            return {
                variables: {
                    subcategory: params.head
                }
            }
        },
    })(Subcatsingle);