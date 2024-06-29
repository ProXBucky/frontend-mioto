import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from 'axios';

const FacebookLoginComponent = () => {
    const handleResponse = (response) => {
        const { accessToken, userID } = response.profile;

        // Gọi API sau khi đăng nhập thành công
        axios.post('http://localhost:3000/auth/facebook/callback', { accessToken, userID })
            .then(response => {
                console.log('API Response:', response.data);
                // Xử lý kết quả từ API tại đây
            })
            .catch(error => {
                console.error('Error calling API:', error);
                // Xử lý lỗi tại đây
            });
    };

    const handleError = (error) => {
        console.error('Error logging in with Facebook', error);
    };

    return (
        <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID}>
            <LoginButton
                scope="email"
                onCompleted={handleResponse}
                onError={handleError}
            >
                <span>Login with Facebook</span>
            </LoginButton>
        </FacebookProvider>
    );
};

export default FacebookLoginComponent;
