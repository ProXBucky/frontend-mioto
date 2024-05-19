import axios from 'axios';

const API_URL = 'http://localhost:3000'

const getAllCarFeature = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/feature`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const checkLikeCar = async (userId, carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/like/checkLike?userId=${userId}&carId=${carId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllCarLiked = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/like/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export { getAllCarFeature, checkLikeCar, getAllCarLiked }