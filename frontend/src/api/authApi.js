import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}login/`, credentials);
        
        return response.data;
    } catch (error) {
        console.error("Błąd podczas logowania:", error.response?.data || error.message);
        throw error;
    }
};