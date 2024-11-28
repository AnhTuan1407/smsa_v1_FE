import '../../../styles/css/admin/service/list.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as service from '../../../services/admin/Service';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await service.findAll();
                if (response.success) {
                    setServices(response.data);
                } else {
                    console.error('Không thể tải danh sách dịch vụ');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách dịch vụ:', error.message);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <div className="table-container">

                <div>
                    <button className='edit-btn'>
                        Thêm mới dịch vụ
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length > 0 ? (
                            services.map((service) => (
                                <tr key={service.SERVICE_ID}> {/* Giả định ID là khóa chính */}
                                    <td>{service.NAME}</td>
                                    <td>{service.DESCRIPTION}</td>
                                    <td>{`$${service.PRICE}`}</td>
                                    <td>
                                        {service.IMAGE ? (
                                            <img
                                                src={`data:image/jpeg;base64,${service.IMAGE}`}
                                                alt={service.NAME}
                                                className="service-image"
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => navigate(`/admin/services/edit/${service.ID}`)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => console.log(`Xóa dịch vụ ID: ${service.ID}`)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Không có dịch vụ nào!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServiceList;
