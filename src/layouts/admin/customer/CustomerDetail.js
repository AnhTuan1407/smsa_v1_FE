import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as customerService from "../../../services/admin/CustomerService";
import { toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner';

const CustomerDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [customer, setCustomer] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await customerService.findById(id);
                setCustomer(response);
            } catch (error) {
                toast.error("Có lỗi xảy ra: " + error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {customer ? (
                <div id="wp-customer-detail">
                    <div className="customer-detail-container">
                        <div className="title">
                            CHI TIẾT THÔNG TIN KHÁCH HÀNG
                        </div>

                        <div className="content">
                            <div>
                                <label>Name</label>
                                {customer.NAME}
                            </div>

                            <div>
                                <label>Email</label>
                                {customer.EMAIL}
                            </div>

                            <div>
                                <label>Phone</label>
                                {customer.PHONE}
                            </div>

                            <div>
                                <label>Address</label>
                                {customer.ADDRESS}
                            </div>

                            <div>
                                <label>Gender</label>
                                {customer.GENDER}
                            </div>

                            <div>
                                <label>Date of birth</label>
                                {customer.DATE_OF_BIRTH}
                            </div>

                            <div>
                                <label>Points</label>
                                {customer.POINTS}
                            </div>
                        </div>

                        <div>
                            <button onClick={() => navigate('/admin/customers/list')}>
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="form-group">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            )}
        </>
    );
};

export default CustomerDetail;