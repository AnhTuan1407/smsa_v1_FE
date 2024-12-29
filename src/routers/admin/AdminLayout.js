import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const AdminLayout = () => {

    const { user, logout } = useAuth();

    return (
        <>
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
                            SYSTEM MANAGEMENT
                        </div>

                        {/* Nav Item - Category */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/category/list" data-toggle="collapse" data-target="#collapseCategory"
                                aria-expanded="false" aria-controls="collapseCategory">
                                <i className="fas fa-fw fa-shopping-cart"></i>
                                <span>Categories</span>
                            </a>
                            <div id="collapseCategory" className="collapse" aria-labelledby="headingCategory" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/category/list">List of Categories</a>
                                    <a className="collapse-item" href="/admin/category/create">Create new Category</a>
                                </div>
                            </div>
                        </li>

                        {/* Nav Item - SubCategory */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/subCategory/list" data-toggle="collapse" data-target="#collapseSubCategory"
                                aria-expanded="false" aria-controls="collapseSubCategory">
                                <i className="fas fa-fw fa-shopping-cart"></i>
                                <span>Subcategories</span>
                            </a>
                            <div id="collapseSubCategory" className="collapse" aria-labelledby="headingSubCategory" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/subCategory/list">List of Subcategories</a>
                                    <a className="collapse-item" href="/admin/subCategory/create">Create new Subcategory</a>
                                </div>
                            </div>
                        </li>

                        {/* Nav Item - Products */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/products/list" data-toggle="collapse" data-target="#collapseProducts"
                                aria-expanded="false" aria-controls="collapseProducts">
                                <i className="fas fa-fw fa-shopping-cart"></i>
                                <span>Products</span>
                            </a>
                            <div id="collapseProducts" className="collapse" aria-labelledby="headingProducts" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/products/list">List of Products</a>
                                    <a className="collapse-item" href="/admin/products/create">Create new Products</a>
                                </div>
                            </div>
                        </li>

                        {/* Nav Item - Services */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/services/list" data-toggle="collapse" data-target="#collapseServices"
                                aria-expanded="false" aria-controls="collapseServices">
                                <i className="fas fa-fw fa-bath"></i>
                                <span>Services</span>
                            </a>
                            <div id="collapseServices" className="collapse" aria-labelledby="headingServices" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/services/list">List of Services</a>
                                    <a className="collapse-item" href="/admin/services/create">Create new Services</a>
                                </div>
                            </div>
                        </li>


                        {/* Divider */}
                        <hr className="sidebar-divider"></hr>

                        {/* Heading */}
                        <div className="sidebar-heading">
                            INFORMATIONS
                        </div>

                        {/* Nav Item - Customers */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/customers/list" data-toggle="collapse" data-target="#collapseCustomers"
                                aria-expanded="false" aria-controls="collapseCustomers">
                                <i className="fas fa-fw fa-user"></i>
                                <span>Customers</span>
                            </a>
                            <div id="collapseCustomers" className="collapse" aria-labelledby="headingCustomers" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/customers/list">List of Customers</a>
                                </div>
                            </div>
                        </li>

                        {/* Nav Item - Staff */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/staff/list" data-toggle="collapse" data-target="#collapseStaff"
                                aria-expanded="false" aria-controls="collapseStaff">
                                <i className="fas fa-fw fa-users"></i>
                                <span>Staff</span>
                            </a>
                            <div id="collapseStaff" className="collapse" aria-labelledby="headingStaff" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/staff/list">List of Staff</a>
                                    <a className="collapse-item" href="/admin/staff/create">Add New Staff</a>
                                </div>
                            </div>
                        </li>

                        {/* Nav Item - Schedule */}
                        <li className="nav-item">
                            <a className="nav-link collapsed" href="/admin/staff/list" data-toggle="collapse" data-target="#collapseSchedule"
                                aria-expanded="false" aria-controls="collapseSchedule">
                                <i className="fas fa-fw fa-users"></i>
                                <span>Schedule</span>
                            </a>
                            <div id="collapseSchedule" className="collapse" aria-labelledby="headingSchedule" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Options:</h6>
                                    <a className="collapse-item" href="/admin/schedule/view">View Staff Schedules</a>
                                    <a className="collapse-item" href="/admin/schedule/create">Split Schedule</a>
                                </div>
                            </div>
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
                            <img className="sidebar-card-illustration mb-2" src="/images/admin/undraw_rocket.svg" alt="..." />
                            <p className="text-center mb-2"><strong>SMSA Admin Pro</strong> is packed with premium features,
                                components,
                                and more!</p>
                            <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to
                                Pro!</a>
                        </div>

                    </ul>
                    {/* End of Sidebar */}

                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                                {/* Sidebar Toggle (Topbar) */}
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>

                                {/* Topbar Search */}
                                <form
                                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Topbar Navbar */}
                                <ul className="navbar-nav ml-auto">

                                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw"></i>
                                        </a>
                                        {/* Dropdown - Messages */}
                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                            aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small"
                                                        placeholder="Search for..." aria-label="Search"
                                                        aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>

                                    {/* Nav Item - Alerts */}
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-bell fa-fw"></i>
                                            {/* Counter - Alerts */}
                                            <span className="badge badge-danger badge-counter">3+</span>
                                        </a>
                                        {/* Dropdown - Alerts */}
                                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="alertsDropdown">
                                            <h6 className="dropdown-header">
                                                Alerts Center
                                            </h6>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-primary">
                                                        <i className="fas fa-file-alt text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="small text-gray-500">December 12, 2019</div>
                                                    <span className="font-weight-bold">A new monthly report is ready to
                                                        download!</span>
                                                </div>
                                            </a>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-success">
                                                        <i className="fas fa-donate text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="small text-gray-500">December 7, 2019</div>
                                                    $290.29 has been deposited into your account!
                                                </div>
                                            </a>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-warning">
                                                        <i className="fas fa-exclamation-triangle text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="small text-gray-500">December 2, 2019</div>
                                                    Spending Alert: We've noticed unusually high spending for your account.
                                                </div>
                                            </a>
                                            <a className="dropdown-item text-center small text-gray-500" href="#">Show All
                                                Alerts</a>
                                        </div>
                                    </li>

                                    {/* Nav Item - Messages */}
                                    <li className="nav-item dropdown no-arrow mx-1">
                                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-envelope fa-fw"></i>
                                            {/* Counter - Messages */}
                                            <span className="badge badge-danger badge-counter">7</span>
                                        </a>
                                        {/* Dropdown - Messages */}
                                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="messagesDropdown">
                                            <h6 className="dropdown-header">
                                                Message Center
                                            </h6>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle" src="/images/admin/undraw_profile_1.svg" alt="..." />
                                                    <div className="status-indicator bg-success"></div>
                                                </div>
                                                <div className="font-weight-bold">
                                                    <div className="text-truncate">Hi there! I am wondering if you can help me with
                                                        a
                                                        problem I've been having.</div>
                                                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle" src="/images/admin/undraw_profile_2.svg" alt="..." />
                                                    <div className="status-indicator"></div>
                                                </div>
                                                <div>
                                                    <div className="text-truncate">I have the photos that you ordered last month,
                                                        how
                                                        would you like them sent to you?</div>
                                                    <div className="small text-gray-500">Jae Chun · 1d</div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle" src="/images/admin/undraw_profile_3.svg" alt="..." />
                                                    <div className="status-indicator bg-warning"></div>
                                                </div>
                                                <div>
                                                    <div className="text-truncate">Last month's report looks great, I am very happy
                                                        with
                                                        the progress so far, keep up the good work!</div>
                                                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle"
                                                        src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..." />
                                                    <div className="status-indicator bg-success"></div>
                                                </div>
                                                <div>
                                                    <div className="text-truncate">Am I a good boy? The reason I ask is because
                                                        someone
                                                        told me that people say this to all dogs, even if they aren't good...
                                                    </div>
                                                    <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item text-center small text-gray-500" href="#">Read More
                                                Messages</a>
                                        </div>
                                    </li>

                                    <div className="topbar-divider d-none d-sm-block"></div>

                                    {/* Nav Item - User Information */}
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                            <img className="img-profile rounded-circle" src="/images/admin/undraw_profile.svg" />
                                        </a>
                                        {/* Dropdown - User Information */}
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                            aria-labelledby="userDropdown">
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Profile
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Settings
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Activity Log
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#" onClick={logout} data-toggle="modal" data-target="#logoutModal">
                                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Logout
                                            </a>
                                        </div>
                                    </li>

                                </ul>

                            </nav>
                            {/* End of Topbar */}

                            {/* Begin Page Content */}
                            <div class="container-fluid">
                                <main style={{ padding: '20px' }}>
                                    <Outlet />
                                </main>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default AdminLayout;
