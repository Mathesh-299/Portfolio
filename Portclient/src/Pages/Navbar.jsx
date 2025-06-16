import { Menu, ScanFace, User2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("user");

    // Sync localStorage values into React state
    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn") === "true";
        const userRole = localStorage.getItem("role") || "user";

        setIsLoggedIn(loginStatus);
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem('role', "user");
        setIsLoggedIn(false);
        setRole("user");
        window.location.reload();
        location('/');
    };

    const routes = ['/', '/about', '/adminProject', '/contact'];
    const labels = ['01.Home', '02.About Me', '03.Project', '04.Contact'];

    return (
        <div className="bg-black/90 text-white w-full z-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {isLoggedIn && role === 'admin' ? (
                        <Link to="/query" className="flex items-center">
                            <h1 className="text-xl font-serif border-b-2 border-r-2 border-b-gray-400 border-r-gray-400 px-3 py-1 rounded-b-lg rounded-r-md font-extrabold">
                                MATHESH M
                            </h1>
                        </Link>
                    ) : (
                        <h1 className="text-xl font-serif border-b-2 border-r-2 border-b-gray-400 border-r-gray-400 px-3 py-1 rounded-b-lg rounded-r-md font-extrabold">
                            MATHESH M
                        </h1>
                    )}

                    <div className="hidden md:flex gap-4 items-center font-mono">
                        {routes.map((path, i) => (
                            <Link to={path} key={path}>
                                <button
                                    className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 ${location.pathname === path
                                        ? 'border-b-2 border-green-400 text-green-400 bg-gray-700'
                                        : ''
                                        }`}
                                >
                                    {labels[i]}
                                </button>
                            </Link>
                        ))}
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:border-2 hover:bg-red-700 hover:text-white hover:border-white py-2 px-2 rounded-xl">
                                <User2 />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <Link to="/login">
                                <div className="flex items-center gap-2 hover:border-2 py-2 px-2 hover:text-white hover:bg-green-500 rounded-xl">
                                    <ScanFace />
                                    <span>Login</span>
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(true)}>
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center">
                    <div className="bg-black/80 backdrop-blur-md border border-green-500 rounded-xl w-72 p-6 relative shadow-2xl text-white transform scale-95 opacity-0 transition duration-300 ease-in animate-[fadeIn_0.3s_ease-in_forwards]">
                        <h2 className="text-md font-bold text-gray-200 mb-4 font-mono border-b pb-2 border-gray-700">
                            Quick Links
                        </h2>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
                        >
                            <X size={20} />
                        </button>
                        <div className="space-y-3 text-sm font-mono">
                            {routes.map((path, i) => (
                                <Link
                                    to={path}
                                    key={path}
                                    onClick={() => setMenuOpen(false)}
                                    className={`block px-2 py-1 rounded-md hover:text-green-400 transition ${location.pathname === path ? 'text-green-400' : ''
                                        }`}
                                >
                                    {labels[i]}
                                </Link>
                            ))}
                            {isLoggedIn ? (
                                <button className="text-red-500 flex items-center gap-2" onClick={handleLogout}>
                                    <User2 />
                                    Log Out
                                </button>
                            ) : (
                                <Link to="/login" onClick={() => setMenuOpen(false)}>
                                    <div className="flex items-center gap-2 text-white hover:text-green-400">
                                        <ScanFace />
                                        <span>Login</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
