import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'
import OverviewPage from './pages/OverviewPage'
import CreateOverview from './pages/CreatePage'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'

export const routers = [
    {
        path: '/registration',
        Component: AuthPage
    },
    {
        path: '/login',
        Component: AuthPage
    },
    {
        path: '/',
        Component: MainPage
    },
    {
        path: '/user/:id',
        Component: UserPage
    },
    {
        path: '/overveiw' + '/:id',
        Component: OverviewPage
    },
    
    {
        path: '/create-overview',
        Component: CreateOverview

    },

    {
        path: '/user/ADMIN',
        Component: AdminPage
    }

]
