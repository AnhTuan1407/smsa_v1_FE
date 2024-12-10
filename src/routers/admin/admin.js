import Dashboard from '../../layouts/admin/Dashboard';
import serviceRoutes from './service';
import categoryRoutes from './category';
import customerRoutes from './customer';
import staffRoutes from './staff';

const adminRoutes = [
    ...serviceRoutes,
    ...categoryRoutes,
    ...customerRoutes,
    ...staffRoutes,
    {
        path: 'dashboard',
        element: <Dashboard />,
    },

];

export default adminRoutes;
