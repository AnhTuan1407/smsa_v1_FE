import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import * as shiftService from "../../../services/admin/ShiftService";
import * as staffService from "../../../services/admin/StaffService";
import * as scheduleService from "../../../services/admin/ScheduleService";
import { format, parse } from "date-fns";
import "../../../styles/css/admin/schedule/create.css";

const ScheduleCreate = () => {
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedShift, setSelectedShift] = useState("");

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

        fetchStaffData();
        fetchShiftData();
    }, []);

    const toggleStaffSelection = (staff) => {
        setSelectedStaff((prev) =>
            prev.includes(staff)
                ? prev.filter((s) => s !== staff)
                : [...prev, staff]
        );
    };

    const handleSubmit = async () => {
        if (!selectedDate || !selectedShift || selectedStaff.length === 0) {
            toast.error("Please select all required fields!");
            return;
        }

        try {
            const payload = {
                date: selectedDate,
                shiftId: selectedShift,
                staffIds: selectedStaff.map((staff) => staff.STAFF_ID),
            };

            const splitSchedule = async () => {
                const response = await scheduleService.create(payload);

                if (response.success) {
                    toast.success("Schedule created successfully!");
                } else {
                    toast.error("Failed to create Schedule!");
                }
            };
            splitSchedule();
        } catch (error) {
            toast.error("Error creating schedule: " + error.message);
        }
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        setSelectedDate(formattedDate);
    };

    return (
        <div className="schedule-create-container">
            <h1>Split Schedule</h1>
            <ToastContainer />

            {/* Staff Selection */}
            <div className="staff-selection-section">
                <h2>Select Staff</h2>
                <div className="staff-list">
                    {staffList.map((staff) => (
                        <div
                            key={staff.STAFF_ID}
                            className={`staff-item-schedule ${selectedStaff.includes(staff) ? "selected" : ""}`}
                            onClick={() => toggleStaffSelection(staff)}
                        >
                            <img
                                src={`data:image/jpeg;base64,${staff.IMAGE}`}
                                alt={staff.NAME}
                                className="staff-image-schedule"
                            />
                            <p>{staff.NAME}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Date Picker */}
            <div className="date-picker-section">
                <h2>Select Date</h2>
                <DatePicker
                    selected={selectedDate ? parse(selectedDate, "yyyy-MM-dd", new Date()) : null}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                />
            </div>

            {/* Shift Selection */}
            <div className="shift-selection-section">
                <h2>Select Shift</h2>
                <select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                >
                    <option value="">-- Select Shift --</option>
                    {shiftList.map((shift) => (
                        <option key={shift.SHIFT_ID} value={shift.SHIFT_ID}>
                            {shift.NAME}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <div className="submit-button-section">
                <button onClick={handleSubmit}>Create Schedule</button>
            </div>
        </div>
    );
};

export default ScheduleCreate;
