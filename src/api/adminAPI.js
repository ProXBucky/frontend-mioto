import axios from 'axios';
const API_URL = 'http://localhost:3000'


const changePasswordUser = async (userId, password, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/admin-role/change-password`,
            { userId: userId, password: password },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const createNewUserByAdmin = async (body, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/admin-role/create-new-user`, body,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export {
    changePasswordUser, createNewUserByAdmin
}