import axios from 'axios';

export const findAll = async (values) => {
    try {
        const response = await axios.get('http://localhost:8080/api/admin/subCategory/findAll');

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
        const response = await axios.post('http://localhost:8080/api/admin/subCategory/create', values);

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