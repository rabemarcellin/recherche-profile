import { BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import routes from "./route.path";
import Signup from "../pages/guest/Signup";
import Login from "../pages/guest/Login";
import ProtectedRoute from "../pages/private/ProtectedRoute";
import Dashboard from "../pages/private/Dashboard";
import Subscription from "../pages/private/Subscription";
import Root from "../pages/Root";
import GuestRoute from "../pages/guest/GuestRoute";
import Search from "../pages/private/Search";
import WorkerProfile, { userWorkerLoader } from "../pages/private/WorkerProfile";

const router = createBrowserRouter(routes)

const routeObjectApproach = () => <RouterProvider router={router} />

export default () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route element={<Root />}>
                <Route element={<GuestRoute />}>
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/subscriptions" element={<Subscription />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile/:id" element={<WorkerProfile />} loader={userWorkerLoader}/>
                </Route>
            </Route>
            </Routes>
        </BrowserRouter>
    )
}

