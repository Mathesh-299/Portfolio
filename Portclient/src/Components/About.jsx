import { Download, Eye, Github, Link, Terminal } from 'lucide-react';
import { useEffect, useState } from "react";

const About = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const textAnimation = `transition-all duration-1000 ease-out ${animate ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`;

    const handleResumeDownload = () => {
        const link = document.createElement('a');
        link.href = '/Mathesh_M_Resume.pdf';
        link.download = 'Mathesh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <main className="min-h-screen bg-black/90 px-4 py-12 flex flex-col justify-center items-center">
                <section className="max-w-5xl w-full text-white">
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-start mb-6 ${textAnimation}`}>About Me</h2>
                    <p className={`text-lg md:text-xl text-justify leading-relaxed ${textAnimation}`}>
                        I’m <span className="text-purple-600 font-semibold">Mathesh M</span>, a highly motivated and detail-oriented <span className="text-blue-500 font-semibold">MERN Stack Developer</span> with hands-on experience in building full-stack web applications using <span className="text-green-500 font-semibold">MongoDB, Express.js, React.js, and Node.js</span>. I love transforming complex problems into simple, beautiful, and intuitive designs.
                    </p>

                    <p className={`text-lg md:text-xl text-justify mt-4 leading-relaxed ${textAnimation}`}>
                        I’m currently seeking a full-time opportunity where I can contribute to impactful projects, grow as a developer, and collaborate with talented teams. My goal is to write clean, scalable code and keep learning new technologies to build efficient systems.
                    </p>
                </section>

                <section className={`max-w-5xl w-full mt-12 ${textAnimation}`}>
                    <h3 className="text-3xl font-bold text-white mb-6 text-start">My Skills</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "Java", "Tailwind CSS", "Git & GitHub", "REST APIs", "JSON", "MySQL", "JWT Authentication"].map((skill, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 text-purple-400 font-semibold rounded-xl p-3 text-center transition transform hover:scale-105 hover:bg-purple-100 hover:text-black shadow-md"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-4 mt-10 items-center">
                    <button
                        onClick={handleResumeDownload}
                        type="button"
                        className="flex flex-row px-6 py-3 font-bold gap-2 text-lg text-white border-4 rounded-2xl border-purple-500 justify-center items-center hover:border-purple-500 hover:bg-white hover:text-black transition transform hover:scale-105"
                    >
                        <span>Download Resume</span>
                        <Download />
                    </button>

                    <a
                        href="/Mathesh_M_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="italic text-xl flex flex-row gap-2 justify-center items-center  font-bold hover:text-purple-600 text-white transition hover:scale-105 border-4 px-5 py-3 border-purple-600 rounded-2xl hover:border-purple-500 hover:bg-white"
                    >
                        <Eye />
                        View Resume
                    </a>
                </div>
            </main>

            <footer>
                <div className='flex flex-row bg-black/80 justify-center items-center py-4 gap-6'>
                    <a href="https://github.com/Mathesh-299" target='_blank' rel="noopener noreferrer">
                        <abbr title='Github'>
                            <Github className='text-gray-300 hover:text-purple-500 transition-transform hover:scale-125' />
                        </abbr>
                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target='_blank' rel="noopener noreferrer">
                        <abbr title='LinkedIn'>
                            <Link className="text-gray-300 hover:text-purple-500 transition-transform hover:scale-125" />
                        </abbr>
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target='_blank' rel="noopener noreferrer">
                        <abbr title='Leetcode'>
                            <Terminal className='text-gray-300 hover:text-purple-500 transition-transform hover:scale-125' />
                        </abbr>
                    </a>
                </div>
                <div className="flex flex-col justify-center items-center py-3 text-gray-500 bg-black/80 text-center text-sm border-t-2 w-full">
                    <p>© 2025 Mathesh. All rights reserved.</p>
                    <p>Made with ❤️ in React & Tailwind CSS</p>
                </div>
            </footer>
        </>
    );
};

export default About;
