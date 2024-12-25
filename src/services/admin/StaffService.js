import axios from "axios";
const BASE_URL = "http://localhost:8080/api/admin/staff";

export const findAll = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/findAll`);

        if (response.data) {
            return response.data;
        } else {
            throw new Error("Không có dữ liệu trả về!");
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
            throw new Error("Không có dữ liệu trả về!");
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
        const response = await axios.get(`${BASE_URL}/detail/${id}`);

        if (response.data) {
            return response.data;
        } else {
            throw new Error("Không có dữ liệu trả về!");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }

        throw new Error("Có lỗi xảy ra!");
    }
};

export const edit = async (values, id) => {
    try {
        const response = await axios.put(`${BASE_URL}/edit/${id}`, values);

        if (response.data) {
            return response.data;
        } else {
            throw new Error("Không có dữ liệu trả về!");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }

        throw new Error("Có lỗi xảy ra!");
    }
};

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`);

        if (response.data) {
            return response.data;
        } else {
            throw new Error("Không có dữ liệu trả về!");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
}