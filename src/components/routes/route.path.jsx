import Login from "../pages/guest/Login";
import Signup from "../pages/guest/Signup";
import Dashboard from "../pages/private/Dashboard";
import Subscription from "../pages/private/Subscription";
import Root from "../pages/Root";

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'subscriptions',
                element: <Subscription />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'sign-up',
                element: <Signup />
            }
        ]
    }
]
export default routes