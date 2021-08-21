import {React,useState} from 'react';
import './custommodal.css';
import {currentuser} from '../loginpage'

//material UI
import {Modal,Button,Radio,RadioGroup,FormControl,FormControlLabel,FormGroup,Checkbox} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

//graphql
import { graphql} from 'react-apollo';
import { getCustomsQuery,addOrderMutation,getSpecificOrdersQuery } from '../../queries/queries';
import {flowRight as compose} from 'lodash';

function CustomModal(params) {
    const [open, setOpen] = useState(false);

    // ! custom1id not holding value on preselected custom. and post throwing error as a result.
    //TODO somehow fix this error

    let custom1id=(params?.data?.customs?.customcatId1?.customlist?.[0]?.id)?(params?.data?.customs?.customcatId1?.customlist?.[0]?.id):'61141d4f8e54f94e839a3d52';
    let custom1price=params?.data?.customs?.customcatId1?.customlist?.[0]?.price;
    let custom2id='61141d4f8e54f94e839a3d52';
    let custom2price=0;


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addtocart = async () => {
        params?.getCustomsQuery?.customs?.customcatId1?.customlist?.map((_data)=>{
            if(_data.id===custom1id){
                custom1price=_data.price;
                return 0;
            }
            else{
                return 0;
            }
        });
        if(params?.getCustomsQuery?.customs?.customcatId2?.customlist[0]===custom2id){
            custom2price=params?.getCustomsQuery?.customs?.customcatId2?.customlist[0]
        }
        else if(custom2id==='61141d4f8e54f94e839a3d52'){
            custom2price=0;
        }

        const _order= await params.addOrderMutation({
            variables: {
                userId: currentuser.id,
                dishId: params.getCustomsQuery.customs.id,
                customizationId1: custom1id,
                customizationId2: custom2id,
                showprice: `${params.getCustomsQuery.customs.showprice}`,
                finalprice: `${params.getCustomsQuery.customs.baseprice+custom1price+custom2price}`,
                status: "pending"
            },
            refetchQueries: [{ 
                query: getSpecificOrdersQuery,
                variables: {
                    userId: currentuser.id,
                    status: "pending",
                }    
            }]
        });
        handleClose();
    };  

    //Material UI styling
    const CustomizationList = withStyles({
        root:{
            width:"100%",
        },
    })(FormControl);
    const CustomControlLabel = withStyles({
        root:{
            width:"100%",
            paddingRight:"20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
    })(FormControlLabel);

    const body=(
        <div className="modalbody">
            <div className="customdishinfo">
                <div className="dishname">{params?.getCustomsQuery?.customs?.name}</div>
                <div className="dishdescrip">{params?.getCustomsQuery?.customs?.description}</div>
            </div> 
            <div 
            className={(params?.getCustomsQuery?.customs?.customcatId1?.name!=="NONE")?"customcat":"dontshow"}
            >
                <div className="customcatname">{params?.getCustomsQuery?.customs?.customcatId1?.name}</div>
                <CustomizationList component="fieldset">
                <RadioGroup column="true" name="custom1" defaultValue={params?.getCustomsQuery?.customs?.customcatId1?.customlist?.[0]?.id}
                onChange={(e)=>{
                    if(e.target.checked){
                        // setCustom1id(e.target.value);
                        custom1id=e.target.value;
                        console.log(e.target.value1);
                    }
                }}
                >
                {   
                    params?.getCustomsQuery?.customs?.customcatId1?.customlist?.map((_data,idx)=>{
                        return(
                            <div className="customres" key={idx}>
                            <CustomControlLabel
                            value={_data.id}
                            control={<Radio color="secondary"/>}
                            label={
                                <div className="customresli">
                                    <div>{_data.name}</div>
                                    <div>{_data.price}</div>
                                </div>
                            }
                            labelPlacement="start"
                            />
                            </div>
                        )
                    })
                }
                </RadioGroup>
                </CustomizationList>
            </div>
            <div 
            className={(params?.getCustomsQuery?.customs?.customcatId2?.name!=="NONE")?"customcat":"dontshow"}
            >
                <div className="customcatname">{params?.getCustomsQuery?.customs?.customcatId2?.name}</div>
                <CustomizationList component="fieldset">
                <FormGroup column="true"
                onChange={(e)=>{
                    if(e.target.checked){
                        custom2id=e.target.value;
                    }
                    else{
                        custom2id='61141d4f8e54f94e839a3d52';
                    }
                }}
                >
                    <div className="customres">
                        <CustomControlLabel
                        value={params?.getCustomsQuery?.customs?.customcatId2?.customlist[0]?.id}
                        control={<Checkbox color="secondary"/>}
                        label={
                            <div className="customresli">
                                <div>{params?.getCustomsQuery?.customs?.customcatId2?.customlist[0]?.name}</div>
                                <div>{params?.getCustomsQuery?.customs?.customcatId2?.customlist[0]?.price}</div>
                            </div>
                        }
                        labelPlacement="start"
                        />
                    </div>
                </FormGroup>
                </CustomizationList>
            </div>
            <Button style={{marginTop:'1rem'}}  variant="outlined" color="secondary" 
            onClick={()=>addtocart()}
            >
                <ShoppingCartOutlinedIcon/>Add to Cart
            </Button>
        </div>
    )

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen} color="secondary">
                <Add/>
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            >
            {body}
            </Modal>
        </div>
    )
}

export default compose(
    graphql(getCustomsQuery, {
        options: (params) => {
            return {
                variables: {
                    id: params.dishId
                }
            }
        },
        name : 'getCustomsQuery',
    }),
    graphql(addOrderMutation, {name:'addOrderMutation'}),
)(CustomModal);