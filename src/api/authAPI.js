import axios from 'axios';

const API_URL = 'http://localhost:3000'

const loginUser = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const logoutUser = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/logout`, body)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { loginUser, logoutUser }