import SubCategoryList from '../../layouts/admin/subcategory/SubCategoryList';
import SubCategoryCreate from '../../layouts/admin/subcategory/SubCategoryCreate';
import SubCategoryEdit from '../../layouts/admin/subcategory/SubCategoryEdit';

const subCategoryRoutes = [
    {
        path: 'subCategory/list',
        element: <SubCategoryList />,
    },
    {
        path: 'subCategory/create',
        element: <SubCategoryCreate />,
    },
    {
        path: 'subCategory/edit/:id',
        element: <SubCategoryEdit />,
    },
];

export default subCategoryRoutes;
