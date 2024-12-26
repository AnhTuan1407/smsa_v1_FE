import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from '../../../components/Modal';
import * as staffService from "../../../services/admin/StaffService";

const StaffList = () => {
    const navigate = useNavigate();

    const [staffList, setStaffList] = useState([]);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [staffPerPage, setStaffPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await staffService.findAll();
                if (response) {
                    setStaffList(response);
                } else {
                    console.error('Unable to load staff list!');
                }
            } catch (error) {
                toast.error("Error loading staff list: " + error.message);
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
                setStaffList((prev) =>
                    prev.filter((s) => s.STAFF_ID !== staffToDelete.STAFF_ID)
                );
                toast.success("Staff deleted successfully!");
            } else {
                toast.error("Failed to delete staff!");
            }
        } catch (error) {
            toast.error("Error deleting staff: " + error.message);
        } finally {
            setIsModalOpen(false);
            setStaffToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/staff/detail/${id}`);
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

    const sortedStaff = [...staffList].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredStaff = sortedStaff.filter((staff) =>
        staff.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastStaff = currentPage * staffPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
    const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);

    const totalPages = Math.ceil(filteredStaff.length / staffPerPage);

    return (
        <>
            <div className="container-fluid">

                <h1 className="h3 mb-2 text-gray-800">STAFF MANAGEMENT</h1>

                <div className="card shadow mb-4">

                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">STAFF LIST</h6>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search staff..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('STAFF_ID')}>ID</th>
                                        <th onClick={() => handleSort('NAME')}>Name</th>
                                        <th onClick={() => handleSort('EMAIL')}>Email</th>
                                        <th onClick={() => handleSort('PHONE')}>Phone</th>
                                        <th onClick={() => handleSort('ADDRESS')}>Address</th>
                                        <th onClick={() => handleSort('ROLE')}>Role</th>
                                        <th>Image</th>
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
                                        <th>Role</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>

                                <tbody>
                                    {currentStaff.length > 0 ? (
                                        currentStaff.map((staff, index) => (
                                            <tr
                                                key={staff.STAFF_ID}
                                                onClick={() => handleRowClick(staff.STAFF_ID)}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{staff.NAME}</td>
                                                <td>{staff.EMAIL}</td>
                                                <td>{staff.PHONE}</td>
                                                <td>{staff.ADDRESS}</td>
                                                <td>{staff.ROLE}</td>
                                                <td>
                                                    {staff.IMAGE ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${staff.IMAGE}`}
                                                            alt={staff.NAME}
                                                            className="staff-image"
                                                        style={{width: "100px", height:"150px"}}
                                                        />
                                                    ) : (
                                                        'No Image'
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/admin/staff/edit/${staff.STAFF_ID}`);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(staff);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No staff found!</td>
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
                                    value={staffPerPage}
                                    onChange={(e) => setStaffPerPage(parseInt(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                staff per page
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
                            Are you sure you want to delete staff: {" "}
                            <strong>{staffToDelete.NAME}</strong>?
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

export default StaffList;
