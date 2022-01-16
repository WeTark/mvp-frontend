import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trade from "./pages/Trade";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import NotFound from "./pages/Page404";
import { getLocalStorage } from "./action/LocalStorageActions";
import { EventDetail } from "./pages/EventDetail";
import { PersonalEvent } from "./pages/PersonalEvent";
import { Sharedwithme } from "./pages/Sharedwithme";

// ----------------------------------------------------------------------

export default function Router() {
  const token = getLocalStorage("accessToken", 0);

  return useRoutes([
    {
      path: "/trade",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Navigate to="/trade/event" replace /> },
        { path: "event", element: <Trade /> },
        { path: "personal-event", element: <PersonalEvent /> },
        { path: "sharedwithme", element: <Sharedwithme /> },
        { path: "event/:id", element: <EventDetail /> },
        { path: "user", element: <Profile /> },
        { path: "portfolio", element: <Portfolio /> },
        { path: "watchlist", element: <Watchlist /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/trade" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
