import { createBrowserRouter } from 'react-router';
import Home from '../Pages/Home.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';
import Root from '../Layouts/Root.jsx';
import NotFound from '../Components/NotFound.jsx';
import LostAndFound from '../Pages/LostAndFound.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AddItem from '../Pages/AddItem.jsx';
import MyItems from '../Pages/MyItems.jsx';
import DetailsItem from '../Pages/DetailsItem.jsx';
import RecoveryItems from '../Pages/RecoveryItems.jsx';
import UpdateItems from '../Pages/UpdateItems.jsx';
import About from '../Pages/About.jsx';
import Contact from '../Pages/Contact.jsx';
import Blogs from '../Pages/Blogs.jsx';


export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/allItems',
                Component: LostAndFound,
            },
            {
                path: '/about',
                Component: About,
            },
            {
                path: '/contact',
                Component: Contact,
            },
            {
                path: '/blogs',
                Component: Blogs,
            },
            {
                path: '/addItems',
                element: <PrivateRoute><AddItem /></PrivateRoute>
            },
            {
                path: '/myItems',
                element: <PrivateRoute><MyItems /></PrivateRoute>
            },
            {
                path: '/items/:id',
                element: <PrivateRoute><DetailsItem /></PrivateRoute>
            },
            {
                path: '/updateItems/:id',
                element: <PrivateRoute><UpdateItems /></PrivateRoute>
            },
            {
                path: '/allRecovered',
                element: <PrivateRoute><RecoveryItems/></PrivateRoute>
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
        ],
    },
    {
        path: '/*',
        Component: NotFound,
    },
]);