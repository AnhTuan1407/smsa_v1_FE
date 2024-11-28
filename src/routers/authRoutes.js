import Login from '../layouts/auth/Login';
import Register from '../layouts/auth/Register';
import PublicRoute from './guard/PublicRoute';
const authRoutes = [
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: '/register',
        element: (
            // <PublicRoute>
                <Register />
            // </PublicRoute>
        ),
    },
];

export default authRoutes;
