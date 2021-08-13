import {React,useState} from 'react';
import './restpage.css';
import Subcat from './subcat';

//graphql
import { graphql} from 'react-apollo';
import { getRestQuery,getCategoryQuery } from '../../queries/queries';
import {flowRight as compose} from 'lodash';

//material UI
import {Card,CardContent,CardActions,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function Restpage(params) {

    const categories= [];
    const [activecat,setActivecat]=useState("")

    const RestResults = withStyles({
        root:{
            margin:"1rem",
            width:"95%",
            height:"100%",
            borderRadius:"4px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
    })(Card);
    const ResultInfo = withStyles({
        root:{
            width:"85%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            alignItems:"center",
        },
    })(CardContent);
    const ResultActions = withStyles({
        root:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
        },
    })(CardActions);
    const CategoryBtn = withStyles({
        root:{
            width:"10rem",
            margin:"0.5rem"
        },
    })(Button);

    return (
        <div className='restpage'>
            <div className="leftsection">
                <RestResults>
                    <ResultInfo>
                        <div>{params.getRestQuery.restaurant?.name}</div>
                        <div>{params.getRestQuery.restaurant?.pricing}</div>
                    </ResultInfo>
                    <ResultActions>
                        {   
                            params.getCategoryQuery.categories?.map((_data,idx)=>{
                                if(!categories.includes(_data.category)){
                                    if(categories===[]){setActivecat(_data.category);}
                                    categories.push(_data.category);
                                    return(
                                        <div key={idx}>
                                            <CategoryBtn 
                                            onClick={(e)=>
                                            setActivecat(e.target.value)
                                            } variant="outlined" color="secondary" value={_data.category}>
                                                {_data.category}
                                            </CategoryBtn>
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
                    </ResultActions>
                </RestResults>
            </div>
            <div className="rightsection">
                <div className="subcats">
                    <Subcat category={(activecat)?(activecat):(categories[0])?categories[0]:"Veg Pizzas"}/>
                </div>
            </div>
        </div>
    )
}

export default compose(
    graphql(getRestQuery, {
        options: (params) => {
            return {
                variables: {
                    id: params.restid
                }
            }
        },
        name: "getRestQuery" 
    }),
    graphql(getCategoryQuery, {
        options: (params) => {
            return {
                variables: {
                    id: params.restid
                }
            }
        },
        name: "getCategoryQuery" 
    })
)(Restpage);