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
                if (response.success) {
                    setSubCategories(response.data); // Store list of subCategories
                } else {
                    console.error('Unable to load SubCategory list!');
                }
            } catch (error) {
                toast.error('Error loading SubCategory list: ' + error.message);
            }
        };
        fetchSubCategories();
    }, []);

    // Validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Service name is required!")
            .min(3, "Service name must be at least 3 characters long!")
            .matches(/^[\p{L}\p{N}\s]+$/u, "Service name must only contain letters, numbers, and spaces!"),
        description: Yup.string()
            .required("Description is required!")
            .min(10, "Description must be at least 10 characters long!"),
        subCategoryId: Yup.string().required("Please select a subcategory!"),
        price: Yup.number()
            .required("Price is required!")
            .min(0, "Price must be a positive number!"),
        estimateTime: Yup.number()
            .required("Estimate time is required!")
            .min(0, "Estimate time must be a positive number!"),
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
            <h1 className="form-title">Create New Service</h1>
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
                            toast.success('Service created successfully!');
                            navigate('/admin/services/list');
                        } else {
                            toast.error('Failed to create service!');
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
                            <label htmlFor="name">Service Name</label>
                            <Field name="name" type="text" className="form-input" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" name="description" className="form-input" />
                            <ErrorMessage name="description" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subCategoryId">Subcategory</label>
                            <Field as="select" name="subCategoryId" className="form-input">
                                <option value="">-- Select subcategory --</option>
                                {subCategories.map((subCategory) => (
                                    <option key={subCategory.SUB_CATEGORY_ID} value={subCategory.SUB_CATEGORY_ID}>
                                        {subCategory.NAME}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="subCategoryId" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="estimateTime">Estimate Time (in minutes)</label>
                            <Field name="estimateTime" type="number" className="form-input" />
                            <ErrorMessage name="estimateTime" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <Field name="price" type="number" className="form-input" />
                            <ErrorMessage name="price" component="div" className="error" />
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
                                    Add Service
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>

            <button onClick={() => navigate(`/admin/services/list`)}>Back to List</button>
            <ToastContainer />
        </div>
    );
};

export default ServiceCreate;
