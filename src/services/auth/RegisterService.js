import axios from "axios";

export const doRegister = async (values) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/register', values);

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