import * as categoryService from "../../../services/admin/CategoryService";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { ToastContainer, toast } from 'react-toastify';

const CategoryList = () => {

    const navigate = useNavigate();

    const [categoryToDelete, setCategoryToDelete] = useState(null); // Lưu dịch vụ cần xóa
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await categoryService.findAll();
                if (result.success) {
                    setCategories(result.data);
                } else {
                    console.error('Không thể tải danh sách danh mục!');
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách danh mục:', error.message);
            }
        };

        fetchData();
    }, []);

    // Hiển thị modal khi nhấn nút "Xóa"
    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setIsModalOpen(true);
    };

    // Xác nhận xóa
    const confirmDelete = async () => {
        try {
            const response = await categoryService.deleteById(categoryToDelete.CATEGORY_ID);

            if (response.success) {
                setCategories((prev) => prev.filter((c) => c.CATEGORY_ID !== categoryToDelete.CATEGORY_ID));
                toast.success("Xóa danh mục thành công!");
            } else {
                toast.error("Xóa danh mục không thành công!");
            }
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error.message);
            toast.error("Có lỗi xảy ra khi xóa danh mục!");
        } finally {
            setIsModalOpen(false);
            setCategoryToDelete(null);
        }
    };

    const handleRowClick = (categoryId) => {
        navigate(`/admin/category/detail/${categoryId}`);
    };

    return (
        <>
            <div id="wp-category-list">
                <div>
                    <button onClick={() => navigate(`/admin/category/create`)} className="create-btn">Thêm mới danh mục</button>
                </div>
                <div class="category-list-content">
                    <div class="title">CATEGORY lIST</div>

                    <div class="content">
                        <table className='category-list-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <tr
                                            key={category.CATEGORY_ID}
                                            onClick={() => handleRowClick(category.CATEGORY_ID)}
                                            className="clickable-row"
                                        >
                                            <td>{index + 1}</td>
                                            <td>{category.NAME}</td>
                                            <td>
                                                <button
                                                    className="edit-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(`/admin/category/edit/${category.CATEGORY_ID}`);
                                                    }}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(category);
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
                                Bạn có chắc chắn muốn xóa dịch vụ: <strong>{categoryToDelete.NAME}</strong>?
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

export default CategoryList;