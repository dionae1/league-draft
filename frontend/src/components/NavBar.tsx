import { Link } from "react-router";

function NavBar() {
    return (
        <nav className="min-w-full bg-zinc-950 border-r-2 border-zinc-950/10 text-white p-4 text-2xl font-semibold shadow-lg fixed top-0 left-0 z-10">
            <ul className="flex flex-row gap-12 items-center justify-center mt-2">
                <li className="p-2 text-2xl rounded-md w-32 text-center hover:bg-white hover:text-black transition">
                    <Link to="/">Home</Link>
                </li>
                <li className="p-2 text-2xl rounded-md w-32 text-center hover:bg-white hover:text-black transition">
                    <Link to="/classic">Classic</Link>
                </li>
                <li className="p-2 text-2xl rounded-md w-32 text-center hover:bg-white hover:text-black transition">
                    <Link to="/fearless">Fearless</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;  