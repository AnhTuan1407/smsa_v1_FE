import { useParams } from "react-router-dom";
import * as service from '../../../services/admin/Service';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import "../../../styles/css/admin/service/detail.css";


const ServiceDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [serviceData, setServiceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serviceResponse = await service.findById(id);
                if (serviceResponse) {
                    setServiceData(serviceResponse);
                } else {
                    toast.error("Không tìm thấy dịch vụ này!");
                    navigate('/admin/services/list');
                }
            } catch (error) {
                toast.error("Không thể tải dữ liệu! " + error.message);
            }
        };

        fetchData();
    }, [id])

    if (!serviceData) {
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
            <div id="wp-service-detail">
                <div className="service-detail-container">
                    <div className="title">Chi tiết dịch vụ</div>

                    <div className="service-detail-content">
                        <div>
                            <label>Tên dịch vụ</label>
                            {serviceData.NAME}
                        </div>

                        <div>
                            <label>Danh mục</label>
                            {serviceData.SUB_CATEGORY_ID}
                        </div>

                        <div>
                            <label>Hình ảnh</label>
                            {serviceData.IMAGE ? (
                                <img
                                    src={`data:image/jpeg;base64,${serviceData.IMAGE}`}
                                    alt={serviceData.NAME}
                                    className="service-image"
                                />
                            ) : (
                                'No Image'
                            )}
                        </div>

                        <div>
                            <label>Thời gian ước tính</label>
                            {serviceData.ESTIMATE_TIME}
                        </div>

                        <div>
                            <label>Giá</label>
                            {serviceData.PRICE}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;