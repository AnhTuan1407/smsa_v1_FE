import * as staffService from "../../../services/admin/StaffService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from '../../../components/Modal';

const StaffList = () => {
    const navigate = useNavigate();

    const [staffList, setStaffList] = useState([]);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await staffService.findAll();
                setStaffList(response);
            } catch (error) {
                toast.error("Có lỗi xảy ra: " + error.message);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (staff) => {
        setStaffToDelete(staff);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await staffService.deleteById(staffToDelete.STAFF_ID);

            if (response.success) {
                setStaffToDelete((prev) => prev.filter((s) => s.STAFF_ID !== staffToDelete.STAFF_ID));
                toast.success("Xóa nhân viên thành công!");
            } else {
                toast.error("Xóa nhân viên không thành công!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa nhân viên: ", error.message);
        } finally {
            setIsModalOpen(false);
            staffToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/staff/detail/${id}`)
    }

    return (
        <>
            <div id="wp-staff-list">
                <div className="staff-list-container">
                    <div className="title">
                        STAFF LIST
                    </div>

                    <div className="content">
                        <div className="table-container">
                            <div>
                                <button className='create-btn' onClick={() => navigate(`/admin/staff/create`)}>
                                    Thêm mới nhân viên
                                </button>
                            </div>

                            <table className='service-list-table'>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>ADDRESS</th>
                                        <th>GENDER</th>
                                        <th>ROLE</th>
                                        <th>IMAGE</th>
                                        <th>LOCATION</th>
                                        <th>RATING</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffList.length > 0 ? (
                                        staffList.map((staff, index) => (
                                            <tr
                                                key={staff.STAFF_ID}
                                                onClick={() => handleRowClick(staff.STAFF_ID)}
                                                className="clickable-row"
                                            >
                                                <td>{staff.NAME}</td>
                                                <td>{staff.EMAIL}</td>
                                                <td>{staff.PHONE}</td>
                                                <td>{staff.ADDRESS}</td>
                                                <td>{staff.GENDER}</td>
                                                <td>{staff.ROLE}</td>
                                                {/* <td>
                                                    {service.IMAGE ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${service.IMAGE}`}
                                                            alt={service.NAME}
                                                            className="service-image"
                                                        />
                                                    ) : (
                                                        'No Image'
                                                    )}
                                                </td> */}

                                                <td>Hình ảnh</td>
                                                <td>{staff.LOCATION_ID}</td>
                                                <td>{staff.RATING}</td>
                                                <td>
                                                    <button
                                                        className="edit-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/admin/staff/edit/${staff.STAFF_ID}`);
                                                        }}
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(staff);
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
                                    Bạn có chắc chắn muốn xóa nhân viên: <strong>{staffToDelete.NAME}</strong>?
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
            </div>
        </>
    );
};

export default StaffList;