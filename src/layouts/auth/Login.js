import React, { useState } from 'react';
import '../../styles/css/auth/login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as loginService from '../../services/auth/LoginService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { login } = useAuth();
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
                    password: Yup.string().required('Mật khẩu là bắt buộc'),
                })}

                onSubmit={(values, { setSubmitting }) => {
                    const performLogin = async () => {
                        try {
                            const result = await loginService.login(values);

                            if (result) {
                                localStorage.setItem('tokenUser', result.token);
                                localStorage.setItem('user', JSON.stringify(result.user));
                                localStorage.setItem('idPerson', result.user.idPerson);
                                localStorage.setItem('idAccount', result.user.accountId);
                                localStorage.setItem('role', result.user.role);
                                localStorage.setItem('username', result.user.username);
                                setUser(result.user.username);
                                login(result.user);
                                toast.success('Đăng nhập thành công!');
                                navigate('/');
                            } else {
                                toast.error('Đăng nhập thất bại!');
                            }
                        } catch (error) {
                            toast.error('Lỗi đăng nhập: ' + error.message);
                        }
                    };

                    setTimeout(() => {
                        setSubmitting(false);
                        performLogin();
                    }, 2000);
                }}

            >
                {({ isSubmitting }) => (
                    <div className="login-container">
                        <div className="login-left">
                            <h2>Đăng nhập</h2>
                            <Form className="login-form">
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
                                        <button type="submit" className="login-btn">
                                            Đăng nhập
                                        </button>
                                    )}
                                </div>
                            </Form>
                        </div>
                        <div className="login-right">
                            <img src="/images/smsa-logo.png" alt="Logo" className="logo" />
                        </div>
                    </div>
                )}
            </Formik>

            <ToastContainer />
        </>
    );
};

export default Login;
