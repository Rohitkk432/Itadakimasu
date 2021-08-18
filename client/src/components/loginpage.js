import {React} from 'react';
import './loginpage.css';

import {useHistory} from 'react-router-dom';

//graphql
import { graphql} from 'react-apollo';
import { getUsersQuery, addUserMutation } from '../queries/queries';
import {flowRight as compose} from 'lodash';

//Google login library
import { GoogleLogin } from 'react-google-login';

var currentuser;

function Loginpage(params) {

    let history = useHistory();

    const onSuccess =async(res)=>{
        const loggeremail = res.profileObj.email;
        const loggername = res.profileObj.name;
        loggerfunc(loggeremail,loggername);
        history.push('/home');
    }

    const onFailure =(res)=>{
        console.log(res);
    }

    async function loggerfunc(loggeremail,loggername){
        if(params.getUsersQuery.users.length!==0){
            params.getUsersQuery.users.map((_data)=>{
                console.log("map");
                if(_data.email===loggeremail){
                    console.log("if");
                    currentuser=_data;
                    return 0;
                }
                else{
                    console.log("else");
                    currentuser = params.addUserMutation({
                        variables: {
                            name: loggername,
                            email: loggeremail,
                        },
                    });
                    return 0;
                }
            })
        }
        else{
            console.log("outer else");
            currentuser = await params.addUserMutation({
                variables: {
                    email: loggeremail,
                    name: loggername,
                },
            });
            return 0;
        }
    }

    return (
        <div className="loginpage" >
            <div className="loginbtn">
                <GoogleLogin
                    clientId="984297458880-30fb652n9c5c81ckaheak1hp7brv7qp4.apps.googleusercontent.com"
                    buttonText="Login using BITS mail"
                    prompt="select_account"
                    uxMode="popup"
                    redirectUri="http://localhost:3000/home"
                    isSignedIn={true}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </div>            
        </div>
    )
}

export {currentuser};

export default compose(
    graphql(getUsersQuery, {name: "getUsersQuery" }),
    graphql(addUserMutation, {name: "addUserMutation"}),
)(Loginpage);