import Login from '../Pages/Login/Login';
import User from '../Pages/User/User';


const indexRoutes = [
    {
        path: '/login',
        main: <Login />
    },
    {
        path: '/user',
        main: <User />
    }
]


export default indexRoutes;