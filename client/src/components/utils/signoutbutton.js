import React from "react";
import { GoogleLogout, useGoogleLogout } from 'react-google-login';
import {useHistory} from 'react-router-dom';

function SignoutButton() {
    let history = useHistory();

    const client_id = "613837933722-aa2cek4rpl3svh1od26c1a50msnvq7j8.apps.googleusercontent.com";

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