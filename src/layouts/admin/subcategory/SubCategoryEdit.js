import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
// import "../../../styles/css/admin/service/edit.css";
import * as categoryService from '../../../services/admin/CategoryService';
import * as subCategoryService from '../../../services/admin/SubCategory';
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

const SubCategoryEdit = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [initialValues, setInitialValues] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                try {
                    const categoryResponse = await categoryService.findAll();
                    if (categoryResponse.success) {
                        setCategories(categoryResponse.data);
                    } else {
                        console.error('Không thể tải danh sách danh mục!');
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách danh mục:', error.message);
                }

                // Lấy thông tin service theo ID
                const subCategoryResponse = await subCategoryService.findById(id);

                setInitialValues({
                    name: subCategoryResponse.NAME,
                    description: subCategoryResponse.DESCRIPTION,
                    categoryId: subCategoryResponse.CATEGORY_ID,
                    image: "",
                });
                setImagePreview(`data:image/jpeg;base64,${subCategoryResponse.IMAGE}`); // Hiển thị ảnh từ base64

            } catch (error) {
                toast.error("Có lỗi xảy ra: " + error.message);
                navigate('/admin/subCategory/list');
            }
        };

        fetchData();
    }, [id]);

    // Schema validate với Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Subcategory name is required!")
            .min(3, "Subcategory name must be at least 3 characters long!")
            .matches(/^[\p{L}\s]+$/u, "Subcategory name must not contain special characters!"),
        description: Yup.string()
            .required("Description is required!")
            .min(10, "Description must be at least 10 characters long!"),
        categoryId: Yup.string().required("Please select a Category!"),
        image: Yup.mixed()
            .test(
                "fileFormat",
                "Định dạng hình ảnh không hợp lệ (chỉ JPEG, PNG, JPG)!",
                (value) => !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
            ),

    });

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Hiển thị ảnh mới
                setFieldValue("image", file); // Lấy base64 và bỏ tiền tố
            };
            reader.readAsDataURL(file);
        }
    };

    if (!initialValues) {
        return (
            <div className="loading-wrapper">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </div>
        );
    }

    return (
        <div id="wp-service-edit">
            <h1 className="form-title">Edit SubCategory</h1>
            <Formik
                initialValues={initialValues}

                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {

                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("description", values.description);
                    formData.append("categoryId", values.categoryId);
                    formData.append("image", values.image);

                    try {
                        const result = await subCategoryService.edit(formData, id);
                        if (result.success) {
                            toast.success('Cập nhật danh mục thành công!');
                            navigate('/admin/subCategory/list');
                        } else {
                            toast.error('Không thể cập nhật danh mục!');
                        }
                    } catch (error) {
                        toast.error('Có lỗi xảy ra: ' + error.message);
                    }
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="name">Tên Danh mục</label>
                            <Field name="name" type="text" className="form-input" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Mô Tả</label>
                            <Field as="textarea" name="description" className="form-input" />
                            <ErrorMessage name="description" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryId">Loại</label>
                            <Field as="select" name="categoryId" className="form-input">
                                <option value="">-- Chọn loại --</option>
                                {categories.map((category) => (
                                    <option key={category.CATEGORY_ID} value={category.CATEGORY_ID}>
                                        {category.NAME}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className="error" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="image">Hình Ảnh</label>
                            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" style={{ width: "200px" }} />}
                            <input
                                name="image"
                                type="file"
                                className="form-input"
                                onChange={(event) => handleImageChange(event, setFieldValue)}
                            />
                            <ErrorMessage name="image" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            {isSubmitting ? (
                                <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                            ) : (
                                <button type="submit" className="login-btn">
                                    Cập Nhật Danh Mục
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>

            <div>
                <button onClick={() => navigate("/admin/subCategory/list")}>
                    Quay lại
                </button>
            </div>
        </div>
    );
};

export default SubCategoryEdit;
