import { ErrorMessage, Field, Form, Formik } from "formik";
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
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
                    name: Yup.string().required('Name is required!'),
                    username: Yup.string()
                        .required('Username is required!')
                        .matches(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters!')
                        .max(20, 'Username must not exceed 20 characters!')
                        .min(6, 'Username must be at least 6 characters!'),
                    password: Yup.string()
                        .required('Password is required!')
                        .min(6, 'Password must be at least 6 characters!')
                        .max(20, 'Password must not exceed 20 characters!'),
                    phoneNumber: Yup.string()
                        .required('Phone number is required!')
                        .matches(/^\d+$/, 'Phone number must contain only digits!')
                        .length(10, 'Phone number must be exactly 10 digits!'),
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