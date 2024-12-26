import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from '../../../components/Modal';
import * as categoryService from "../../../services/admin/CategoryService";

const CategoryList = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage, setCategoriesPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await categoryService.findAll();
                if (response.success) {
                    setCategories(response.data);
                } else {
                    console.error('Unable to load category list!');
                }
            } catch (error) {
                toast.error("Error loading category list: " + error.message);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await categoryService.deleteById(categoryToDelete.CATEGORY_ID);
            if (response.success) {
                setCategories((prev) =>
                    prev.filter((c) => c.CATEGORY_ID !== categoryToDelete.CATEGORY_ID)
                );
                toast.success("Category deleted successfully!");
            } else {
                toast.error("Failed to delete category!");
            }
        } catch (error) {
            toast.error("Error deleting category: " + error.message);
        } finally {
            setIsModalOpen(false);
            setCategoryToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/categories/detail/${id}`);
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

    const sortedCategories = [...categories].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredCategories = sortedCategories.filter((category) =>
        category.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

    return (
        <>
            <div className="container-fluid">

                <h1 className="h3 mb-2 text-gray-800">Category List</h1>
                <p className="mb-4">Manage all categories in the system efficiently.</p>

                <div className="card shadow mb-4">

                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Category Information</h6>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('CATEGORY_ID')}>ID</th>
                                        <th onClick={() => handleSort('NAME')}>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>

                                <tbody>
                                    {currentCategories.length > 0 ? (
                                        currentCategories.map((category, index) => (
                                            <tr
                                                key={category.CATEGORY_ID}
                                                onClick={() =>
                                                    handleRowClick(
                                                        category.CATEGORY_ID
                                                    )
                                                }
                                            >
                                                <td>{index + 1}</td>
                                                <td>{category.NAME}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(
                                                                `/admin/categories/edit/${category.CATEGORY_ID}`
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
                                                                category
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
                                            <td colSpan="3">No categories found!</td>
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
                                    value={categoriesPerPage}
                                    onChange={(e) => setCategoriesPerPage(parseInt(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                categories per page
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
                            Are you sure you want to delete category: {" "}
                            <strong>{categoryToDelete.NAME}</strong>?
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

export default CategoryList;
