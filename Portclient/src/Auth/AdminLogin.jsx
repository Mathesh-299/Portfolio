import { Eye, LockKeyhole, LucideEyeClosed, ShieldX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminLogin = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const formRef = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email.length === 0 || formData.password.length === 0) {
            toast.error("Please all the fields");
        }
        else {
            toast.success("Successfully LoggedIn");
            console.log(formData)
            formRef.current.reset();
            setFormData({ email: "", password: "" })
        }

    }
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
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} ref={formRef}>
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
                            value={formData.email}
                            name="email"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    [e.target.name]: e.target.value
                                })
                            }
                        // required
                        />

                    </div>
                    <label className="block text-gray-300">Password</label>
                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400"
                        >
                            {showPassword ? <Eye /> : <LucideEyeClosed />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-400 text-black py-2 rounded text-xl font-bold transition-colors flex justify-center items-center gap-4 border-2 border-black hover:border-2 hover:border-green-500 hover:bg-black/70 hover:text-green-500"
                    >
                        <LockKeyhole />
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
