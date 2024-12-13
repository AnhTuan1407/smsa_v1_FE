import '../../../styles/css/admin/service/list.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as service from '../../../services/admin/Service';
import Modal from '../../../components/Modal'; // Một component modal tái sử dụng (hoặc tự tạo).
import { ToastContainer, toast } from 'react-toastify';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [serviceToDelete, setServiceToDelete] = useState(null); // Lưu dịch vụ cần xóa
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal
    const navigate = useNavigate();

    // Lấy danh sách dịch vụ
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

    // Hiển thị modal khi nhấn nút "Xóa"
    const handleDeleteClick = (service) => {
        setServiceToDelete(service); // Lưu dịch vụ cần xóa
        setIsModalOpen(true); // Hiển thị modal
    };

    // Xác nhận xóa dịch vụ
    const confirmDelete = async () => {
        try {
            const response = await service.deleteById(serviceToDelete.SERVICE_ID);

            if (response.success) {
                // Cập nhật lại danh sách dịch vụ sau khi xóa
                setServices((prev) => prev.filter((s) => s.SERVICE_ID !== serviceToDelete.SERVICE_ID));
                toast.success("Xóa dịch vụ thành công!");
            } else {
                toast.error("Xóa dịch vụ không thành công!");
            }
        } catch (error) {
            console.error('Lỗi khi xóa dịch vụ:', error.message);
            toast.error("Có lỗi xảy ra khi xóa dịch vụ: ", error.message);
        } finally {
            setIsModalOpen(false); // Đóng modal dù thành công hay thất bại
            setServiceToDelete(null); // Xóa dịch vụ đang lưu
        }
    };

    // Hàm xử lý click vào hàng dịch vụ
    const handleRowClick = (id) => {
        navigate(`/admin/services/detail/${id}`);
    };

    return (
        <div id='wp-service-list'>
            <div className='service-list-container'>
                <div className="table-container">
                    <div>
                        <button className='create-btn' onClick={() => navigate(`/admin/services/create`)}>
                            Thêm mới dịch vụ
                        </button>
                    </div>

                    <table className='service-list-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subcategory</th>
                                <th>Description</th>
                                <th>Estimate time</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <tr
                                        key={service.SERVICE_ID}
                                        onClick={() => handleRowClick(service.SERVICE_ID)} // Thêm sự kiện click
                                        className="clickable-row" // Thêm class để style
                                    >
                                        <td>{service.NAME}</td>
                                        <td>{service.SUB_CATEGORY_ID}</td>
                                        <td>{service.DESCRIPTION}</td>
                                        <td>{service.ESTIMATE_TIME}</td>
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
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Ngăn chặn sự kiện click của hàng
                                                    navigate(`/admin/services/edit/${service.SERVICE_ID}`);
                                                }}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Ngăn chặn sự kiện click của hàng
                                                    handleDeleteClick(service);
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Không có dịch vụ nào!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <Modal>
                    <div className="modal-content">
                        <h2 className="modal-title">Xác nhận xóa</h2>
                        <p className="modal-warning">
                            Bạn có chắc chắn muốn xóa dịch vụ: <strong>{serviceToDelete.NAME}</strong>?
                        </p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                                Thoát
                            </button>
                            <button className="delete-confirm-btn" onClick={confirmDelete}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ServiceList;
