import ServiceList from '../../layouts/admin/service/ServiceList';
import ServiceCreate from '../../layouts/admin/service/ServiceCreate';

const serviceRoutes = [
    {
        path: 'services/list',
        element: <ServiceList />,
    },
    {
        path: 'services/create',
        element: <ServiceCreate />,
    },
];

export default serviceRoutes;
