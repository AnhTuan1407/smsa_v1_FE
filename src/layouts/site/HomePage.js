import React, { useEffect, useState } from 'react';
import '../../styles/css/site/home/home-banner.css';
import '../../styles/css/site/home/home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import * as categoryService from '../../services/admin/CategoryService';
import * as subCategoryService from '../../services/admin/SubCategory';
import * as service from '../../services/admin/Service';
import { toast } from 'react-toastify';

const HomePage = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.findAll();
                if (response.success) {
                    setCategories(response.data);
                } else {
                    console.error('Unable to load category list!');
                }
            } catch (error) {
                toast.error("Error loading category list: " + error.message);
            }
        };

        const fetchSubCategories = async () => {
            try {
                const response = await subCategoryService.findAll();
                if (response.success) {
                    setSubCategories(response.data);
                } else {
                    console.error('Unable to load subcategory list!');
                }
            } catch (error) {
                toast.error("Error loading subcategory list: " + error.message);
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
                toast.error('Error loading service list: ' + error.message);
            }
        };

        fetchCategories();
        fetchSubCategories();
        fetchServices();
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
                    <div className="btn-booking-home">
                        <a href="/client/booking">ĐẶT LỊCH NGAY</a>
                    </div>
                </div>
            </div>

            <div id="wp-service">
                {categories.map((category) => (
                    <div className="service-content" key={category.CATEGORY_ID}>
                        <div className="category-title">{category.NAME}</div>

                        <div className="service-list">
                            <ul>
                                {subCategories
                                    .filter((subCategory) => subCategory.CATEGORY_ID === category.CATEGORY_ID)
                                    .map((subCategory) => (
                                        <li key={subCategory.SUB_CATEGORY_ID}>
                                            <div className="service-item">
                                                <div className="service-img">
                                                    <a href={`/client/subCategory/detail/${subCategory.SUB_CATEGORY_ID}`}>
                                                        {subCategory.IMAGE ? (
                                                            <img
                                                                src={`data:image/jpeg;base64,${subCategory.IMAGE}`}
                                                                alt={subCategory.NAME}
                                                                className="service-image"
                                                            />
                                                        ) : (
                                                            'No Image'
                                                        )}
                                                    </a>
                                                </div>
                                                <div className="service-info">
                                                    <div className="service-label">
                                                        <a href={`/client/subCategory/detail/${subCategory.SUB_CATEGORY_ID}`}>
                                                            {subCategory.NAME}
                                                        </a>
                                                    </div>
                                                    <div className="service-description">
                                                        <a href={`/client/subCategory/detail/${subCategory.SUB_CATEGORY_ID}`}>
                                                            Tìm hiểu thêm
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                ))}
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
