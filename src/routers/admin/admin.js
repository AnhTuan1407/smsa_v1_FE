import Dashboard from '../../layouts/admin/Dashboard';
import serviceRoutes from './service';
import categoryRoutes from './category';
import customerRoutes from './customer';
import staffRoutes from './staff';
import subCategoryRoutes from './subCategory';
import NotFound404 from '../../components/NotFound404';

const adminRoutes = [
    ...serviceRoutes,
    ...categoryRoutes,
    ...customerRoutes,
    ...staffRoutes,
    ...subCategoryRoutes,
    
    {
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        path: '*', // Catch-all route for invalid admin paths
        element: <NotFound404 />,
    },
];

export default adminRoutes;
