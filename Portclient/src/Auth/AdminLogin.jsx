import { Eye, EyeOff, LockKeyhole, ShieldX, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/api';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email.trim() || !password.trim()) {
            toast.error("Please fill in all the fields");
            return;
        }

        try {
            const response = await API.post("/auth/adminLogin", formData);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("Admin", JSON.stringify(response.data));
                localStorage.setItem("role", response.data?.role);
                toast.success("Successfully Logged In");
                setFormData({ email: "", password: "" });
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };

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
                <form
                    className="flex flex-col gap-6 p-6 bg-gray-900 rounded-xl shadow-xl border border-gray-700 transition-all duration-300"
                    onSubmit={handleSubmit}
                >
                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm text-gray-300 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            required
                            className="w-full px-4 py-2 text-sm rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm text-gray-300 font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-2 text-sm rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10 transition duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!formData.email || !formData.password}
                    >
                        <LockKeyhole />
                        Login
                    </button>

                    {/* Optional: Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mt-2">
                            {error}
                        </p>
                    )}
                </form>

            </div>
        </div>
    );
};

export default AdminLogin;
