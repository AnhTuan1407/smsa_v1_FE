import StaffHomePage from '../../layouts/staff/StaffHomePage';
import Profile from '../../layouts/staff/Profile';
import Schedule from '../../layouts/staff/Schedule';
import History from '../../layouts/staff/History';
import Review from '../../layouts/staff/Review';
import Notification from '../../layouts/staff/Notification';
import Message from '../../layouts/staff/Message';

const staffRoutes = [
    {
        path: '',
        element: <StaffHomePage />,
    },
    {
        path: 'profile',
        element: <Profile />,
    },
    {
        path: 'schedule',
        element: <Schedule />,
    },
    {
        path: 'history',
        element: <History />,
    },
    {
        path: 'reviews',
        element: <Review />,
    },
    {
        path: 'notifications',
        element: <Notification />,
    },
    {
        path: 'messages',
        element: <Message />,
    },
];

export default staffRoutes;
