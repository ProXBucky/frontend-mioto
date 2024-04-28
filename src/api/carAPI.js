import axios from 'axios';

const API_URL = 'http://localhost:3000'

const postNewCar = async (userId, body) => {
    try {
        const response = await axios.post(`${API_URL}/api/car/register/${userId}`, body)
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const getListCar = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/owner/${userId}`)
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const getDetailCar = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/car/${carId}`)
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const editCar = async (carId, body) => {
    try {
        const response = await axios.put(`${API_URL}/api/car/edit/${carId}`, body)
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}




export { postNewCar, getListCar, getDetailCar, editCar }