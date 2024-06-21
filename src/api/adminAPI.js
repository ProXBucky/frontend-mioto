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
        const response = await axios.post(`${API_URL}/api/user/admin-role/create-new-user`, body,
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

const findInformationAdminById = async (adminId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/${adminId}`,
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

const createNewAdmin = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin`, body,
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

const editInformationAdminById = async (adminId, body, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/${adminId}`, body, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const changePasswordAdmin = async (userId, password, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/action/change-password`,
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

const confimCarByAdmin = async (carId, token) => {
    try {
        const response = await axios.put(`${API_URL}/api/car/confirm-car/${carId}`, {},
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

const createNewVoucher = async (body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/voucher`, body,
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

const deleteVoucher = async (voucherId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/voucher/${voucherId}`,
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

const feedVoucherToUser = async (voucherId, body, token) => {
    try {
        const response = await axios.post(`${API_URL}/api/voucher/feed-voucher/${voucherId}`,
            body,
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

const deleteReviewByReviewId = async (reviewId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/api/review/${reviewId}`,
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
    changePasswordUser, createNewUserByAdmin, findInformationAdminById, createNewAdmin, editInformationAdminById, changePasswordAdmin,
    confimCarByAdmin, createNewVoucher, deleteVoucher, feedVoucherToUser, deleteReviewByReviewId
}