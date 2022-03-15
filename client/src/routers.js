import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'
import OverviewPage from './pages/OverviewPage'
import TypePage from './pages/TypePage'
import CreateOverview from './components/CreateOverview'
import UserPage from './pages/UserPage'

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
        path: '/user',
        Comment: UserPage
    },
    {
        path: '/overveiw' + '/:id',
        Component: OverviewPage
    },
    {
        path: '/type',
        Component: TypePage
    },
    {
        path: '/create-overview',
        Component: CreateOverview

    },

]
