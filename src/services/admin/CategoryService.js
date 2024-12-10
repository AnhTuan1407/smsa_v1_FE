import axios from "axios";
const BASE_URL = "http://localhost:8080/api/admin/category";

export const findAll = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/findAll`);

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu trả về!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Có lỗi xảy ra!');
        }
    }
}

export const create = async (values) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, values);

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu trả về!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Có lỗi xảy ra!');
        }
    }
};

export const edit = async () => {

};

export const findById = async () => {

};

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`);

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có dữ liệu trả về!');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Có lỗi xảy ra!");
        }
    }
};
