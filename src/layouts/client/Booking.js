
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../../styles/css/client/booking.css';
import * as locationService from "../../services/admin/LocationService";
import * as bookingService from "../../services/client/BookingService";
import * as service from "../../services/admin/Service";
import * as staffService from "../../services/admin/StaffService";
import * as scheduleService from "../../services/admin/ScheduleService";


const Booking = () => {
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showServicePopup, setShowServicePopup] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const tokenUser = localStorage.getItem('tokenUser');
        const role = localStorage.getItem('role');
        if (!tokenUser) {
            toast.error("Vui lòng đăng nhập để tiếp tục!");
            navigate('/');
            return;
        }

        if (role !== "Customer") {
            toast.error("Chỉ có khác hàng mới có thể đặt lịch!");
            navigate('/');
            return;
        }

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

        const fetchServices = async () => {
            try {
                const response = await service.findAll();
                if (response.success) {
                    setServices(response.data);
                } else {
                    console.error('Unable to load service list!');
                }
            } catch (error) {
                toast.error("Error loading service list: " + error.message);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await locationService.findAll();
                if (response) {
                    setLocations(response);
                } else {
                    console.error('Unable to load location list!');
                }
            } catch (error) {
                toast.error("Error loading location list: " + error.message);
            }
        };

        fetchServices();
        fetchLocations();
        fetchStaff();
    }, []);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        // Fetch staff based on selected location
        fetchStaffByLocation(event.target.value);
    };

    const fetchStaffByLocation = async (locationId) => {
        try {
            const response = await staffService.findByLocation(locationId);
            if (response) {
                setStaffs(response);
            } else {
                console.error('Unable to load staff list for location!');
            }
        } catch (error) {
            toast.error("Error loading staff list for location: " + error.message);
        }
    };

    const handleServiceClick = () => {
        if (!selectedLocation) {
            toast.error("Vui lòng chọn cơ sở trước!");
            return;
        }
        setShowServicePopup(true);
    };

    const handleServiceSelect = (service) => {
        const isSelected = selectedServices.some(s => s.SERVICE_ID === service.SERVICE_ID);
        if (isSelected) {
            setSelectedServices(selectedServices.filter(s => s.SERVICE_ID !== service.SERVICE_ID));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handlePopupClose = () => {
        setShowServicePopup(false);
    };

    const handleStaffChange = async (event) => {
        const staffId = event.target.value;
        setSelectedStaff(staffId);
        if (staffId) {
            try {
                const response = await scheduleService.findByStaff(staffId);
                if (response) {
                    setSchedule(response);
                } else {
                    console.error('Unable to load schedule!');
                }
            } catch (error) {
                toast.error("Error loading schedule: " + error.message);
            }
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = async () => {
        if (!selectedLocation || !selectedServices.length || !selectedStaff || !selectedDate || !selectedTime) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const bookingData = {
            customerId: localStorage.getItem('idPerson'),
            staffId: selectedStaff,
            serviceIds: selectedServices.map(service => service.SERVICE_ID),
            date: selectedDate,
            time: selectedTime,
        };

        try {
            const response = await bookingService.create(bookingData);
            if (response.success) {
                toast.success("Đặt lịch thành công!");
                navigate('/'); // Điều hướng về trang chủ hoặc trang khác sau khi đặt lịch thành công
            } else {
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const handleBack = () => {
        navigate(-1); // Điều hướng về trang trước đó
    };

    const calculateTotalPrice = () => {
        return selectedServices.reduce((total, service) => total + service.PRICE, 0);
    };

    const generateTimeSlots = () => {
        const slots = [];
        let startTime = 7 * 60; // 7:00 AM in minutes
        const endTime = 20 * 60; // 8:00 PM in minutes

        while (startTime < endTime) {
            const hours = Math.floor(startTime / 60);
            const minutes = startTime % 60;
            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push(time);
            startTime += 30; // Increment by 30 minutes
        }

        return slots;
    };

    const isTimeSlotDisabled = (time) => {
        const currentDate = new Date();
        const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Current time in minutes
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;

        // Disable past time slots if selected date is today
        if (selectedDate === currentDate.toISOString().split('T')[0] && timeInMinutes < currentTime) {
            return true;
        }

        // Check if the staff is working on the selected date
        const staffSchedule = schedule.find(s => s.WORK_DATE === selectedDate);

        if (!staffSchedule) {
            return true; // No schedule for the selected date
        }

        // Disable time slots based on the shift
        if (staffSchedule.SHIFT_ID === 1 && (timeInMinutes < 7 * 60 || timeInMinutes >= 11 * 60)) {
            return true; // Morning shift: 7:00 AM - 11:00 AM
        }
        if (staffSchedule.SHIFT_ID === 2 && (timeInMinutes < 13 * 60 || timeInMinutes >= 17 * 60)) {
            return true; // Afternoon shift: 1:00 PM - 5:00 PM
        }
        if (staffSchedule.SHIFT_ID === 3 && (timeInMinutes < 7 * 60 || timeInMinutes >= 17 * 60)) {
            return true; // Full day shift: 7:00 AM - 5:00 PM
        }

        return false;
    };

    const getDateOptions = () => {
        const options = [];
        const currentDate = new Date();
        for (let i = 0; i < 2; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            options.push(date.toISOString().split('T')[0]);
        }
        return options;
    };

    return (
        <>
            {!showServicePopup && (
                <div className="container-clientappointment">
                    <h2>
                        <i className="fas fa-calendar-alt"></i> ĐẶT LỊCH GIỮ CHỖ
                    </h2>

                    <div className="form-group-clientappointment">
                        <label htmlFor="salon" className="form-label-clientappointment">
                            <i className="fas fa-store"></i> Chọn salon
                        </label>
                        <select id="salon" className="form-select-clientappointment" onChange={handleLocationChange} value={selectedLocation}>
                            <option value="">Xem tất cả salon</option>
                            {locations.map(location => (
                                <option key={location.LOCATION_ID} value={location.LOCATION_ID}>{location.NAME}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group-clientappointment">
                        <label htmlFor="service" className="form-label-clientappointment">
                            <i className="fas fa-cut"></i> Chọn dịch vụ
                        </label>
                        <button onClick={handleServiceClick} disabled={!selectedLocation}>Chọn dịch vụ</button>
                        <div>Số lượng dịch vụ đã chọn: {selectedServices.length}</div>
                        {selectedServices.length > 0 && (
                            <div className="selected-services">
                                {selectedServices.map(service => (
                                    <span key={service.SERVICE_ID}>{service.NAME}</span>
                                ))}
                                <div className="total-price">Tổng thanh toán: {calculateTotalPrice()} VND</div>
                            </div>
                        )}
                    </div>

                    <div className="form-group-clientappointment">
                        <label htmlFor="stylist" className="form-label-clientappointment">
                            <i className="fas fa-user"></i> Chọn stylist
                        </label>
                        <select id="stylist" className="form-select-clientappointment" onChange={handleStaffChange} disabled={selectedServices.length === 0}>
                            <option value="">Chọn stylist</option>
                            {staffs.map(staff => (
                                <option key={staff.STAFF_ID} value={staff.STAFF_ID}>
                                    {staff.NAME}
                                    <img src={`data:image/png;base64,${staff.IMAGE}`} alt={staff.NAME} />
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedStaff && (
                        <div className="form-group-clientappointment">
                            <label htmlFor="date" className="form-label-clientappointment">
                                <i className="fas fa-calendar-day"></i> Chọn ngày
                            </label>
                            <select id="date" className="form-select-clientappointment" onChange={handleDateChange} value={selectedDate}>
                                <option value="">Chọn ngày</option>
                                {getDateOptions().map(date => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedDate && (
                        <div className="form-group-clientappointment">
                            <label htmlFor="time" className="form-label-clientappointment">
                                <i className="fas fa-clock"></i> Chọn thời gian
                            </label>
                            <div className="time-slots">
                                {generateTimeSlots().map(time => (
                                    <button
                                        key={time}
                                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                        onClick={() => handleTimeSelect(time)}
                                        disabled={isTimeSlotDisabled(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="form-group-clientappointment button-group-clientappointment">
                        <button className="confirm-btn-clientappointment" onClick={handleSubmit}>Submit</button>
                        <button className="cancel-btn-clientappointment" onClick={handleBack}>Quay lại</button>
                    </div>
                </div>
            )}

            {showServicePopup && (
                <div className="service-popup">
                    <div className="service-popup-content">
                        <h3>Chọn dịch vụ</h3>
                        <div className="service-grid">
                            {services.map(service => (
                                <div key={service.SERVICE_ID} className="service-card">
                                    <div className="service__image">
                                        <img src={`data:image/png;base64,${service.IMAGE}`} alt={service.NAME} />
                                    </div>
                                    <div className="service-info">
                                        <div className="service-name">{service.NAME}</div>
                                        <div className="service-time">
                                            <img src="/static/media/icon_time.62b92678.svg" alt="" />
                                            {service.ESTIMATE_TIME} phút
                                        </div>
                                    </div>
                                    <div className="service-description">{service.DESCRIPTION}</div>
                                    <div className="service-price">{service.PRICE} VND</div>
                                    <div className="service-add" onClick={() => handleServiceSelect(service)}>
                                        <img src="/static/media/icon_checked_blue.4e00d627.svg" alt="icon" />
                                        {selectedServices.some(s => s.SERVICE_ID === service.SERVICE_ID) ? 'Đã thêm' : 'Thêm dịch vụ'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="service-popup-footer">
                        <div className="selected-services-count">
                            Số lượng dịch vụ đã chọn: {selectedServices.length}
                        </div>
                        <div className="total-price">
                            Tổng thanh toán: {calculateTotalPrice()} VND
                        </div>
                        <button onClick={handlePopupClose}>Xong</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Booking;