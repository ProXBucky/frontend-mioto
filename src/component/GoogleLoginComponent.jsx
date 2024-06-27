import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent = () => {
    const responseGoogle = (response) => {
        axios.post('http://localhost:3000/auth/google/callback', {
            tokenId: response.credential,
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error('Error logging in with Google', error);
            });
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginComponent;
