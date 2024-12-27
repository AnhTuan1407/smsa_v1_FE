import '../../styles/css/staff/notification.css';
import { useState, useEffect } from 'react';

const Notification = () => {

    const notifications = [
        {
            id: 1,
            time: "5h00",
            service: "Combo cắt gội 10 bước",
            payment: "Visa",
        },
        {
            id: 2,
            time: "6h00",
            service: "Cắt tóc Undercut",
            payment: "MasterCard",
        },
        {
            id: 3,
            time: "7h00",
            service: "Gội đầu + Nhuộm",
            payment: "Cash",
        },
    ];

    const [notificationList, setNotificationList] = useState(notifications);

    const handleDeleteNotification = (id) => {
        setNotificationList(notificationList.filter((noti) => noti.id !== id));
    };

    const handleViewMore = () => {
        alert("Hiển thị thêm thông báo!");
    };

    const handleExit = () => {
        alert("Thoát thông báo!");
    };

    return (
        <div className="content-staffnoti">
            {notificationList.map((notification) => (
                <div key={notification.id} className="notification-staffnoti">
                    <h3>{`Thông báo có khách đặt lịch của bạn lúc ${notification.time}`}</h3>
                    <p>{`Đã đặt: ${notification.service}`}</p>
                    <p>{`Đã thanh toán bằng ${notification.payment}`}</p>
                    <i
                        className="fas fa-trash delete-staffnoti"
                        onClick={() => handleDeleteNotification(notification.id)}
                    ></i>
                </div>
            ))}
            <div className="button-container-staffnoti">
                <button
                    className="btn-staffnoti btn-primary-staffnoti"
                    onClick={handleViewMore}
                >
                    <i className=""></i>Xem thêm
                </button>
                <button
                    className="btn-staffnoti btn-secondary-staffnoti"
                    onClick={handleExit}
                >
                    <i className=""></i>Thoát
                </button>
            </div>
        </div>
    );
};

export default Notification;