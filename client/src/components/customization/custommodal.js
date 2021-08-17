import {React,useState} from 'react';
import './custommodal.css';

//material UI
import {Modal,Button,Radio,RadioGroup,FormControl,FormControlLabel,FormGroup,Checkbox} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

//graphql
import { graphql} from 'react-apollo';
import { getCustomsQuery } from '../../queries/queries';

function CustomModal(params) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                <div className="dishname">{params?.data?.customs?.name}</div>
                <div className="dishdescrip">{params?.data?.customs?.description}</div>
            </div> 
            <div 
            className={(params?.data?.customs?.customcatId1?.name!=="NONE")?"customcat":"dontshow"}
            >
                <div className="customcatname">{params?.data?.customs?.customcatId1?.name}</div>
                <CustomizationList component="fieldset">
                <RadioGroup column="true" name="custom1" defaultValue={params?.data?.customs?.customcatId1?.customlist?.[0]?.id}>
                {
                    params?.data?.customs?.customcatId1?.customlist?.map((_data,idx)=>{
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
            className={(params?.data?.customs?.customcatId2?.name!=="NONE")?"customcat":"dontshow"}
            >
                <div className="customcatname">{params?.data?.customs?.customcatId2?.name}</div>
                <CustomizationList component="fieldset">
                <FormGroup column="true">
                    <div className="customres">
                        <CustomControlLabel
                        value={params?.data?.customs?.customcatId2?.customlist[0]?.id}
                        control={<Checkbox color="secondary"/>}
                        label={
                            <div className="customresli">
                                <div>{params?.data?.customs?.customcatId2?.customlist[0]?.name}</div>
                                <div>{params?.data?.customs?.customcatId2?.customlist[0]?.price}</div>
                            </div>
                        }
                        labelPlacement="start"
                        />
                    </div>
                </FormGroup>
                </CustomizationList>
            </div>
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

export default  graphql(getCustomsQuery, {
        options: (params) => {
            return {
                variables: {
                    id: params.dishId
                }
            }
        },
    })(CustomModal);