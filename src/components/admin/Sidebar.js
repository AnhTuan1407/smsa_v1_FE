import React, { useEffect } from 'react';
import '../../assets/css/sb-admin-2.css';
import '../../assets/css/sb-admin-2.min.css';

const Sidebar = () => {

    return (
        <div id="page-top">

            <div id="wrapper">
                {/* Sidebar */}

                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    {/* Sidebar - Brand */}
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin/dashboard">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">SMSA Admin</div>
                    </a>

                    {/* Divider */}
                    <hr className="sidebar-divider my-0"></hr>

                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active">
                        <a className="nav-link" href="/admin/dashboard">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span></a>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider"></hr>

                    {/* Heading */}
                    <div className="sidebar-heading">
                        System
                    </div>

                    {/* Nav Item - Category */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/admin/category/list" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-shopping-cart"></i>
                            <span>Quản lý danh mục</span>
                        </a>
                    </li>

                    {/* Nav Item - SubCategory */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/admin/subCategory/list" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-shopping-cart"></i>
                            <span>Quản lý danh mục phụ</span>
                        </a>
                    </li>

                    {/* Nav Item - Products */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/admin/products/list" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-shopping-cart"></i>
                            <span>Quản lý sản phẩm</span>
                        </a>
                    </li>

                    {/* Nav Item - Services */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/admin/services/list" data-toggle="collapse" data-target="#collapseUtilities"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-bath"></i>
                            <span>Quản lý dịch vụ</span>
                        </a>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider"></hr>

                    {/* Heading */}
                    <div className="sidebar-heading">
                        Addons
                    </div>

                    {/* Nav Item - Customers */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/admin/customers/list" data-toggle="collapse" data-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-user"></i>
                            <span>Quản lý người dùng</span>
                        </a>
                    </li>

                    {/* Nav Item - Staff */}

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/admin/staff/list" data-toggle="collapse" data-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-users"></i>
                            <span>Quản lý nhân viên</span>
                        </a>
                    </li>

                    {/* Nav Item - Tables */}
                    <li className="nav-item">
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Tables</span></a>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block"></hr>

                    {/* Sidebar Toggler (Sidebar) */}
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                    {/* Sidebar Message */}
                    <div className="sidebar-card d-none d-lg-flex">
                        <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                        <p className="text-center mb-2"><strong>SMSA Admin Pro</strong> is packed with premium features,
                            components,
                            and more!</p>
                        <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to
                            Pro!</a>
                    </div>

                </ul>
                {/* End of Sidebar */}
            </div>
        </div>
    );
}

export default Sidebar;