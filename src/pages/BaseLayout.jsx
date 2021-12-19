
import { Outlet, useLocation } from 'react-router';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';

function BaseLayout() {
    const location = useLocation()
    console.log(location)
    return (


        <div className="wrapper">
            <Header />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default BaseLayout