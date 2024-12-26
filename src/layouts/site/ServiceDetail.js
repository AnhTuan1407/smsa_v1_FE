import React from 'react';
import '../../styles/css/site/service/detail.css';

const ServiceDetail = () => {
    return (
        <div id="wp-hair-cut-detail">
            <div className="hc-detailc-content">
                <div className="title">
                    CẮT TÓC KHOANG THƯƠNG GIA
                </div>
                <div className="hc-detail-banner">
                    <img src="/images/hair-cut-detail/banner.png" alt="Loading..." />
                </div>
                <div className="hc-detail-steps">
                    <div className="title">
                        Quy trình dịch vụ
                    </div>
                    <div className="sub-title">
                        Dịch vụ Cắt Tóc Khoang Thương Gia - Mang đến trải nghiệm dịch vụ đỉnh cao lần đầu tiên xuất hiện tại Việt Nam
                    </div>
                    <div className="steps-list">
                        <ul>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/1.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Khai huyệt</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/2.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Rửa mặt & Massage mặt</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/3.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Hút mụn</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/4.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Phun Hoa Hồng</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/5.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Gội đầu & Massage đầu</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/6.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Rửa tai & Ngoáy tai</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/7.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Xối nước thác đổ</div>
                                </div>
                            </li>
                            <li>
                                <div className="step-item">
                                    <div className="step-img">
                                        <img src="/images/steps/8.png" alt="Loading..." />
                                    </div>
                                    <div className="step-description">Cắt tóc</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="btn-booking">
                    <div className="content">
                        <a href="">ĐẶT LỊCH NGAY</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
