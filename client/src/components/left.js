import {React,useState} from 'react';
import './left.css';

//components
import Restpage from './restaurant/restpage';

//Material UI
import {TextField,Card,CardContent,CardActions,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

//graphql
import { graphql } from 'react-apollo';
import { getRestaurants } from '../queries/queries';

function Left(params) {

    const [search, setSearch] = useState("");
    const [hide,sethide]=useState(false);
    const [restId,setrestId]=useState("611431608e54f94e839a3d59");

    function filterRest(e){
        setSearch(e.target.value);
    };
    function openingRest(e){
        setrestId(e.target.value);
        sethide(true);
    };
    // console.log(params.data.restaurants);

    const RestResults = withStyles({
        root:{
            margin:"1rem",
            width:"40rem",
            height:"3.5rem",
            borderRadius:"4px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            paddingLeft:"1rem",
            paddingRight:"1rem",
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
    })(Card);
    const ResultInfo = withStyles({
        root:{
            width:"85%",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
        },
    })(CardContent);

    return (
        <div className="left">
            <div className="searchbar">
                <TextField
                fullWidth margin="normal"
                color="secondary" id="search" label="Search"
                variant="outlined" size="small"
                onChange={filterRest}
                onClick={()=>{
                    sethide(false);
                    setrestId("611431608e54f94e839a3d59");
                }}
                />
            </div>
            <div className={(hide)?"hidden":""}>
            {   
                params.data.restaurants?.map((_data,idx)=>{
                    if(_data.name.toLowerCase().includes(search.toLowerCase())){
                        return(
                            <div key={idx}>
                                <RestResults>
                                    <ResultInfo>
                                        <div>{_data.name}</div>
                                        <div>{_data.pricing}</div>
                                        <div>{_data.location}</div>
                                    </ResultInfo>
                                    <CardActions>
                                        <Button onClick={openingRest} variant="outlined" color="secondary" value={_data.id}>
                                            <KeyboardArrowRightIcon/>
                                        </Button>
                                    </CardActions>
                                </RestResults>
                            </div>
                        )
                    }else{
                        return(
                            <div key={idx}></div>
                        )
                    }
                })
            }
            </div>
            <div className={(!hide)?"hidden":""}>
                <Restpage restid={restId} />
            </div>
        </div>
    )
};

export default graphql(getRestaurants)(Left);