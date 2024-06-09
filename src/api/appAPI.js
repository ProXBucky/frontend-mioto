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

const getAllReviewOfCar = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/api/review/${carId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllReviewByCity = async (cityCode) => {
    try {
        const response = await axios.get(`${API_URL}/api/review/city/${cityCode}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getReviewScore = async (carId) => {
    try {
        // const response = await axios.get(`${API_URL}/api/review/reviewScore/${carId}`)
        const response = await axios.get(`${API_URL}/api/car/statistic/${carId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllVoucherByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/api/voucher/${userId}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getInformationUserById = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllTripByUserId = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/all-trip/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getTripByRentId = async (rentId, token) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/detail-trip/${rentId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const checkStatusRent = async (carId, beginDate, endDate) => {
    try {
        const response = await axios.get(`${API_URL}/api/rent/check-status?carId=${carId}&beginDate=${beginDate}&endDate=${endDate}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

const getAllUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/user`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getAllAdmin = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export {
    getAllCarFeature, checkLikeCar, getAllCarLiked, getAllReviewOfCar, getAllReviewByCity, getReviewScore, getAllVoucherByUserId, getInformationUserById, getAllTripByUserId,
    getTripByRentId, checkStatusRent, getAllUser, getAllAdmin
}