import axios from 'axios';

export const findAll = async (values) => {
    try {
        const response = await axios.get('http://localhost:8080/api/admin/services/findAll');

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