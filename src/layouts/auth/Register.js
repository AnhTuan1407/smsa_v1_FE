import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import * as registerService from '../../services/auth/RegisterService';
import '../../styles/css/auth/register.css';

const Register = () => {

    const navigate = useNavigate();

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    phoneNumber: '',
                    password: '',
                }}

                validationSchema={Yup.object({
                    name: Yup.string().required('Họ và tên không được để trống!'),
                    username: Yup.string().required('Tên đăng nhập không được để trống!'),
                    password: Yup.string().required('Mật khẩu không được để trống!').min(6, 'Mật khẩu không được ít hơn 6 ký tự!'),
                    phoneNumber: Yup.string()
                        .required('Số điện thoại không được để trống!')
                        .matches(/^\d+$/, 'Số điện thoại chỉ được chứa số!')
                        .length(10, 'Số điện thoại phải có đúng 10 chữ số!'),

                })}

                onSubmit={(values, { setSubmitting }) => {
                    const performRegister = async () => {
                        try {
                            const result = await registerService.doRegister(values);

                            if (result) {

                                toast.success('Đăng ký thành công!');
                                navigate('/');
                            } else {
                                toast.error('Đăng nhập thất bại!');
                            }
                        } catch (error) {
                            toast.error('Lỗi đăng nhập: ' + error.message);
                        }
                    }

                    setTimeout(() => {
                        setSubmitting(false);
                        performRegister();
                    }, 2000);
                }}
            >

                {({ isSubmitting }) => (
                    <div className="register-container">
                        <div className="register-left">
                            <h2>Đăng ký</h2>
                            <Form className="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">Họ và tên</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nhập họ và tên"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Số điện thoại</label>
                                    <Field
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Nhập số điện thoại"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Tên đăng nhập</label>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Nhập tên đăng nhập"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="error-message"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="error-message"
                                    />
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
                                        <button type="submit" className="register-btn">
                                            Đăng ký
                                        </button>
                                    )}
                                </div>
                            </Form>
                        </div>
                        <div className="register-right">
                            <img src="/images/smsa-logo.png" alt="Logo" className="logo" />
                        </div>
                    </div>
                )}

            </Formik>
        </>
    );
};

export default Register;