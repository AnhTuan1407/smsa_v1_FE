import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/css/admin/service/edit.css";
import * as service from '../../../services/admin/Service';
import * as subCategoryService from '../../../services/admin/SubCategory';
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

const ServiceEdit = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    const [subCategories, setSubCategories] = useState([]);
    const [initialValues, setInitialValues] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Lấy dữ liệu subCategory và thông tin service theo ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách subCategory
                try {
                    const subCategoryResponse = await subCategoryService.findAll();
                    if (subCategoryResponse.success) {
                        setSubCategories(subCategoryResponse.data);
                    } else {
                        console.error('Không thể tải danh sách danh mục!');
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách danh mục:', error.message);
                }

                // Lấy thông tin service theo ID
                const serviceResponse = await service.findById(id);

                setInitialValues({
                    name: serviceResponse.NAME,
                    description: serviceResponse.DESCRIPTION,
                    subCategoryId: serviceResponse.SUB_CATEGORY_ID,
                    price: serviceResponse.PRICE,
                    estimateTime: serviceResponse.ESTIMATE_TIME,
                    image: "",
                });
                setImagePreview(`data:image/jpeg;base64,${serviceResponse.IMAGE}`); // Hiển thị ảnh từ base64

            } catch (error) {
                toast.error("Có lỗi xảy ra: " + error.message);
                navigate('/admin/services/list');
            }
        };

        fetchData();
    }, [id]);

    // Schema validate với Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Tên dịch vụ không được để trống!")
            .min(3, "Tên dịch vụ phải có ít nhất 3 ký tự!"),
        description: Yup.string()
            .required("Mô tả không được để trống!")
            .min(10, "Mô tả phải có ít nhất 10 ký tự!"),
        subCategoryId: Yup.string().required("Vui lòng chọn danh mục phụ!"),
        price: Yup.number()
            .required("Giá không được để trống!")
            .min(0, "Giá phải là số dương!"),
        estimateTime: Yup.number()
            .required("Thời gian ước tính không được để trống!")
            .min(0, "Thời gian ước tính phải là số dương!"),
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
            <h1 className="form-title">Chỉnh Sửa Dịch Vụ</h1>
            <Formik
                initialValues={initialValues}

                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {

                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("description", values.description);
                    formData.append("subCategoryId", values.subCategoryId);
                    formData.append("price", values.price);
                    formData.append("estimateTime", values.estimateTime);
                    formData.append("image", values.image);

                    try {
                        const result = await service.update(id, formData);
                        if (result.success) {
                            toast.success('Cập nhật dịch vụ thành công!');
                            navigate('/admin/services/list');
                        } else {
                            toast.error('Không thể cập nhật dịch vụ!');
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
                            <label htmlFor="name">Tên Dịch Vụ</label>
                            <Field name="name" type="text" className="form-input" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Mô Tả</label>
                            <Field as="textarea" name="description" className="form-input" />
                            <ErrorMessage name="description" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subCategoryId">Danh Mục Phụ</label>
                            <Field as="select" name="subCategoryId" className="form-input">
                                <option value="">-- Chọn danh mục phụ --</option>
                                {subCategories.map((subCategory) => (
                                    <option key={subCategory.SUB_CATEGORY_ID} value={subCategory.SUB_CATEGORY_ID}>
                                        {subCategory.NAME}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="subCategoryId" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="estimateTime">Thời gian ước tính</label>
                            <Field name="estimateTime" type="number" className="form-input" />
                            <ErrorMessage name="estimateTime" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Giá</label>
                            <Field name="price" type="number" className="form-input" />
                            <ErrorMessage name="price" component="div" className="error" />
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
                                    Cập Nhật Dịch Vụ
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>

            <div>
                <button onClick={() => navigate("/admin/services/list")}>
                    Quay lại
                </button>
            </div>
        </div>
    );
};

export default ServiceEdit;
