import axios from "axios";
const BASE_URL = "http://localhost:8080/api/admin/schedule";

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