import HomePage from '../layouts/site/HomePage';
import SubCategoryDetail from '../layouts/site/SubCategoryDetail';
import ServiceDetail from '../layouts/site/ServiceDetail';

const siteRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/client/subCategory/detail/:id',
        element: <SubCategoryDetail />,
    },
    {
        path: '/client/service/detail',
        element: <ServiceDetail />,
    },
];

export default siteRoutes;
