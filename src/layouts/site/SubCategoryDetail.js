import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/css/site/subcategory/detail.css';
import * as service from '../../services/admin/Service';
import * as subCategoryService from '../../services/admin/SubCategory';
import { toast } from 'react-toastify';

const SubCategoryDetail = () => {
    const [services, setServices] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const { id } = useParams(); // Lấy ID của SubCategory từ URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await service.findAll();
                if (response.success) {
                    // Lọc các dịch vụ thuộc subCategory có ID tương ứng
                    const filteredServices = response.data.filter(
                        (item) => item.SUB_CATEGORY_ID === parseInt(id)
                    );
                    setServices(filteredServices);
                } else {
                    console.error('Unable to load service list!');
                }
            } catch (error) {
                toast.error('Error loading service list: ' + error.message);
            }
        };

        const fetchSubCategory = async () => {
            try {
                const response = await subCategoryService.findById(id);
                if (response) {
                    setSubCategory(response);
                } else {
                    console.error('Unable to load subCategory!');
                }
            } catch (error) {
                toast.error('Error loading subCategory: ' + error.message);
            }
        }

        fetchServices();
        fetchSubCategory();
    }, [id]);

    return (
        <div id="wp-hair-cut">
            <div className="hair-cut-title">
                <div className="title">{subCategory.NAME}</div>
                <div className="sub-title">
                    {subCategory.DESCRIPTION}
                </div>
            </div>

            <div className="hair-cut-list">
                <ul>
                    {services.length > 0 ? (
                        services.map((service) => (
                            <li key={service.SERVICE_ID}>
                                <div className="hair-cut-item" onClick={() => navigate('/client/service/detail')}>
                                    <div className="content">
                                        <div className="item-info">
                                            <div className="title">{service.NAME}</div>
                                            <div class="sub-title">
                                                Combo cắt kỹ
                                                <br></br>
                                                Combo gội massage
                                            </div>
                                        </div>
                                        <div className="item-img">
                                            {service.IMAGE ? (
                                                <img
                                                    src={`data:image/jpeg;base64,${service.IMAGE}`}
                                                    alt={service.NAME}
                                                />
                                            ) : (
                                                <div>No Image</div>
                                            )}
                                        </div>
                                        <div className="item-description">
                                            <div className="time-estimate">{service.ESTIMATE_TIME} phút</div>
                                            <div className="more">Tìm hiểu thêm</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div>Không có dịch vụ nào!</div>
                    )}
                </ul>
            </div>

            <div className="btn-booking">
                <div className="content">
                    <a href="/client/booking">ĐẶT LỊCH NGAY</a>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryDetail;
