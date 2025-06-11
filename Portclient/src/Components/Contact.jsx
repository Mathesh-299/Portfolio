import { Github, Handshake, Link, Linkedin, Mail, Phone, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
const Contact = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const textAnimation = `transition-all duration-1000 ease-in ${animate ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`;

    return (
        <>
            <div className="min-h-screen bg-black/90 px-6 py-12 text-white flex flex-col items-center">
                {/* <img src={Profile} alt='Contact' className='w-32'/> */}
                <Handshake/>
                <h1
                    className={`text-4xl font-bold mb-4 ${textAnimation}`}
                >
                    Contact Me
                </h1>
                <p
                    className={`mb-10 text-gray-400 max-w-xl text-justify ${textAnimation} text-lg`}
                >
                    Feel free to reach out if you'd like to collaborate on a project, discuss ideas, or just have a chat!
                </p>

                <div className={`flex flex-col md:flex-row gap-6 mb-12 ${textAnimation}`}>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-72">
                        <div className="flex items-center mb-4">
                            <Mail className="text-green-400 mr-2" />
                            <h2 className="text-xl font-semibold">Email</h2>
                        </div>
                        <p className="text-gray-300">postbox2992005@example.com</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-72">
                        <div className="flex items-center mb-4">
                            <Phone className="text-green-400 mr-2" />
                            <h2 className="text-xl font-semibold">Phone</h2>
                        </div>
                        <p className="text-gray-300">+91 7309294524</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-72">
                        <div className="flex items-center mb-4">
                            <Linkedin className="text-green-400 mr-2" />
                            <h2 className="text-xl font-semibold">LinkedIn</h2>
                        </div>
                        <p>
                            <a
                                href="https://www.linkedin.com/in/matheshm29/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline"
                            >
                                Linkedin.com
                            </a>
                        </p>
                    </div>
                </div>

                <div className={`w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg ${textAnimation}`}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Send a Message</h2>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <textarea
                            rows="5"
                            placeholder="Your Message"
                            className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-green-400 w-32 text-black font-semibold py-3 rounded hover:bg-green-500 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <footer>
                <div className="flex flex-row bg-black/80 justify-center items-center py-3 gap-6">
                    <a
                        href="https://github.com/Mathesh-299"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <abbr title="Github">
                            <Github className="text-gray-300 hover:text-purple-500" />
                        </abbr>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/matheshm29/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <abbr title="Linked In">
                            <Link className="text-gray-300 hover:text-purple-500" />
                        </abbr>
                    </a>
                    <a
                        href="https://leetcode.com/u/matheshm29/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <abbr title="Leetcode">
                            <Terminal className="text-gray-300 hover:text-purple-500" />
                        </abbr>
                    </a>
                </div>
                <div className="flex flex-col justify-center items-center py-2 text-gray-500 bg-black/80 text-md border-t-2 w-full">
                    <p className="py-1">© 2025 Mathesh. All rights reserved.</p>
                    <p>Made with ❤️ in React & Tailwind CSS</p>
                </div>
            </footer>
        </>
    );
};

export default Contact;
