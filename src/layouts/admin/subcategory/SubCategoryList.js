import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from '../../../components/Modal';
import * as subCategoryService from "../../../services/admin/SubCategory";
import * as categoryService from "../../../services/admin/CategoryService";

const SubCategoryList = () => {
    const navigate = useNavigate();

    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [subCategoriesPerPage, setSubCategoriesPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await subCategoryService.findAll();
                if (response.success) {
                    setSubCategories(response.data);
                } else {
                    console.error('Unable to load subcategory list!');
                }
            } catch (error) {
                toast.error("Error loading subcategory list: " + error.message);
            }
        };

        const fetchDataCategories = async () => {
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
        fetchDataCategories();
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.CATEGORY_ID === categoryId);
        return category ? category.NAME : "Unknown";
    };

    const handleDeleteClick = (subCategory) => {
        setSubCategoryToDelete(subCategory);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await subCategoryService.deleteById(subCategoryToDelete.SUB_CATEGORY_ID);
            if (response.success) {
                setSubCategories((prev) =>
                    prev.filter((s) => s.SUB_CATEGORY_ID !== subCategoryToDelete.SUB_CATEGORY_ID)
                );
                toast.success("Subcategory deleted successfully!");
            } else {
                toast.error("Failed to delete subcategory!");
            }
        } catch (error) {
            toast.error("Error deleting subcategory: " + error.message);
        } finally {
            setIsModalOpen(false);
            setSubCategoryToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/subCategory/detail/${id}`);
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

    const sortedSubCategories = [...subCategories].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredSubCategories = sortedSubCategories.filter((subCategory) =>
        subCategory.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastSubCategory = currentPage * subCategoriesPerPage;
    const indexOfFirstSubCategory = indexOfLastSubCategory - subCategoriesPerPage;
    const currentSubCategories = filteredSubCategories.slice(indexOfFirstSubCategory, indexOfLastSubCategory);

    const totalPages = Math.ceil(filteredSubCategories.length / subCategoriesPerPage);

    return (
        <>
            <div className="container-fluid">

                <h1 className="h3 mb-2 text-gray-800">Subcategory List</h1>
                <p className="mb-4">Manage all subcategories in the system efficiently.</p>

                <div className="card shadow mb-4">

                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Subcategory Information</h6>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search subcategories..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('SUB_CATEGORY_ID')}>ID</th>
                                        <th onClick={() => handleSort('CATEGORY_ID')}>Category</th>
                                        <th onClick={() => handleSort('NAME')}>Name</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot>

                                <tbody>
                                    {currentSubCategories.length > 0 ? (
                                        currentSubCategories.map((subCategory, index) => (
                                            <tr
                                                key={subCategory.SUB_CATEGORY_ID}
                                                onClick={() =>
                                                    handleRowClick(
                                                        subCategory.SUB_CATEGORY_ID
                                                    )
                                                }
                                            >
                                                <td>{index + 1}</td>
                                                <td>{getCategoryName(subCategory.CATEGORY_ID)}</td>
                                                <td>{subCategory.NAME}</td>
                                                <td style={{ width: "300px" }}>{subCategory.DESCRIPTION}</td>
                                                <td>
                                                    {subCategory.IMAGE ? (
                                                        <img style={{ height: "100px" }}
                                                            src={`data:image/jpeg;base64,${subCategory.IMAGE}`}
                                                            alt={subCategory.NAME}
                                                            className="subCategory-image"
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
                                                            navigate(
                                                                `/admin/subCategory/edit/${subCategory.SUB_CATEGORY_ID}`
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
                                                                subCategory
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
                                            <td colSpan="6">No subcategories found!</td>
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
                                    value={subCategoriesPerPage}
                                    onChange={(e) => setSubCategoriesPerPage(parseInt(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                                subcategories per page
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
                            Are you sure you want to delete subcategory: {" "}
                            <strong>{subCategoryToDelete?.NAME}</strong>?
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

export default SubCategoryList;

