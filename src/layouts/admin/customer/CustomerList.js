import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from '../../../components/Modal';
import * as customerService from "../../../services/admin/CustomerService";

const CustomerList = () => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage, setCustomersPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await customerService.findAll();
                if (response.success) {
                    setCustomers(response.data);
                } else {
                    console.error('Unable to load customer list!');
                }
            } catch (error) {
                toast.error("Error loading customer list: " + error.message);
            }
        };
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
                setCustomers((prev) =>
                    prev.filter((c) => c.CUSTOMER_ID !== customerToDelete.CUSTOMER_ID)
                );
                toast.success("Customer deleted successfully!");
            } else {
                toast.error("Failed to delete customer!");
            }
        } catch (error) {
            toast.error("Error deleting customer: ", error.message);
        } finally {
            setIsModalOpen(false);
            setCustomerToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/customers/detail/${id}`);
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

    const sortedCustomers = [...customers].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredCustomers = sortedCustomers.filter((customer) =>
        customer.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    return (
        <>
            <div className="container-fluid">

                <h1 className="h3 mb-2 text-gray-800">Tables</h1>
                <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                    For more information about DataTables, please visit the <a target="_blank"
                        href="">official DataTables documentation</a>.</p>

                <div className="card shadow mb-4">

                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Customer Information</h6>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('CUSTOMER_ID')}>ID</th>
                                        <th onClick={() => handleSort('NAME')}>Name</th>
                                        <th onClick={() => handleSort('EMAIL')}>Email</th>
                                        <th onClick={() => handleSort('PHONE')}>Phone</th>
                                        <th onClick={() => handleSort('ADDRESS')}>Address</th>
                                        <th onClick={() => handleSort('DATE_OF_BIRTH')}>Date of Birth</th>
                                        <th onClick={() => handleSort('GENDER')}>Gender</th>
                                        <th onClick={() => handleSort('POINTS')}>Points</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Points</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>

                                <tbody>
                                    {currentCustomers.length > 0 ? (
                                        currentCustomers.map((customer, index) => (
                                            <tr
                                                key={customer.CUSTOMER_ID}
                                                onClick={() =>
                                                    handleRowClick(
                                                        customer.CUSTOMER_ID
                                                    )
                                                }
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
                                                        className="btn btn-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(
                                                                `/admin/customers/edit/${customer.CUSTOMER_ID}`
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(
                                                                customer
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9">No customers found!</td>
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
                                    value={customersPerPage}
                                    onChange={(e) => setCustomersPerPage(parseInt(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                customers per page
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
            </div>

            {isModalOpen && (
                <Modal>
                    <div className="modal-content">
                        <h2 className="modal-title">Confirm Deletion</h2>
                        <p className="modal-warning">
                            Are you sure you want to delete customer: {" "}
                            <strong>{customerToDelete.NAME}</strong>?
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
        </>
    );
};

export default CustomerList;
