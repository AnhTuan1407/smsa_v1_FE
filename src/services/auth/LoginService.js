import axios from "axios";

export const login = async (values) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', values);

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Không có token trong phản hồi');
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Có lỗi xảy ra!');
        }
    }
};
