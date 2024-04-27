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



export { postNewCar }