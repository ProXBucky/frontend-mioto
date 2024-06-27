import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const FacebookLoginComponent = () => {
    const responseFacebook = (response) => {
        const { accessToken, userID } = response;

        // Gọi API sau khi đăng nhập thành công
        axios.post('http://example.com/api/user/login', { accessToken, userID })
            .then(response => {
                console.log('API Response:', response.data);
                // Xử lý kết quả từ API tại đây
            })
            .catch(error => {
                console.error('Error calling API:', error);
                // Xử lý lỗi tại đây
            });
    };

    return (
        <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            icon="fa-facebook"
        />
    );
};

export default FacebookLoginComponent;
