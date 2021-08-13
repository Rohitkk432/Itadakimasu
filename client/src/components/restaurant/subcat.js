import {React} from 'react';
import './subcat.css'

//components
import Subcatsingle from './subcatsingle';
import { Scrollbars } from 'react-custom-scrollbars';

//graphql
import { graphql} from 'react-apollo';
import { getSubCategoryQuery } from '../../queries/queries';

//material UI
import {List} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function Subcat(params) {

    const subcategories=[];

    //Material UI styling
    const SubcatList = withStyles({
        root:{
            margin:"1rem",
            width:"95%",
            borderRadius:"4px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            // boxShadow: '0 3px 5px 2px rgba(0,0,0, .2)',
        },
    })(List);

    return (
        <div className='subcat'>
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
            <SubcatList>
                {   
                    params.data?.subcategories?.map((_data,idx)=>{
                        if(!subcategories.includes(_data.subcategory)){
                            subcategories.push(_data.subcategory);
                            return(
                                <div className="subcatitem" key={idx}>
                                    <Subcatsingle head={_data.subcategory}/>
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
            </SubcatList>
            </Scrollbars>
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
