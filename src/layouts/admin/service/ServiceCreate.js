import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../../styles/css/admin/service/create.css";
import * as service from '../../../services/admin/Service';
import * as subCategoryService from '../../../services/admin/SubCategory';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const ServiceCreate = () => {
    const navigate = useNavigate();

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await subCategoryService.findAll();
                setSubCategories(response);
            } catch (error) {
                console.error("Failed to fetch subcategories", error);
            }
        };
        fetchSubCategories();
    }, []);

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
            .required("Vui lòng tải lên hình ảnh!")
            .test(
                "fileFormat",
                "Định dạng hình ảnh không hợp lệ (chỉ JPEG, PNG, JPG)!",
                (value) => !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
            ),
    });

    return (
        <div id="wp-service-create">
            <h1 className="form-title">Tạo Dịch Vụ Mới</h1>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    subCategoryId: "",
                    estimateTime: null,
                    price: "",
                    image: null,
                }}

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
                        const result = await service.create(formData);

                        if (result.success) {
                            toast.success('Tạo mới dịch vụ thành công!');
                            navigate('/admin/services/list');
                        } else {
                            toast.error('Không thể tạo mới dịch vụ!');
                        }
                    } catch (error) {
                        toast.error('Có lỗi xảy ra: ' + error.message);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
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
                            <input
                                name="image"
                                type="file"
                                className="form-input"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    setFieldValue("image", file);
                                }}
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
                                    Thêm dịch vụ
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>

            <button onClick={() => navigate(`/admin/services/list`)}>Quay lại</button>
            <ToastContainer />
        </div>
    );
};

export default ServiceCreate;
