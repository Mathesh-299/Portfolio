import { useEffect, useState } from "react";
import Image from '../assets/img/Me.jpg';

const Home = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <>
            <div className="bg-black/90 flex flex-row">
                <div
                    className={`
            min-h-[calc(100vh-5rem)]
            flex
            w-[65%]
            text-white
            px-32
            py-40
            flex-col
            transition-all
            ease-in
            duration-900
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
            `}
                >
                    <h2 className="font-bold text-xl text-gray-400 py-2 px-2">
                        Hello Everyone 👋, My Name is
                    </h2>
                    <h1 className="font-extrabold font-serif py-5 text-2xl text-purple-500">
                        MATHESH M !!!
                    </h1>
                    <div>
                        <p className="py-2">
                            Passionate and detail-oriented developer with a strong foundation in the{" "}
                            <span className="text-purple-500">MERN stack.</span> I specialize in building dynamic, responsive web applications with
                            <span className="text-purple-500"> clean UI/UX</span>. Always eager to learn, adapt, and deliver top-level solutions.
                        </p>
                        <p className="py-2">
                            I specialize in building <span className="text-purple-500">robust backends, sleek frontend,</span>
                            Currently pursuing my Bachelor of Technology in Information Technology.
                        </p>
                    </div>
                    <div className="flex flex-row gap-6 text-lg text-purple-500 ">
                        <div className="py-1 px-2 rounded-xl hover:underline">
                            <a href="https://github.com/Mathesh-299" target="_blank">.GitHub</a>
                        </div>
                        <div className="py-1 px-2 hover:underline rounded-xl">
                            <a href="https://leetcode.com/u/matheshm29/" target="_blank">.Leetcode</a>
                        </div>
                        <div className="py-1 px-2 hover:underline rounded-xl">
                            <a href="https://www.linkedin.com/in/matheshm29/" target="_blank">.LinkedIn</a>
                        </div>

                    </div>
                </div>

                <div className="flex flex-row w-[30%] justify-center items-center">
                    <img
                        src={Image}
                        alt="Profile"
                        className={`
              w-70 h-70 rounded-full
              transition-all
              ease-out
              duration-900
              border-2
              border-red-400
              px-2
              py-2
              border-anima
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
            `}
                    />
                </div>
            </div>

            <footer>
                <div className="flex flex-col justify-center items-center py-2 text-gray-500 bg-black/80 text-md border-t-2 w-full">
                        <p className="py-1">
                            © 2025 Mathesh. All rights reserved.
                        </p>
                        <p>
                            Made with ❤️ in React & Tailwind CSS
                        </p>
                    {/* </div> */}
                </div>
            </footer>
        </>
    );
};

export default Home;
