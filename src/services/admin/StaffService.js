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

};

export const findById = async (id) => {

};

export const edit = async (values, id) => {

};

export const deleteById = async (id) => {

};