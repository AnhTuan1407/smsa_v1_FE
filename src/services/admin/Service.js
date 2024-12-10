import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/admin/services";

export const findAll = async (values) => {
    try {
        const response = await axios.get(`${BASE_URL}/findAll`);

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Có lỗi xảy ra!');
        }
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
            throw new Error(error.response.data.message || 'Có lỗi xảy ra!');
        }
    }
};

export const findById = async (id) => {
    try {
        if (!id) {
            throw new Error("Không tìm thấy ID!");
        }

        const response = await axios.get(`${BASE_URL}/detail/${id}`);

        if (response.data) {
            return response.data.data;
        } else {
            throw new Error("Không có dữ liệu phản hồi từ server!");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Có lỗi xảy ra từ server!");
        } else {
            throw new Error(error.message || "Không thể kết nối tới server!");
        }
    }
};


export const update = async (id, values) => {
    try {
        const response = await axios.put(`${BASE_URL}/edit/${id}`, values);
        if (response.data) {
            return response.data;
        } else {
            throw new Error("Không nhận được dữ liệu phản hồi!");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Có lỗi xảy ra trong quá trình cập nhật!");
        }
        throw new Error("Lỗi kết nối đến server!");
    }
};

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`);
        if (response.data) {
            return response.data;
        } else {
            throw new Error("Không nhận được dữ liệu phản hồi!");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Có lỗi xảy ra trong quá trình cập nhật!");
        }
        throw new Error("Lỗi kết nối đến server!");
    }
};