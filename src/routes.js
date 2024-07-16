import {
    ROOMS_ROUTE,
    ROOM_ROUTE,
    SETTINGS_ROUTE,
    USER_ROUTE,
    CATEGORIES_ROUTE,
    AUTH_ROUTE
} from "./utils/consts";
import {
    UserPage
} from './pages/UserPage/UserPage.jsx';
import {
    CategoriesPage
} from './pages/CategoriesPage/CategoriesPage.jsx';
import {
    RoomPage
} from "./pages/RoomPage/RoomPage.jsx";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage.jsx";
import { RoomsPage } from './pages/RoomsPage/RoomsPage.jsx';
import { HelloPage } from "./pages/HelloPage.jsx";
import { AuthPage } from "./pages/AuthPage/AuthPage.jsx";

export const publick_routes = [{
        path: USER_ROUTE,
        Component: UserPage
    },
    {
        path: '/',
        Component: HelloPage
    },
    {
        path: CATEGORIES_ROUTE,
        Component: CategoriesPage
    },
    {
        path: CATEGORIES_ROUTE + '/:id' + ROOMS_ROUTE,
        Component: RoomsPage
    },
    {
        path: CATEGORIES_ROUTE + '/:id' + ROOM_ROUTE + '/:roomId',
        Component: RoomPage
    },
    {
        path: SETTINGS_ROUTE,
        Component: SettingsPage
    },
    {
        path: AUTH_ROUTE,
        Component: AuthPage
    },
    {
        path: USER_ROUTE + ':id',
        Component: UserPage
    }
]