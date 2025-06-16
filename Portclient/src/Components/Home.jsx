import { useEffect, useState } from "react";
import Image from '../assets/img/Me.jpg';

const Home = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <>
            <div className="bg-black/90 flex flex-col md:flex-row min-h-screen px-6 md:px-12 py-10 md:py-20 text-white">

                {/* ✅ Image on Top in Mobile, Right in Desktop */}
                <div
                    className={`
                        w-full md:w-[35%] flex justify-center items-center mt-10 md:mt-0
                        transition-all ease-out duration-700
                        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
                        order-1 md:order-2
                    `}
                >
                    <img
                        src={Image}
                        alt="Profile"
                        className="w-40 h-40 md:w-64 md:h-64 rounded-full border-2 border-red-400 p-2 object-cover"
                    />
                </div>

                {/* ✅ Text Below Image in Mobile, Left in Desktop */}
                <div
                    className={`
                        flex flex-col justify-center
                        w-full md:w-[65%]
                        transition-all ease-in duration-700
                        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
                        order-2 md:order-1
                        text-justify
                    `}
                >
                    <h2 className="font-bold text-lg md:text-xl text-gray-400 mb-2">
                        Hello Everyone 👋, My Name is
                    </h2>
                    <h1 className="font-extrabold font-serif text-2xl md:text-4xl text-purple-500 mb-4">
                        MATHESH M !!!
                    </h1>

                    <p className="mb-4 text-sm md:text-base ">
                        Passionate and detail-oriented developer with a strong foundation in the
                        <span className="text-purple-500"> MERN stack.</span> I specialize in building dynamic, responsive web applications with
                        <span className="text-purple-500"> clean UI/UX</span>. Always eager to learn, adapt, and deliver top-level solutions.
                    </p>
                    <p className="mb-6 text-sm md:text-base">
                        I specialize in building <span className="text-purple-500">robust backends, sleek frontend,</span>
                        and am currently pursuing my Bachelor of Technology in Information Technology.
                    </p>

                    <div className="flex flex-wrap gap-4 text-purple-500 text-sm md:text-lg">
                        <a href="https://github.com/Mathesh-299" target="_blank" className="py-1 px-2 rounded hover:underline">.GitHub</a>
                        <a href="https://leetcode.com/u/matheshm29/" target="_blank" className="py-1 px-2 rounded hover:underline">.Leetcode</a>
                        <a href="https://www.linkedin.com/in/matheshm29/" target="_blank" className="py-1 px-2 rounded hover:underline">.LinkedIn</a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/80 text-gray-500 border-t-2 text-center py-4 text-sm">
                <p>© 2025 Mathesh. All rights reserved.</p>
                <p>Made with ❤️ in React & Tailwind CSS</p>
            </footer>
        </>
    );
};

export default Home;
