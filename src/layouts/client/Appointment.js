import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as bookingService from "../../services/client/BookingService";
import * as staffService from "../../services/admin/StaffService";

const Appointment = () => {

    const [appointments, setAppointments] = useState([]);
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const userId = localStorage.getItem('idPerson');
            if (!userId) {
                toast.error("Không tìm thấy thông tin người dùng!");
                return;
            }

            try {
                const response = await bookingService.findByCustomer(userId);
                if (response.success) {
                    setAppointments(response.data);
                } else {
                    toast.error("Không thể tải thông tin cuộc hẹn!");
                }
            } catch (error) {
                toast.error("Có lỗi xảy ra khi tải thông tin cuộc hẹn: " + error.message);
            }
        };

        const fetchStaff = async () => {
            try {
                const response = await staffService.findAll();
                if (response) {
                    setStaffs(response);
                } else {
                    console.error('Unable to load staff list!');
                }
            } catch (error) {
                toast.error("Error loading staff list: " + error.message);
            }
        };

        fetchAppointments();
        fetchStaff();
    }, []);

    const getStaffName = (staffId) => {
        const staff = staffs.find(staff => staff.STAFF_ID === staffId);
        return staff ? staff.NAME : 'Unknown';
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    };

    return (
        <>
            <div className="main-content-staffappointment">
                {/* Appointment List */}
                <div className="appointments-list-staffappointment">
                    <h2 className="appointments-title-staffappointment">
                        <i className="far fa-calendar-alt"></i> Thông tin cuộc hẹn
                    </h2>

                    {appointments.map((appointment) => (
                        <div
                            key={appointment.APPOINTMENT_ID}
                            className="appointment-item-staffappointment"
                        >
                            <div className="appointment-details-staffappointment">
                                <strong>Stylist: {getStaffName(appointment.STAFF_ID)}</strong>
                                <p>Giờ bắt đầu: {formatTime(appointment.TIME_BOOKING)}</p>
                                <p>Ngày đặt lịch: {appointment.DATE_BOOKING}</p>
                            </div>
                            <span
                                className={`appointment-status-staffappointment ${appointment.STATUS ? appointment.STATUS.toLowerCase() : 'pending'}`}
                            >
                                {appointment.STATUS || 'Pending'}
                            </span>
                            <button className="view-details-staffappointment">
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Appointment;