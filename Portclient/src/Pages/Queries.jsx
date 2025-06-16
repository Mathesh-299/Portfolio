import { Github, Link, Terminal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api/api";

const Queries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const res = await API.get("/query/getQueries");
            setQueries(res.data);
            console.log(res.data);
        } catch (error) {
            toast.error("Failed to fetch queries");
            console.error(error);
        }
    };

    const handleDeleteSubmit = async (id) => {
        try {
            const res = await API.delete(`/query/deleteQueries/${id}`);
            console.log((await res).status);
            fetchQueries();
        } catch (error) {
            console.log(error);
        }
        console.log(id);
    }

    return (
        <>
            <div className="min-h-screen bg-black/90 text-white px-6 py-10">
                <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">User Queries</h1>
                {queries.length === 0 ? (
                    <p className="text-center text-gray-400 text-lg">No queries found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {queries.map((query, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <h2 className="text-xl font-semibold text-purple-300 mb-2">
                                    <span className="font-medium text-red-400">Client: </span>{query.Name}</h2>
                                <p className="text-sm text-gray-300 break-words mb-2">
                                    <span className="font-medium text-green-400">Email: </span> {query.Email}
                                </p>
                                <p className="text-sm text-gray-200">
                                    <span className="font-medium text-blue-400">Message:</span> {query.Message}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSubmit(query._id)}
                                    aria-label="Delete Project"
                                    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    <Trash2 className="w-5 h-5" />

                                    {/* Tooltip */}
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-xs text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10 shadow-lg">
                                        Delete
                                    </span>
                                </button>


                            </div>
                        ))}
                    </div>
                )}
            </div>
            <footer>
                <div className="flex bg-black/80 justify-center items-center py-3 gap-6">
                    <a href="https://github.com/Mathesh-299" target="_blank" rel="noopener noreferrer">
                        <abbr title="Github"><Github className="text-gray-300 hover:text-purple-500" /></abbr>
                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target="_blank" rel="noopener noreferrer">
                        <abbr title="LinkedIn"><Link className="text-gray-300 hover:text-purple-500" /></abbr>
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target="_blank" rel="noopener noreferrer">
                        <abbr title="Leetcode"><Terminal className="text-gray-300 hover:text-purple-500" /></abbr>
                    </a>
                </div>
                <div className="text-center text-gray-500 py-2 bg-black/80 border-t-2">
                    <p>© 2025 Mathesh. All rights reserved.</p>
                    <p>Made with ❤️ in React & Tailwind CSS</p>
                </div>
            </footer>
        </>
    );
};

export default Queries;
