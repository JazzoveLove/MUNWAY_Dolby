import axiosInstance from "./axiosConfig";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/products/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProcutById = async (id) => {
    try {
        const response = await axiosInstance.get(`/products/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

