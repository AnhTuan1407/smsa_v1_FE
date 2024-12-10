import CustomerList from '../../layouts/admin/customer/CustomerList';
import CustomerEdit from '../../layouts/admin/customer/CustomerEdit';
import CustomerDetail from '../../layouts/admin/customer/CustomerDetail';

const customerRoutes = [
    {
        path: 'customers/list',
        element: <CustomerList />,
    },
    {
        path: 'customers/edit/:id',
        element: <CustomerEdit />,
    },
    {
        path: 'customers/detail/:id',
        element: <CustomerDetail />,
    },
];

export default customerRoutes;
