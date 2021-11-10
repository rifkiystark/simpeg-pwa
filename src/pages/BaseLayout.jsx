
import { Outlet, useLocation } from 'react-router';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';

function BaseLayout() {
    const location = useLocation()
    console.log(location)
    return (

        <body className="antialiased" style={{ minHeight: "100vh" }}>
            <div className="wrapper">
                <Header />
                <Navbar />
                <Outlet />
            </div>
        </body>
    )
}

export default BaseLayout