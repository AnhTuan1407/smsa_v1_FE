import CategoryList from '../../layouts/admin/category/CategoryList';
import CategoryCreate from '../../layouts/admin/category/CategoryCreate';

const categoryRoutes = [
    {
        path: 'category/list',
        element: <CategoryList />,
    },
    {
        path: 'category/create',
        element: <CategoryCreate />,
    },
];

export default categoryRoutes;
