import axios from "axios";
const BASE_URL = "http://localhost:8080/api/client/booking";

export const findAll = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/findAll`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

export const findById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/findById/${id}`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

export const create = async (values) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, values);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

export const edit = async (id, values) => {
    try {
        const response = await axios.put(`${BASE_URL}/edit/${id}`, values);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

export const remove = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

export const findByStaff = async (staffId) => {
    try {
        const response = await axios.get(`${BASE_URL}/findByStaff/${staffId}`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

export const findByCustomer = async (customerId) => {
    try {
        const response = await axios.get(`${BASE_URL}/findByCustomer/${customerId}`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu phản hồi!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
};