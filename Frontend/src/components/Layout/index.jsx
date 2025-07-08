import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Navbar from '../Navbar';

const Layout = () => {
    return (
        <>
            <div className="wrapper">
                <Header>
                    <Navbar />
                </Header>
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;