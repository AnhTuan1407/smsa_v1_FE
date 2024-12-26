import { useParams } from "react-router-dom";
import * as staffService from '../../../services/admin/StaffService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import '../../../styles/css/admin/staff/detail.css';

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
                    toast.error("Staff not found!");
                    navigate('/admin/staff/list');
                }
            } catch (error) {
                toast.error("Unable to load data! " + error.message);
            }
        };

        fetchData();
    }, [id]);

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
        <div className="staff-detail-wrapper">
            <div className="staff-detail-container">
                <div className="staff-title">
                    STAFF DETAIL INFORMATION
                </div>

                <div className="staff-info">
                    <div className="info-row">
                        <label className="info-label">NAME</label>
                        <span className="info-value">{staffData.NAME}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">EMAIL</label>
                        <span className="info-value">{staffData.EMAIL}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">GENDER</label>
                        <span className="info-value">{staffData.GENDER}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">PHONE</label>
                        <span className="info-value">{staffData.PHONE}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">ADDRESS</label>
                        <span className="info-value">{staffData.ADDRESS}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">ROLE</label>
                        <span className="info-value">{staffData.ROLE}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">RATING</label>
                        <span className="info-value">{staffData.RATING}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">LOCATION ID</label>
                        <span className="info-value">{staffData.LOCATION_ID}</span>
                    </div>

                    <div className="info-row">
                        <label className="info-label">IMAGE</label>
                        {staffData.IMAGE ? (
                            <img
                                src={`data:image/jpeg;base64,${staffData.IMAGE}`}
                                alt={staffData.NAME}
                                className="staff-image"
                            />
                        ) : (
                            <span>No Image</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDetail;
