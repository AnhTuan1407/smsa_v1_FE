import * as categoryService from "../../../services/admin/CategoryService";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner';

const CategoryCreate = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{
                    name: "",
                }}

                validationSchema={Yup.object({
                    name: Yup.string().required("Tên danh mục không được để trống!"),
                })}

                onSubmit={async (values, { setSubmitting }) => {

                    try {
                        const result = await categoryService.create(values);

                        if (result.success) {
                            toast.success('Tạo mới danh mục thành công!');
                            navigate('/admin/category/list');
                        } else {
                            toast.error('Không thể tạo mới danh mục!');
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
                            <label htmlFor="name">Tên danh mục</label>
                            <Field name="name" type="text" className="form-input" />
                            <ErrorMessage name="name" component="div" className="error" />
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
                                    Thêm danh mục
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
            <button onClick={() => navigate(`/admin/category/list`)}>Quay lại</button>
        </div>

    );
};

export default CategoryCreate;