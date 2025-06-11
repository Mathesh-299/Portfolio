import { ScanFace } from 'lucide-react';
import { Link, useLocation } from 'react-router';
const Navbar = () => {

    const location = useLocation();
    const routes = ['/', '/about', '/project', '/contact'];
    const label = ['01.Home', '02.About Me', '03.Project', '04.Contact'];
    return (
        <>
            {/* <div className=" pt-6 "> */}
            <div className='pt-4 bg-black/90 pb-4'>
                <div className="flex lg:bg-gray-800 items-center py-2 px-8 text-white mx-4 h-16 rounded-full">
                    <div className="w-1/2 flex px-48 items-center font-extrabold">
                        <Link to='/'>
                            <h1 className="text-2xl font-serif border-b-2 border-r-2 border-b-gray-400 border-r-gray-400 px-3 py-1 rounded-b-lg rounded-r-md">
                                MATHESH M
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6 font-mono text-md">
                        {
                            routes.map((path, i) => (
                                <Link to={path} key={path}>
                                    <button className={`relative px-7 py-2 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 ${location.pathname === path ? "border-b-2 border-green-400 text-green-400 bg-gray-700" : " "}`}>
                                        {label[i]}
                                    </button>
                                </Link>
                            ))
                        }
                    </div>
                    <Link to="login">
                        <div className='text-white flex pl-10 items-center justify-end hover:text-green-400'>
                            <ScanFace />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar