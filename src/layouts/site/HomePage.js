import React, { useEffect } from 'react';
import '../../styles/css/site/home/home-banner.css';
import '../../styles/css/site/home/home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const HomePage = () => {
    useEffect(() => {

    }, []);

    return (
        <div id="wp-home">
            <div id="wp-banner">
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    <SwiperSlide>
                        <a
                            href="https://30shine.com/kperm-uon-dinh-hinh-nep-toc"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/images/banner/banner-1.jpg" alt="Slide 1" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a
                            href="https://shinecombo.30shine.com/shincombophienban2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/images/banner/banner-2.jpg" alt="Slide 2" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a
                            href="https://shinecombo.30shine.com/shincombophienban2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/images/banner/banner-3.png" alt="Slide 3" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a
                            href="https://30shine.com/kperm-uon-dinh-hinh-nep-toc"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/images/banner/banner-4.jpeg" alt="Slide 4" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a
                            href="https://30shine.com/kperm-uon-dinh-hinh-nep-toc"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/images/banner/banner-5.jpg" alt="Slide 5" />
                        </a>
                    </SwiperSlide>
                    <SwiperSlide>
                        <a
                            href="https://30shine.com/kperm-uon-dinh-hinh-nep-toc"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="/images/banner/banner-6.jpg" alt="Slide 6" />
                        </a>
                    </SwiperSlide>
                </Swiper>

                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>

            <div id="form-booking-home">
                <div className="form-booking-content">
                    <div className="form-booking-slogan">
                        <div className="slogan-title">
                            ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY
                        </div>
                        <div className="slogan-text">Cắt xong trả tiền, hủy lịch không sao</div>
                    </div>
                    <div className="btn-booking">
                        <a href="#">ĐẶT LỊCH NGAY</a>
                    </div>
                </div>
            </div>

            <div id="wp-service">
                <div className="service-content">
                    <div className="category-title">
                        DỊCH VỤ TÓC
                    </div>

                    <div className="service-list">
                        <ul>
                            <li>
                                <div className="service-item">
                                    <div className="service-img">
                                        <a href="/api/client/service/detail"><img src="/images/uon-1.jpg" alt="" /></a>
                                    </div>
                                    <div className="service-info">
                                        <div className="service-label">
                                            <a href="">Cắt tóc</a>
                                        </div>
                                        <div className="service-description">
                                            <a href="">Tìm hiểu thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="service-item">
                                    <div className="service-img">
                                        <a href=""><img src="/images/uon-2.jpg" alt="" /></a>
                                    </div>
                                    <div className="service-info">
                                        <div className="service-label">
                                            <a href="">Uốn định hình</a>
                                        </div>
                                        <div className="service-description">
                                            <a href="">Tìm hiểu thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="service-item">
                                    <div className="service-img">
                                        <a href=""><img src="/images/uon-3.jpg" alt="" /></a>
                                    </div>
                                    <div className="service-info">
                                        <div className="service-label">
                                            <a href="">Thay đổi màu tóc</a>
                                        </div>
                                        <div className="service-description">
                                            <a href="">Tìm hiểu thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="service-content">
                    <div className="category-title">
                        SPA & RELAX
                    </div>

                    <div className="service-list">
                        <ul>
                            <li>
                                <div className="service-item">
                                    <div className="service-img">
                                        <a href=""><img src="/images/pc_home_spa_1.png" alt="" /></a>
                                    </div>
                                    <div className="service-info">
                                        <div className="service-label">
                                            <a href="">Gội Massage Relax</a>
                                        </div>
                                        <div className="service-description">
                                            <a href="">Tìm hiểu thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="service-item">
                                    <div className="service-img">
                                        <a href=""><img src="/images/pc_home_spa_3.png" alt="" /></a>
                                    </div>
                                    <div className="service-info">
                                        <div className="service-label">
                                            <a href="">Lấy ráy tai êm</a>
                                        </div>
                                        <div className="service-description">
                                            <a href="">Tìm hiểu thêm</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="wp-loyalty">
                <div className="loyalty-content">
                    <div className="loyalty-title">
                        LOYAL MEMBER
                    </div>
                    <div className="loyalty-subtitle">
                        Khi tham gia chương trình thành viên, anh được hưởng những ưu đãi đặc biệt và nhiều quyền
                        lợi vượt trội trong quá trình sử dụng dịch vụ
                    </div>
                    <div className="loyalty-img">
                        <img src="/images/shine-member-20241022.jpg" alt="Loading..." />
                    </div>
                </div>
            </div>

            <div id="wp-top-staff">
                <div className="top-staff-content">
                    <div className="top-staff-title">
                        TOP THỢ CẮT TÓC TRONG THÁNG
                    </div>
                    <div className="top-staff-subtitle">
                        Đội ngũ Stylist giàu kinh nghiệm
                    </div>
                    <div className="top-staff-list">
                        <ul>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff1.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff2.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff3.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff4.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff5.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff6.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff7.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff8.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff9.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="staff-item">
                                    <div className="staff-img">
                                        <img src="/images/staff/staff10.jpg" alt="" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
