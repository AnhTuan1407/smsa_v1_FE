import '../../styles/css/staff/history.css';

const History = () => {

    const appointments = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            details: "Combo Cắt + Gội + Massage | 14:30 - 20/11/2023",
            status: "Đang thực hiện",
            statusClass: "status-pending-staffappointment",
        },
        {
            id: 2,
            name: "Trần Thị B",
            details: "Cắt tóc Undercut | 10:00 - 15/11/2023",
            status: "Đã hoàn thành",
            statusClass: "status-completed-staffappointment",
        },
        {
            id: 3,
            name: "Lê Văn C",
            details: "Gội + Nhuộm | 16:00 - 22/11/2023",
            status: "Sắp tới",
            statusClass: "status-pending-staffappointment",
        },
        {
            id: 4,
            name: "Phạm Thị D",
            details: "Uốn + Duỗi | 09:00 - 23/11/2023",
            status: "Sắp tới",
            statusClass: "status-pending-staffappointment",
        },
        {
            id: 5,
            name: "Hoàng Văn E",
            details: "Nhuộm + Phục hồi | 13:00 - 23/11/2023",
            status: "Sắp tới",
            statusClass: "status-pending-staffappointment",
        },
    ];

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
                            key={appointment.id}
                            className="appointment-item-staffappointment"
                        >
                            <div className="appointment-details-staffappointment">
                                <strong>{appointment.name}</strong>
                                <p>{appointment.details}</p>
                            </div>
                            <span
                                className={`appointment-status-staffappointment ${appointment.statusClass}`}
                            >
                                {appointment.status}
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

export default History;