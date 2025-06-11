import { Download, Github, Link, Terminal } from 'lucide-react';
import { useEffect, useState } from "react";

const About = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const textAnimation = `transition-transform duration-1000 ease-out ${animate ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        }`;

    const handleResumeDownload = () => {
        const link = document.createElement('a');
        link.href = '/Mathesh M-Resume.pdf';
        link.download = 'Mathesh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="min-h-screen bg-black/90 px-3 py-6 flex flex-col pl-20 justify-center">
                <div className="w-[90vw] text-justify">
                    <h2 className={`text-xl md:text-3xl font-extrabold text-white text-start mb-6 ${textAnimation}`}>
                        About Me
                    </h2>
                    <p className={`text-lg md:text-xl text-white leading-relaxed w-full ${textAnimation}`}>
                        I’m <span className="text-purple-600 font-semibold">Mathesh M</span>, a highly motivated and detail-oriented
                        <span className="text-blue-500 font-semibold"> MERN Stack Developer</span> with hands-on experience in building full-stack web applications using
                        <span className="text-green-500 font-semibold"> MongoDB, Express.js, React.js, and Node.js</span>. I have a strong passion for coding and transforming complex problems into user-friendly digital solutions.
                    </p>
                    <p className={`text-lg md:text-xl text-white mt-4 leading-relaxed ${textAnimation}`}>
                        I’m currently seeking a full-time opportunity where I can contribute to real-world projects, grow as a developer, and work collaboratively with dynamic teams. My approach is clean, scalable, and efficient coding, combined with a continuous learning mindset to stay current with modern web technologies.
                    </p>
                </div>

                <div className={`max-w-4xl mt-12 w-full ${textAnimation}`}>
                    <h3 className="text-3xl font-bold text-start text-white mb-6">
                        My Skills
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
                        {[
                            "HTML5",
                            "CSS3",
                            "JavaScript",
                            "React.js",
                            "Node.js",
                            "Express.js",
                            "MongoDB",
                            "Tailwind CSS",
                            "Git & GitHub",
                            "REST APIs",
                            "JSON"
                        ].map((skill, index) => (
                            <div
                                key={index}
                                className="shadow-md rounded-xl py-4 px-2 text-purple-600 font-semibold hover:bg-gray-200 transition duration-300"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleResumeDownload}
                    type="button"
                    className="flex flex-row px-3 py-2 font-bold gap-2 text-xl text-white border-4 w-[16rem] mt-7 rounded-2xl border-purple-500 justify-center items-center hover:border-white hover:bg-purple-500 hover:text-black"
                >
                    <p>Download resume</p>
                    <Download />
                </button>
            </div>

            <footer>
                <div className='flex flex-row bg-black/80 justify-center items-center py-3 gap-6'>
                    <a href="https://github.com/Mathesh-299" target='_blank' rel="noopener noreferrer">
                        <abbr title='Github'>
                            <Github className='text-gray-300 hover:text-purple-500' />
                        </abbr>
                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target='_blank' rel="noopener noreferrer">
                        <abbr title='LinkedIn'>
                            <Link className="text-gray-300 hover:text-purple-500" />
                        </abbr>
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target='_blank' rel="noopener noreferrer">
                        <abbr title='Leetcode'>
                            <Terminal className='text-gray-300 hover:text-purple-500' />
                        </abbr>
                    </a>
                </div>
                <div className="flex flex-col justify-center items-center py-2 text-gray-500 bg-black/80 text-md border-t-2 w-full">
                    <p className="py-1">
                        © 2025 Mathesh. All rights reserved.
                    </p>
                    <p>
                        Made with ❤️ in React & Tailwind CSS
                    </p>
                </div>
            </footer>
        </>
    );
};

export default About;
