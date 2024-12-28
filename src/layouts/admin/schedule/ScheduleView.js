import React, { useState, useEffect } from "react";
import * as shiftService from "../../../services/admin/ShiftService";
import * as staffService from "../../../services/admin/StaffService";
import * as scheduleService from "../../../services/admin/ScheduleService";
import { ToastContainer, toast } from "react-toastify";
import "../../../styles/css/admin/schedule/view.css";


const ScheduleView = () => {
    const [staffList, setStaffList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await staffService.findAll();
                setStaffList(response || []);
            } catch (error) {
                toast.error("Error fetching staff data: " + error.message);
            }
        };

        const fetchShiftData = async () => {
            try {
                const response = await shiftService.findAll();
                setShiftList(response.success ? response.data : []);
            } catch (error) {
                toast.error("Error fetching shift data: " + error.message);
            }
        };

        const fetchScheduleData = async () => {
            try {
                const response = await scheduleService.findAll();
                setScheduleList(response);
            } catch (error) {
                toast.error("Error fetching schedule data: " + error.message);
            }
        };

        fetchStaffData();
        fetchShiftData();
        fetchScheduleData();
    }, []);

    // Hàm lấy ngày đầu tuần và cuối tuần từ ngày hiện tại
    function getCurrentWeek() {
        const now = new Date();
        const start = now.getDate() - now.getDay() + 1; // Lấy ngày đầu tuần (thứ 2)
        const end = start + 6; // Lấy ngày cuối tuần (Chủ nhật)
        const startDate = new Date(now.setDate(start));
        const endDate = new Date(now.setDate(end));

        return { start: startDate, end: endDate };
    }

    // Hàm chuyển tuần
    const handleChangeWeek = (direction) => {
        const newStart = new Date(currentWeek.start);
        newStart.setDate(newStart.getDate() + (direction === "next" ? 7 : -7)); // Chuyển tuần
        const newEnd = new Date(newStart);
        newEnd.setDate(newStart.getDate() + 6); // Cập nhật lại ngày cuối tuần (Chủ nhật của tuần mới)

        setCurrentWeek({
            start: newStart,
            end: newEnd,
        });
    };

    // Hàm để lấy nhân viên làm việc theo ngày và ca
    const getStaffForShift = (date, shiftId) => {
        const staffOnDay = scheduleList.filter(
            (schedule) => schedule.WORK_DATE === date && schedule.SHIFT_ID === shiftId
        );
        return staffOnDay.map((schedule) => {
            const staff = staffList.find((s) => s.STAFF_ID === schedule.STAFF_ID);
            return staff ? staff.NAME : "Unknown";
        });
    };

    // Hàm lấy tên ngày đầy đủ và định dạng ngày tháng
    const formatDayAndDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    // Render bảng lịch
    const renderSchedule = () => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let scheduleRows = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(currentWeek.start);
            day.setDate(day.getDate() + i);

            const dayString = day.toISOString().split("T")[0]; // Lấy ngày theo format YYYY-MM-DD

            scheduleRows.push(
                <tr key={i}>
                    <td>{`${daysOfWeek[i]} (${formatDayAndDate(day)})`}</td>
                    <td>{getStaffForShift(dayString, 1).join(", ")}</td> {/* Buổi sáng */}
                    <td>{getStaffForShift(dayString, 2).join(", ")}</td> {/* Buổi chiều */}
                    <td>{getStaffForShift(dayString, 3).join(", ")}</td> {/* Full-time */}
                </tr>
            );
        }

        return scheduleRows;
    };

    return (
        <>
            <ToastContainer />
            <div className="schedule-view">
                <h1>Staff Schedule</h1>
                <div className="week-navigation">
                    <button onClick={() => handleChangeWeek("prev")}>Previous Week</button>
                    <button onClick={() => handleChangeWeek("next")}>Next Week</button>
                </div>
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Morning Shift</th>
                            <th>Afternoon Shift</th>
                            <th>Full-time</th>
                        </tr>
                    </thead>
                    <tbody>{renderSchedule()}</tbody>
                </table>
            </div>
        </>
    );
};

export default ScheduleView;
