import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import "../../../styles/css/admin/service/create.css";
import * as categoryService from '../../../services/admin/CategoryService';
import * as subCategoryService from '../../../services/admin/SubCategory';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const SubCategoryCreate = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await categoryService.findAll();
                if (response.success) {
                    setCategories(response.data); // Store list of Categories
                } else {
                    console.error('Unable to load Category list!');
                }
            } catch (error) {
                toast.error('Error loading Category list: ' + error.message);
            }
        };

        fetchData();
    }, []);

    // Validation schema using Yup
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
            .required("Please upload an image!")
            .test(
                "fileFormat",
                "Invalid image format (only JPEG, PNG, JPG allowed)!",
                (value) => !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
            ),
    });

    return (
        <div className="service-create">
            <h1 className="form-title">Create New SubCategory</h1>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    categoryId: "",
                    image: null,
                }}

                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {
                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("description", values.description);
                    formData.append("categoryId", values.categoryId);
                    formData.append("image", values.image);

                    try {
                        const result = await subCategoryService.create(formData);

                        if (result.success) {
                            toast.success('SubCategory created successfully!');
                            navigate('/admin/subCategory/list');
                        } else {
                            toast.error('Failed to create SubCategory!');
                        }
                    } catch (error) {
                        toast.error('An error occurred: ' + error.message);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="name">SubCategory Name</label>
                            <Field name="name" type="text" className="form-input" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" name="description" className="form-input" />
                            <ErrorMessage name="description" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryId">Category</label>
                            <Field as="select" name="categoryId" className="form-input">
                                <option value="">-- Select category --</option>
                                {categories.map((category) => (
                                    <option key={category.CATEGORY_ID} value={category.CATEGORY_ID}>
                                        {category.NAME}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Image</label>
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
                                <div className="loader">
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
                            ) : (
                                <button type="submit" className="btn-submit">
                                    Add SubCategory
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>

            <button onClick={() => navigate(`/admin/subCategory/list`)}>Back to List</button>
            <ToastContainer />
        </div>
    );
};

export default SubCategoryCreate;
