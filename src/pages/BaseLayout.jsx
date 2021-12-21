
import { Outlet } from 'react-router';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';

function BaseLayout() {
    return (


        <div className="wrapper">
            <Header />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default BaseLayout