import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as customerService from "../../../services/admin/CustomerService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner';

const CustomerEdit = () => {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState();
    const { id } = useParams();

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await customerService.findById(id);
                setCustomer(response);
            } catch (error) {
                toast.error("Có lỗi xảy ra: " + error.message);
                navigate('/admin/customers/list');
            }
        }

        fetchData();
    }, [])

    return (
        <>
            {customer ? (
                <div id="wp-customer-edit">
                    <div className="customer-edit-container">
                        <div className="title">
                            CHỈNH SỬA THÔNG TIN KHÁCH HÀNG
                        </div>

                        <div className="content">
                            <Formik
                                initialValues={{
                                    name: customer.NAME,
                                    email: customer.EMAIL,
                                    phone: customer.PHONE,
                                    address: customer.ADDRESS,
                                    dateOfBirth: customer.DATE_OF_BIRTH,
                                    gender: customer.GENDER,
                                    points: customer.POINTS,
                                }}

                                validationSchema={Yup.object({
                                    name: Yup.string()
                                        .required("Tên khách hàng không được để trống!")
                                        .min(2, "Tên khách hàng phải có ít nhất 2 ký tự!")
                                        .max(50, "Tên khách hàng không được vượt quá 50 ký tự!")
                                        .matches(/^[\p{L}\s]+$/u, "Staff name must not contain special characters!"),

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

                                    dateOfBirth: Yup.date()
                                        .required("Ngày sinh không được để trống!")
                                        .max(new Date(), "Ngày sinh không được là một ngày trong tương lai!")
                                        .typeError("Ngày sinh không hợp lệ! (VD: yyyy-MM-dd)"),

                                    gender: Yup.string()
                                        .required("Giới tính không được để trống!"),

                                    points: Yup.number()
                                        .required("Điểm tích lũy không được để trống!")
                                        .min(0, "Điểm tích lũy không được nhỏ hơn 0!")
                                        .typeError("Điểm tích lũy phải là một số!")
                                })}


                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        const response = await customerService.edit(values, id);

                                        if (response.success) {
                                            toast.success("Chỉnh sửa thông tin khách hàng thành công!");
                                            navigate('/admin/customers/list');
                                        } else {
                                            toast.error('Không thể cập nhật dịch vụ!');
                                        }
                                    } catch (error) {
                                        if (error.errors) {
                                            setErrors(error.errors);
                                            error.errors.forEach((err) => toast.error(err));
                                        } else {
                                            toast.error(error.message || "Có lỗi xảy ra!");
                                        }
                                    }
                                    setSubmitting(false);
                                }}
                            >

                                {({ isSubmitting }) => (
                                    <Form className="form">
                                        <div className="form-group">
                                            <label htmlFor="name">Tên khách hàng</label>
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
                                            <label htmlFor="dateOfBirth">Date of birth</label>
                                            <Field name="dateOfBirth" type="date" className="form-input" />
                                            <ErrorMessage name="dateOfBirth" component="div" className="error" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="gender">Gender</label>
                                            <Field as="select" name="gender" className="form-input" >
                                                <option value="">--Select gender--</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Field>
                                            <ErrorMessage name="gender" component="div" className="error" />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="points">Points</label>
                                            <Field name="points" type="text" className="form-input" />
                                            <ErrorMessage name="points" component="div" className="error" />
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
                                                    Cập Nhật
                                                </button>
                                            )}
                                        </div>
                                    </Form>
                                )}

                            </Formik>

                            <div>
                                <button onClick={() => navigate("/admin/customers/list")}>
                                    Quay lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="form-group">
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
            )}
        </>
    );
};

export default CustomerEdit;