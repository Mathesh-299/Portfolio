import {
    Github,
    Handshake,
    Linkedin,
    Link as LucideLink,
    Mail,
    Phone,
    Terminal,
} from 'lucide-react';
import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/api';
// import toast from 'react-hot-toast';

const Contact = () => {
    const [animate, setAnimate] = useState(false);
    const [formData, setFormData] = useState({ Name: '', Email: '', Message: '' });

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const textAnimation = `transition-all duration-1000 ease-in ${animate ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`;

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { Name, Email, Message } = formData;

        if (!Name || !Email || !Message) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const response = await API.post('/query/addQueries', formData);
            setFormData({ Name: '', Email: '', Message: '' });
            toast.success('Query Successfully Added');
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <>
            <main className="min-h-screen bg-black/90 px-6 py-12 text-white flex flex-col items-center">
                <Handshake size={36} className="text-green-400 mb-2" />
                <h1 className={`text-4xl font-bold mb-4 ${textAnimation}`}>Contact Me</h1>
                <p className={`mb-10 text-gray-400 max-w-2xl text-center md:text-justify text-lg ${textAnimation}`}>
                    Feel free to reach out if you'd like to collaborate on a project, discuss ideas, or just have a chat!
                </p>

                <section className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full max-w-6xl ${textAnimation}`}>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <Mail className="text-green-400 mr-2" />
                            <h2 className="text-xl font-semibold">Email</h2>
                        </div>
                        <p className="text-gray-300 break-all">postbox2992005@example.com</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <Phone className="text-green-400 mr-2" />
                            <h2 className="text-xl font-semibold">Phone</h2>
                        </div>
                        <p className="text-gray-300">+91 7309294524</p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <Linkedin className="text-green-400 mr-2" />
                            <h2 className="text-xl font-semibold">LinkedIn</h2>
                        </div>
                        <a
                            href="https://www.linkedin.com/in/matheshm29/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:underline"
                        >
                            linkedin.com/in/matheshm29
                        </a>
                    </div>
                </section>

                <section className={`w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg ${textAnimation}`}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Send a Message</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="Name"
                            value={formData.Name}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            name="Email"
                            value={formData.Email}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <textarea
                            rows="5"
                            placeholder="Your Message"
                            name="Message"
                            value={formData.Message}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="submit"
                            className="bg-green-400 w-32 self-center text-black font-semibold py-3 rounded hover:bg-green-500 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </section>
            </main>

            <footer className="bg-black/80 text-gray-400 border-t">
                <div className="flex justify-center gap-6 py-4">
                    <a href="https://github.com/Mathesh-299" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <Github className="hover:text-purple-500" />
                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <LucideLink className="hover:text-purple-500" />
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target="_blank" rel="noopener noreferrer" title="Leetcode">
                        <Terminal className="hover:text-purple-500" />
                    </a>
                </div>
                <div className="text-center text-sm py-2 border-t border-gray-600">
                    <p>© 2025 Mathesh. All rights reserved.</p>
                    <p>Made with ❤️ in React & Tailwind CSS</p>
                </div>
            </footer>
        </>
    );
};

export default Contact;