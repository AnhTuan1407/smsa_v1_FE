import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as staffService from '../../../services/admin/StaffService';
import * as locationService from '../../../services/admin/LocationService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const StaffCreate = () => {

    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await locationService.findAll();

                setLocations(response);
            } catch (error) {
                toast.error("Không thể tải danh sách vị trí!");
            }
        };

        fetchLocation();
    }, [])

    return (
        <>
            <div id="wp-staff-create">
                <div className="staff-create-container">
                    <div className="title">
                        ADD NEW STAFF
                    </div>

                    <div className="content">
                        <Formik

                            initialValues={{
                                name: "",
                                email: "",
                                phone: "",
                                address: "",
                                gender: "",
                                role: "",
                                locationId: "",
                                image: null,
                            }}

                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .required("Tên khách hàng không được để trống!")
                                    .min(2, "Tên khách hàng phải có ít nhất 2 ký tự!")
                                    .max(50, "Tên khách hàng không được vượt quá 50 ký tự!"),

                                email: Yup.string()
                                    .required("Email không được để trống!")
                                    .email("Địa chỉ email không hợp lệ!"),

                                phone: Yup.string()
                                    .required("Số điện thoại không được để trống!")
                                    .matches(
                                        /^(\+84|0)[0-9]{9}$/,
                                        "Số điện thoại không hợp lệ! (VD: 0123456789)"
                                    ),

                                address: Yup.string()
                                    .required("Địa chỉ không được để trống!")
                                    .max(100, "Địa chỉ không được vượt quá 100 ký tự!"),

                                gender: Yup.string()
                                    .required("Giới tính không được để trống!"),

                                role: Yup.string()
                                    .required("Chức vụ không được để trống!"),

                                locationId: Yup.number()
                                    .required("Giới tính không được để trống!"),

                                image: Yup.mixed()
                                    .required("Vui lòng tải lên hình ảnh!")
                                    .test(
                                        "fileFormat",
                                        "Định dạng hình ảnh không hợp lệ (chỉ JPEG, PNG, JPG)!",
                                        (value) => !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
                                    ),
                            })}

                            onSubmit={async (values, { setSubmitting }) => {
                                const formData = new FormData();
                                formData.append("name", values.name);
                                formData.append("email", values.email);
                                formData.append("gender", values.gender);
                                formData.append("phone", values.phone);
                                formData.append("address", values.address);
                                formData.append("role", values.role);
                                formData.append("locationId", values.locationId);
                                formData.append("image", values.image);

                                try {
                                    const response = await staffService.create(formData);

                                    if (response.success) {
                                        toast.success('Thêm mới nhân viên thành công!');
                                        navigate('/admin/staff/list');
                                    } else {
                                        toast.error('Không thể thêm mới nhân viên!');
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
                                        <label htmlFor="name">Name</label>
                                        <Field name="name" type="text" className="form-input" />
                                        <ErrorMessage name="name" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="text" className="form-input" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <Field name="phone" type="text" className="form-input" />
                                        <ErrorMessage name="phone" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <Field name="address" type="text" className="form-input" />
                                        <ErrorMessage name="address" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="gender">Gender</label>
                                        <Field as="select" name="gender" className="form-input" >
                                            <option value="">--Select gender--</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="role">Role</label>
                                        <Field as="select" name="role" className="form-input" >
                                            <option value="">--Select role--</option>
                                            <option value="Hairdresser">Hairdresser</option>
                                            <option value="Stylist">Stylist</option>
                                            <option value="Barber">Barber</option>
                                            <option value="Manager">Manager</option>
                                        </Field>
                                        <ErrorMessage name="role" component="div" className="error" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="locationId">Location</label>
                                        <Field as="select" name="locationId" className="form-input">
                                            <option value="">-- Select location --</option>
                                            {locations.map((location) => (
                                                <option key={location.LOCATION_ID} value={location.LOCATION_ID}>
                                                    {location.NAME}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="locationId" component="div" className="error" />
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
                                                Add new staff
                                            </button>
                                        )}
                                    </div>
                                </Form>
                            )}

                        </Formik>

                        <button onClick={() => navigate(`/admin/staff/list`)}>Quay lại</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffCreate;
