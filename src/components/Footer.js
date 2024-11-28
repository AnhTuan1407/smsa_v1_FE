import React from 'react';
import '../styles/css/partials/footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-links-1">
                    <ul>
                        <li><a href="#">Về chúng tôi</a></li>
                        <li><a href="#">Học cắt tóc</a></li>
                        <li><a href="#">Tìm SmSa gần nhất</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="footer-links-2">
                    <ul>
                        <li><a href="#">Hotline (1000đ/phút): 1900.27.27.03</a></li>
                        <li><a href="#">Liên hệ học nghề tóc: 0967.86.3030</a></li>
                        <li><a href="#">Liên hệ nhượng quyền</a></li>
                        <li><a href="#">Liên hệ quảng cáo</a></li>
                    </ul>
                </div>
                <div className="footer-links-3">
                    <ul>
                        <li><a href="#">Giờ phục vụ: Thứ 2 đến Chủ Nhật, 7h00 - 17h00</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Điều kiện giao dịch chung</a></li>
                        <li><a href="#">Giấy phép giáo dục nghề nghiệp</a></li>
                    </ul>
                </div>

                <div className="application-download">
                    <p>Tải ứng dụng SmSa</p>

                    <div>
                        <div>
                            <a href="#"><img src="/images/footer/footer_apple.png" alt="Apple Store" className="btn-app-store" /></a>
                            <a href="#"><img src="/images/footer/footer_googleplay.png" alt="Google Play" className="btn-gg-play" /></a>
                        </div>
                        <img src="/images/download-app-qr.png" alt="QR Code" className="qr-code" />
                    </div>
                </div>

                <div className="info-social-media">
                    <p>Tham gia cộng đồng 2,5 triệu thành viên</p>

                    <div>
                        <div className="tiktok">
                            <a href="#">
                                <img src="/images/footer/tiktok-icon.png" alt="Tiktok" />
                                <div>600k follow</div>
                            </a>
                        </div>
                        <div className="youtube">
                            <a href="#">
                                <img src="/images/footer/youtube-icon.png" alt="YouTube" />
                                <div>1300k follow</div>
                            </a>
                        </div>
                        <div className="facebook">
                            <a href="#">
                                <img src="/images/footer/facebook-icon.png" alt="Facebook" />
                                <div>200k follow</div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <a href="#"><img src="/images/footer/footer_congthuongicon.png" alt="Cong Thuong" style={{ width: '68px', height: '28px' }} /></a>
                        <a href="#"><img src="/images/footer/footer_dmca.png" alt="DMCA" style={{ width: '48px', height: '28px' }} /></a>
                    </div>
                </div>
            </div>

            <div className="footer-copyright">
                © 2015 Công Ty Cổ Phần TMDV 30Shine / Địa chỉ: 82 Trần Đại Nghĩa, P. Đồng Tâm, Q. Hai Bà Trưng, HN/ GPĐKKD số
                010.7467.693 do Sở KHĐT TP.HN cấp ngày 08/06/2016.
            </div>
        </div>
    );
};

export default Footer;
