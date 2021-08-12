import React from 'react';
import './subcat.css'

//graphql
import { graphql} from 'react-apollo';
import { getSubCategoryQuery } from '../../queries/queries';

//material UI
// import ListSubheader from '@material-ui/core/ListSubheader';
// import {List,ListItem,ListItemIcon,ListItemText,Collapse} from '@material-ui/core';

function Subcat(params) {

    const subcategories=[];

    return (
        <div className='subcat'>
            {   
                params.data.subcategories?.map((_data,idx)=>{
                    if(!subcategories.includes(_data.subcategory)){
                        subcategories.push(_data.subcategory);
                        return(
                            <div key={idx}>
                                {_data.subcategory}
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className="hidden" key={idx}></div>
                        )
                    }
                })
            }
        </div>
    )
}

export default graphql(getSubCategoryQuery, {
        options: (params) => {
            return {
                variables: {
                    category: params.category
                }
            }
        },
    })(Subcat);
