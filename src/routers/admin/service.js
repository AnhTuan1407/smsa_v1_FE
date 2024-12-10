import ServiceList from '../../layouts/admin/service/ServiceList';
import ServiceCreate from '../../layouts/admin/service/ServiceCreate';
import ServiceEdit from '../../layouts/admin/service/ServiceEdit';
import ServiceDetail from '../../layouts/admin/service/ServiceDetail';

const serviceRoutes = [
    {
        path: 'services/list',
        element: <ServiceList />,
    },
    {
        path: 'services/create',
        element: <ServiceCreate />,
    },
    {
        path: 'services/edit/:id',
        element: <ServiceEdit />,
    },
    {
        path: 'services/detail/:id',
        element: <ServiceDetail />,
    },
];

export default serviceRoutes;
