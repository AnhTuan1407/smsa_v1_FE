import ScheduleCreate from '../../layouts/admin/schedule/ScheduleCreate';
import ScheduleView from '../../layouts/admin/schedule/ScheduleView';

const scheduleRoutes = [
    {
        path: 'schedule/create',
        element: <ScheduleCreate />,
    },
    {
        path: 'schedule/view',
        element: <ScheduleView />,
    },
];

export default scheduleRoutes;
