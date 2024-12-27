import '../../styles/css/staff/profile.css';

const Profile = () => {

    return (
        <>
            <div className="content-staffinfo">
                <div className="staff-info-staffinfo">
                    <h2 className="info-title-staffinfo">
                        <i className="fas fa-user-circle"></i> Thông tin cá nhân
                    </h2>
                    <div className="info-container-staffinfo">
                        <div className="info-grid-staffinfo">
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-user"></i> Họ và tên:
                                </label>
                                <span>Nguyễn Văn A</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-venus-mars"></i> Giới tính:
                                </label>
                                <span>Nam</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-birthday-cake"></i> Ngày sinh:
                                </label>
                                <span>01/01/1990</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-id-card"></i> CCCD:
                                </label>
                                <span>079123456789</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-envelope"></i> Email:
                                </label>
                                <span>nguyenvana@gmail.com</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-star"></i> Kinh nghiệm:
                                </label>
                                <span>5 năm kinh nghiệm cắt tóc nam</span>
                            </div>
                            <div className="info-item-staffinfo">
                                <label>
                                    <i className="fas fa-map-marker-alt"></i> Địa chỉ:
                                </label>
                                <span>123 Đường ABC, Phường XYZ, Quận 1, TP.HCM</span>
                            </div>
                        </div>
                        <div className="profile-image-staffinfo">
                            <img alt="Staff Profile" />
                            <div className="change-photo-wrapper-staffinfo">
                                <button className="change-photo-btn-staffinfo">Thay đổi ảnh</button>
                            </div>
                        </div>
                    </div>
                    <div className="button-center-staffinfo" style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button className="change-photo-btn-staffinfo">
                            <i></i> Chỉnh sửa thông tin
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;