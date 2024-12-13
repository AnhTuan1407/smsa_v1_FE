import { useParams } from "react-router-dom";
import * as staffService from '../../../services/admin/StaffService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';


const StaffDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [staffData, setStaffData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await staffService.findById(id);
                if (response) {
                    setStaffData(response);
                } else {
                    toast.error("Không tìm thấy nhân viên này!");
                    navigate('/admin/staff/list');
                }
            } catch (error) {
                toast.error("Không thể tải dữ liệu! " + error.message);
            }
        };

        fetchData();
    }, [id])

    if (!staffData) {
        return (
            <div className="loading-wrapper">
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
        );
    }
    return (

        <>
            <div id="wp-staff-detail">
                <div className="staff-detail-container">
                    <div className="title">
                        THÔNG TIN CHI TIẾT NHÂN VIÊN
                    </div>

                    <div className="content">
                        <div>
                            <label>NAME</label>
                            {staffData.NAME}
                        </div>

                        <div>
                            <label>EMAIL</label>
                            {staffData.EMAIL}
                        </div>

                        <div>
                            <label>GENDER</label>
                            {staffData.GENDER}
                        </div>

                        <div>
                            <label>PHONE</label>
                            {staffData.PHONE}
                        </div>

                        <div>
                            <label>ADDRESS</label>
                            {staffData.ADDRESS}
                        </div>

                        <div>
                            <label>ROLE</label>
                            {staffData.ROLE}
                        </div>

                        <div>
                            <label>RATING</label>
                            {staffData.RATING}
                        </div>

                        <div>
                            <label>LOCATION_ID</label>
                            {staffData.LOCATION_ID}
                        </div>

                        <div>
                            <label>IMAGE</label>
                            {staffData.IMAGE ? (
                                <img
                                    src={`data:image/jpeg;base64,${staffData.IMAGE}`}
                                    alt={staffData.NAME}
                                    className="staff-image"
                                />
                            ) : (
                                'No Image'
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffDetail;