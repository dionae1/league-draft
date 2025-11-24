import { Link } from "react-router";

function Home() {
    return (
        <div className="bg-zinc-950 text-white min-h-screen flex flex-col items-center pt-10">
            <h1 className="text-5xl text-center pt-20 mb-4">Welcome to Draft iT</h1>
            <p className="text-xl text-center">Your one-stop solution for all your drafting needs.</p>

            <p className="text-2xl text-center mt-10 max-w-3xl px-4">
                Create the best draft you can and get real-time feedback based on updated professional tournaments data.
            </p>

            <p className="text-lg text-center mt-30 mb-6">Choose your drafting style:</p>
            <div className="flex flex-row items-center gap-6">
                <Link to="/classic"
                    className="text-2xl border-2 border-white p-4 rounded-md w-56 text-center
                    hover:bg-white hover:text-zinc-950 transition"
                >
                    Classic Draft
                </Link>
                <Link to="/fearless"
                    className="text-2xl border-2 border-white p-4 rounded-md w-56 text-center
                    hover:bg-white hover:text-zinc-950 transition"
                >
                    Fearless Draft
                </Link>
            </div>
        </div>
    );
}

export default Home;
