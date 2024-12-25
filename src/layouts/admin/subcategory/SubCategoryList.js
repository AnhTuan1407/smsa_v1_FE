import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as subCategoryService from '../../../services/admin/SubCategory';
import Modal from '../../../components/Modal';
import { ToastContainer, toast } from 'react-toastify';

const SubCategoryList = () => {

    const [subCategories, setSubCategories] = useState([]);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await subCategoryService.findAll();
                if (response.success) {
                    setSubCategories(response.data);
                } else {
                    console.error('Không thể tải danh sách danh mục!');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (subCategory) => {
        setSubCategoryToDelete(subCategory);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await subCategoryService.deleteById(subCategoryToDelete.SUB_CATEGORY_ID);

            if (response.success) {
                setSubCategories((prev) => prev.filter((s) => s.SUB_CATEGORY_ID !== subCategoryToDelete.SUB_CATEGORY_ID));
                toast.success("Xóa danh mục thành công!");
            } else {
                toast.error("Xóa danh mục không thành công!");
            }
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error.message);
            toast.error("Có lỗi xảy ra khi xóa danh mục: ", error.message);
        } finally {
            setIsModalOpen(false);
            setSubCategoryToDelete(null);
        }
    };

    const handleRowClick = (id) => {
        navigate(`/admin/subCategory/detail/${id}`);
    };

    return (
        <>
            <div id="wp-subCategory-list">
                <div className="subCategory-list-container">
                    <div className="title">
                        SUBCATEGORY LIST
                    </div>

                    <div className="content">
                        <div>
                            <button className='create-btn' onClick={() => navigate(`/admin/subCategory/create`)}>
                                Thêm mới danh mục
                            </button>
                        </div>

                        <div className='table-container'>
                            <table className='service-list-table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>CATEGORY</th>
                                        <th>NAME</th>
                                        <th>DESCRIPTION</th>
                                        <th>IMAGE</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subCategories.length > 0 ? (
                                        subCategories.map((subCategory, index) => (
                                            <tr
                                                key={subCategory.SUB_CATEGORY_ID}
                                                onClick={() => handleRowClick(subCategory.SUB_CATEGORY_ID)}
                                                className="clickable-row"
                                            >
                                                <td>{index + 1}</td>
                                                <td>{subCategory.CATEGORY_ID}</td>
                                                <td>{subCategory.NAME}</td>
                                                <td>{subCategory.DESCRIPTION}</td>
                                                <td>
                                                    {subCategory.IMAGE ? (
                                                        <img
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
                                                        className="edit-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/admin/subCategory/edit/${subCategory.SUB_CATEGORY_ID}`);
                                                        }}
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteClick(subCategory);
                                                        }}
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">Không có danh mục nào!</td>
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
                                    Bạn có chắc chắn muốn xóa danh mục: <strong>{subCategoryToDelete.NAME}</strong>?
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

export default SubCategoryList;