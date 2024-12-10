import { useState, useEffect } from "react";
import * as customerService from "../../../services/admin/CustomerService";
import { useNavigate } from "react-router-dom";
import Modal from '../../../components/Modal';
import { toast } from "react-toastify";

const CustomerList = () => {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const result = await customerService.findAll();

            setCustomers(result);
        }

        fetchData();
    }, []);

    const handleDeleteClick = (customer) => {
        setCustomerToDelete(customer);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await customerService.deleteById(customerToDelete.CUSTOMER_ID);

            if (response.success) {
                setCustomerToDelete((prev) => prev.filter((c) => c.CUSTOMER_ID !== customerToDelete.CUSTOMER_ID));
                toast.success("Xóa khách hàng thành công!");
            } else {
                toast.error("Xóa khách hàng không thành công!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa khách hàng: ", error.message);
        } finally {
            setIsModalOpen(false);
            setCustomerToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/customers/detail/${id}`)
    }

    return (
        <>
            <div id="wp-customer-list">
                <div className="customer-list-container">

                    <div className="title">
                        DANH SÁCH KHÁCH HÀNG
                    </div>

                    <div className="content">
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Date of birth</th>
                                        <th>Gender</th>
                                        <th>Points</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {customers.length > 0 ? (
                                        customers.map((customer, index) => (
                                            <tr key={customer.CUSTOMER_ID}
                                                onClick={() => handleRowClick(customer.CUSTOMER_ID)}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{customer.NAME}</td>
                                                <td>{customer.EMAIL}</td>
                                                <td>{customer.PHONE}</td>
                                                <td>{customer.ADDRESS}</td>
                                                <td>{customer.DATE_OF_BIRTH}</td>
                                                <td>{customer.GENDER}</td>
                                                <td>{customer.POINTS}</td>
                                                <td>
                                                    <button
                                                        className="edit-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/admin/customers/edit/${customer.CUSTOMER_ID}`);
                                                        }}
                                                    >
                                                        Sửa
                                                    </button>

                                                    <button className="delete-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(customer);
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
                </div>

                {isModalOpen && (
                    <Modal>
                        <div className="modal-content">
                            <h2 className="modal-title">Xác nhận xóa</h2>
                            <p className="modal-warning">
                                Bạn có chắc chắn muốn xóa khách hàng: <strong>{customerToDelete.NAME}</strong>?
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
        </>
    );
};

export default CustomerList;

