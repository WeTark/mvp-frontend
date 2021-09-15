import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import { getLocalStorage } from './action/LocalStorageActions';
import { EventDetail } from './pages/EventDetail';
import { PersonalEvent } from './pages/PersonalEvent';

// ----------------------------------------------------------------------

export default function Router() {
  const token = getLocalStorage('accessToken', 0);

  return useRoutes([
    {
      path: '/trade',
      element: token ? <DashboardLayout/> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <Navigate to="/trade/event" replace /> },
        { path: 'event', element: <DashboardApp />},
        { path: 'personal-event', element: <PersonalEvent />},
        { path: 'event/:id', element: <EventDetail/>},
        { path: 'user', element: <User /> },
        { path: 'portfolio', element: <Products /> },
        { path: 'watchlist', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/trade" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
