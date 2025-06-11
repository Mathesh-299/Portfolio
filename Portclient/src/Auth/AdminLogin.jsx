import { ShieldX, X } from 'lucide-react';
import { useEffect } from 'react';

const AdminLogin = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => window.history.back()}
                >
                    <X size={24} />
                </button>
                <div className="flex items-center justify-center mb-4">
                    <ShieldX className="text-green-400 mr-2" size={28} />
                    <h1 className="text-3xl font-bold text-white">Admin Login</h1>
                </div>
                <p className="text-center text-gray-400 mb-6">
                    Please enter your credentials to access the admin dashboard and manage site content securely.
                </p>
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-400 text-black font-semibold py-2 rounded hover:bg-green-500 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
