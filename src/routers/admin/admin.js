import serviceRoutes from './service';
import Dashboard from '../../layouts/admin/Dashboard';

const adminRoutes = [
    ...serviceRoutes,
    {
        path: 'dashboard',
        element: <Dashboard />,
    },

];

export default adminRoutes;
