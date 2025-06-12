import { Github, Link, Pencil, Plus, Terminal, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import API from '../api/api';

const Projects = () => {
    const [animate, setAnimate] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const [newProject, setNewProject] = useState({
        projectName: '',
        projectDes: '',
        projectLink: '',
    });

    const [editingProjectId, setEditingProjectId] = useState(null);

    // Fetch all projects
    const fetchData = async () => {
        try {
            const response = await API.get("/project/all");
            setProjects(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const textAnimation = `transition-all duration-1000 ease-in ${animate ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`;

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/project/addproject', newProject);
            setNewProject({ projectName: '', projectDes: '', projectLink: '' });
            setShowForm(false);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const editProject = (project) => {
        setNewProject({
            projectName: project.projectName,
            projectDes: project.projectDes,
            projectLink: project.projectLink,
        });
        setEditingProjectId(project._id);
        console.log(project._id);
        // console.log(editingProjectId)
        setShowFormEdit(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put(`/project/editproject/${editingProjectId}`, newProject);
            console.log(newProject);
            console.log("Updated:", res.data);
            setShowFormEdit(false);
            setEditingProjectId(null);
            setNewProject({ projectName: '', projectDes: '', projectLink: '' });
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteSubmit = async (id) => {
        try {
            const res = await API.delete(`/project/delete/${id}`)
            console.log("deleted Successfully");
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="min-h-screen bg-black/90 px-6 py-12 text-white flex flex-col items-center">
                <div className="w-full max-w-6xl flex justify-between items-center mb-6">
                    <h1 className={`text-4xl font-bold ${textAnimation}`}>
                        My Projects
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded font-semibold transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Project
                    </button>
                </div>

                <p className={`mb-10 text-gray-400 max-w-2xl text-justify ${textAnimation}`}>
                    Here are some of the projects I’ve worked on recently, demonstrating my skills and passion for building user-friendly digital experiences.
                </p>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl ${textAnimation}`}>
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
                            <h2 className="text-xl font-semibold text-purple-500 mb-2">{project.projectName}</h2>
                            <p className="text-gray-300 mb-4">{project.projectDes}</p>
                            <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline"
                            >
                                View Project
                            </a>
                            <div className='flex flex-row gap-4 py-3'>
                                <button type='button' onClick={() => editProject(project)}>
                                    <Pencil />
                                </button>
                                <button onClick={() => handleDeleteSubmit(project._id)}>
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Project Form */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-green-400">Add New Project</h2>
                            <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={newProject.projectName}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, projectName: e.target.value })
                                    }
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <textarea
                                    placeholder="Project Description"
                                    rows="3"
                                    value={newProject.projectDes}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, projectDes: e.target.value })
                                    }
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                ></textarea>
                                <input
                                    type="url"
                                    placeholder="Project Link"
                                    value={newProject.projectLink}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, projectLink: e.target.value })
                                    }
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-green-400 hover:bg-green-500 text-black font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Project Form */}
                {showFormEdit && (
                    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-green-400">Update Project</h2>
                            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={newProject.projectName}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, projectName: e.target.value })
                                    }
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <textarea
                                    placeholder="Project Description"
                                    rows="3"
                                    value={newProject.projectDes}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, projectDes: e.target.value })
                                    }
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                ></textarea>
                                <input
                                    type="url"
                                    placeholder="Project Link"
                                    value={newProject.projectLink}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, projectLink: e.target.value })
                                    }
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowFormEdit(false)}
                                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded bg-green-400 hover:bg-green-500 text-black font-semibold"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <footer>
                <div className="flex flex-row bg-black/80 justify-center items-center py-3 gap-6">
                    <a href="https://github.com/Mathesh-299" target="_blank" rel="noopener noreferrer">
                        <abbr title="Github">
                            <Github className="text-gray-300 hover:text-purple-500" />
                        </abbr>
                    </a>
                    <a href="https://www.linkedin.com/in/matheshm29/" target="_blank" rel="noopener noreferrer">
                        <abbr title="LinkedIn">
                            <Link className="text-gray-300 hover:text-purple-500" />
                        </abbr>
                    </a>
                    <a href="https://leetcode.com/u/matheshm29/" target="_blank" rel="noopener noreferrer">
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

export default Projects;
