import StaffList from "../../layouts/admin/staff/StaffList";
import StaffCreate from "../../layouts/admin/staff/StaffCreate";
import StaffEdit from "../../layouts/admin/staff/StaffEdit";
import StaffDetail from "../../layouts/admin/staff/StaffDetail";

const staffRoutes = [

    {
        path: "staff/list",
        element: <StaffList />
    },
    {
        path: "staff/create",
        element: <StaffCreate />
    },
    {
        path: "staff/edit/:id",
        element: <StaffEdit />
    },
    {
        path: "staff/detail/:di",
        element: <StaffDetail />
    },

];

export default staffRoutes;