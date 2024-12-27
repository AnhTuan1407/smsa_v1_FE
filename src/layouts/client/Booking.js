import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import '../../styles/css/client/booking.css';

const Booking = () => {



    return (
        <>
            <div className="container-clientappointment">
                <h2>
                    <i className="fas fa-calendar-alt"></i> ĐẶT LỊCH GIỮ CHỖ
                </h2>

                <div className="form-group-clientappointment">
                    <label htmlFor="salon" className="form-label-clientappointment">
                        <i className="fas fa-store"></i> Salon gần nhất
                    </label>
                    <select id="salon" className="form-select-clientappointment">
                        <option value="">Xem tất cả salon</option>
                        <option value="salon1">SmSa - Cầu Giấy</option>
                        <option value="salon2">SmSa - Đống Đa</option>
                        <option value="salon3">SmSa - Hoàn Kiếm</option>
                    </select>
                </div>

                <div className="form-group-clientappointment">
                    <label htmlFor="service" className="form-label-clientappointment">
                        <i className="fas fa-cut"></i> Chọn dịch vụ
                    </label>
                    <select id="service" className="form-select-clientappointment">
                        <option value="">Xem tất cả dịch vụ</option>
                        <option value="service1">Cắt tóc nam</option>
                        <option value="service2">Uốn tóc</option>
                        <option value="service3">Nhuộm tóc</option>
                    </select>
                </div>

                <div className="form-group-clientappointment">
                    <label htmlFor="hairstyle" className="form-label-clientappointment">
                        <i className="fas fa-scissors"></i> Chọn kiểu tóc
                    </label>
                    <select id="hairstyle" className="form-select-clientappointment">
                        <option value="">Chia sẻ kiểu tóc mong muốn</option>
                        <option value="style1">Undercut</option>
                        <option value="style2">Mohawk</option>
                        <option value="style3">Pompadour</option>
                    </select>
                </div>

                <div className="form-group-clientappointment">
                    <label htmlFor="stylist" className="form-label-clientappointment">
                        <i className="fas fa-user"></i> Chọn ngày, giờ & stylist
                    </label>
                    <select id="stylist" className="form-select-clientappointment">
                        <option value="">Chọn stylist</option>
                        <option value="stylist1">Tony - 5 sao</option>
                        <option value="stylist2">David - 4.5 sao</option>
                        <option value="stylist3">John - 4.8 sao</option>
                    </select>
                </div>

                <div className="form-group-clientappointment">
                    <label htmlFor="datetime" className="form-label-clientappointment">
                        <i className="fas fa-calendar-day"></i> Chọn ngày và giờ
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        className="form-control-clientappointment"
                        min="2024-01-01T09:00"
                        max="2024-12-31T21:00"
                    />
                </div>

                <div className="form-group-clientappointment">
                    <label htmlFor="payment" className="form-label-clientappointment">
                        <i className="fas fa-money-bill-wave"></i> Phương thức thanh toán
                    </label>
                    <select id="payment" className="form-select-clientappointment">
                        <option value="">Phương thức thanh toán</option>
                        <option value="cash">Tiền mặt</option>
                        <option value="card">Thẻ ngân hàng</option>
                        <option value="momo">Ví MoMo</option>
                    </select>
                </div>

                <div
                    className="form-group-clientappointment button-group-clientappointment"
                    style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}
                >
                    <button
                        type="button"
                        className="cancel-btn-clientappointment"
                        style={{ width: "48%" }}
                    >
                        <i className="fas fa-times"></i> HỦY
                    </button>
                    <button
                        type="button"
                        className="confirm-btn-clientappointment"
                        style={{ width: "48%" }}
                    >
                        <i className="fas fa-check"></i> CHỐT GIỜ CẮT
                    </button>
                </div>
            </div>
        </>
    );
};

export default Booking;
