import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

function MainLayout() {
    return (
        <div className="">
            <NavBar />
            <main className="flex-1 bg-zinc-900 text-white h-full">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;