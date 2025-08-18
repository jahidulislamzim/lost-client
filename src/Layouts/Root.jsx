import Navbar from '../Components/Navbar.jsx';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer.jsx';

const Root = () => {
    return (
        <div className="bg-purple-200 dark:bg-gray-800 min-h-screen w-full">
            <nav className="sticky top-0 z-50">
                <Navbar />
            </nav>

            <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>

            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    );
};

export default Root;