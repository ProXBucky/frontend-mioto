import axios from 'axios';

const API_URL = 'http://localhost:3000'

const getInformationUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/user/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const editInformationUserById = async (userId, body) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/${userId}`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const changePasswordUserById = async (userId, body) => {
    try {
        const response = await axios.put(`${API_URL}/api/user/change-password/${userId}`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getInformationLicenseById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/license/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const postInformationLicenseById = async (userId, body) => {
    try {
        const response = await axios.post(`${API_URL}/api/license/${userId}`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const postAddress = async (userId, body) => {
    try {
        const response = await axios.post(`${API_URL}/api/address/${userId}`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllAddressByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/address/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const deleteAddress = async (addressId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/address/${addressId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export {
    getInformationUserById, changePasswordUserById, editInformationUserById, getInformationLicenseById, postInformationLicenseById,
    postAddress, getAllAddressByUserId, deleteAddress
}
