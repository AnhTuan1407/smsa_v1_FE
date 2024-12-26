import '../../../styles/css/admin/service/list.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as service from '../../../services/admin/Service';
import * as subCategoryService from '../../../services/admin/SubCategory';
import Modal from '../../../components/Modal';
import { toast } from 'react-toastify';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [subCategories, setSubCategories] = useState([]); // State lưu danh sách subCategories
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [servicesPerPage, setServicesPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await service.findAll();
                if (response.success) {
                    setServices(response.data);
                } else {
                    console.error('Unable to load service list!');
                }
            } catch (error) {
                toast.error('Error loading service list: ' + error.message);
            }
        };

        const fetchSubCategory = async () => {
            try {
                const response = await subCategoryService.findAll();
                if (response.success) {
                    setSubCategories(response.data); // Lưu danh sách subCategories
                } else {
                    console.error('Unable to load SubCategory list!');
                }
            } catch (error) {
                toast.error('Error loading SubCategory list: ' + error.message);
            }
        };

        fetchServices();
        fetchSubCategory();
    }, []);

    const handleDeleteClick = (service) => {
        setServiceToDelete(service);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await service.deleteById(serviceToDelete.SERVICE_ID);

            if (response.success) {
                setServices((prev) => prev.filter((s) => s.SERVICE_ID !== serviceToDelete.SERVICE_ID));
                toast.success("Service deleted successfully!");
            } else {
                toast.error("Failed to delete service!");
            }
        } catch (error) {
            console.error('Error deleting service:', error.message);
            toast.error("Error deleting service: " + error.message);
        } finally {
            setIsModalOpen(false);
            setServiceToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/services/detail/${id}`);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Hàm tìm tên SubCategory từ danh sách subCategories
    const getSubCategoryName = (subCategoryId) => {
        const subCategory = subCategories.find(sub => sub.SUB_CATEGORY_ID === subCategoryId);
        return subCategory ? subCategory.NAME : 'Unknown';
    };

    const sortedServices = [...services].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredServices = sortedServices.filter((service) =>
        service.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    return (
        <div className='container-fluid'>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Service Management</h6>
                </div>

                <div className="card-body">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th onClick={() => handleSort('NAME')}>Name</th>
                                    <th onClick={() => handleSort('SUB_CATEGORY_ID')}>Subcategory</th>
                                    <th onClick={() => handleSort('DESCRIPTION')}>Description</th>
                                    <th onClick={() => handleSort('ESTIMATE_TIME')}>Duration</th>
                                    <th onClick={() => handleSort('PRICE')}>Price</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentServices.length > 0 ? (
                                    currentServices.map((service, index) => (
                                        <tr
                                            key={service.SERVICE_ID}
                                            onClick={() => handleRowClick(service.SERVICE_ID)}
                                            className="clickable-row"
                                        >
                                            <td>{index + 1}</td>
                                            <td>{service.NAME}</td>
                                            <td>{getSubCategoryName(service.SUB_CATEGORY_ID)}</td> {/* Hiển thị tên SubCategory */}
                                            <td style={{ width: "300px" }}>{service.DESCRIPTION}</td>
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
                                            <td style={{ width: "175px" }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/admin/services/edit/${service.SERVICE_ID}`);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(service);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No services found!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            Show
                            <select
                                className="form-control d-inline-block w-auto mx-2"
                                value={servicesPerPage}
                                onChange={(e) => setServicesPerPage(parseInt(e.target.value))}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                            services per page
                        </div>

                        <div>
                            <button
                                className="btn btn-secondary mx-1"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                Previous
                            </button>
                            Page {currentPage} / {totalPages}
                            <button
                                className="btn btn-secondary mx-1"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal>
                    <div className="modal-content">
                        <h2 className="modal-title">Confirm Deletion</h2>
                        <p className="modal-warning">
                            Are you sure you want to delete service: <strong>{serviceToDelete.NAME}</strong>?
                        </p>
                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-danger" onClick={confirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ServiceList;
