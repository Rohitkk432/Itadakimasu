import React from "react";
import { GoogleLogout, useGoogleLogout } from 'react-google-login';
import {useHistory} from 'react-router-dom';

function SignoutButton() {
    let history = useHistory();

    const client_id = "984297458880-30fb652n9c5c81ckaheak1hp7brv7qp4.apps.googleusercontent.com";

    const onLogoutSuccess = () =>{
        history.push('/')
    }

    const {signOut} = useGoogleLogout({
        client_id , onLogoutSuccess
    });
    
    return(
        <>
            <GoogleLogout 
            clientId={client_id}
            buttonText="Logout"
            onLogoutSuccess={signOut}
            >
            </GoogleLogout>
        </>
    )
}
export default SignoutButton ;