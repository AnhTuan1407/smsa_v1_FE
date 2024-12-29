import bookingRoutes from './booking';
import profileRoutes from './profile';
import appointmentRoutes from './appointment';

const clientRoutes = [
    ...bookingRoutes,
    ...profileRoutes,
    ...appointmentRoutes,
];

export default clientRoutes;