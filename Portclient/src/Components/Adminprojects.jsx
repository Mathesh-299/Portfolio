import { BrushCleaning, Github, Link, Pencil, Plus, Terminal, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/api';

const Projects = () => {
    const [animate, setAnimate] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newProject, setNewProject] = useState({
        projectName: '',
        projectDes: '',
        projectLink: '',
    });
    const [editingProjectId, setEditingProjectId] = useState(null);

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await API.get("/project/all");
            setProjects(response.data);
        } catch (error) {
            toast.error("Error fetching projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const timeout = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timeout);
    }, []);

    const textAnimation = `transition-all duration-1000 ease-in ${animate ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`;

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (!newProject.projectName || !newProject.projectDes || !newProject.projectLink) {
            toast.warn("Please fill in all fields");
            return;
        }
        try {
            setSubmitting(true);
            await API.post('/project/addproject', newProject);
            toast.success("👍🏻 Project added!");
            setNewProject({ projectName: '', projectDes: '', projectLink: '' });
            setShowForm(false);
            fetchData();
        } catch (error) {
            toast.error("👎🏻 Failed to add project");
        } finally {
            setSubmitting(false);
        }
    };

    const editProject = (project) => {
        setNewProject({
            projectName: project.projectName,
            projectDes: project.projectDes,
            projectLink: project.projectLink,
        });
        setEditingProjectId(project._id);
        setShowFormEdit(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!newProject.projectName || !newProject.projectDes || !newProject.projectLink) {
            toast.warn("Please fill in all fields");
            return;
        }
        try {
            setSubmitting(true);
            await API.put(`/project/editproject/${editingProjectId}`, newProject);
            toast.success("👍🏻 Project updated!");
            setNewProject({ projectName: '', projectDes: '', projectLink: '' });
            setEditingProjectId(null);
            setShowFormEdit(false);
            fetchData();
        } catch (error) {
            toast.error("👎🏻 Update failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteSubmit = async (id) => {
        try {
            await API.delete(`/project/delete/${id}`);
            toast.success("👍🏻 Project deleted!");
            fetchData();
        } catch (error) {
            toast.error("👎🏻 Delete failed");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-black/90 px-4 sm:px-6 lg:px-12 py-12 text-white flex flex-col items-center">
                <div className="w-full max-w-6xl flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className={`text-3xl sm:text-4xl font-bold ${textAnimation}`}>My Projects</h1>
                    {isLoggedIn && role === 'admin' && (
                        <button
                            aria-label="Add Project"
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded font-semibold transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Add Project
                        </button>
                    )}
                </div>

                <p className={`mb-10 text-gray-400 max-w-2xl text-justify ${textAnimation}`}>
                    Here are some of the projects I’ve worked on recently, demonstrating my skills and passion for building user-friendly digital experiences.
                </p>

                {loading ? (
                    <div className="text-lg text-gray-300">Loading projects...</div>
                ) : (
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl ${textAnimation}`}>
                        {projects.length === 0 ? (
                            <p className='text-2xl font-bold text-white flex gap-3 items-center justify-center col-span-full'>
                                <BrushCleaning /> No Projects...
                            </p>
                        ) : (
                            projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
                                >
                                    <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">
                                        {project.projectName}
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 line-clamp-3">
                                        {project.projectDes}
                                    </p>
                                    <a
                                        href={project.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-medium transition"
                                    >
                                        <Link className="w-4 h-4" />
                                        View Project
                                    </a>

                                    {isLoggedIn && role === 'admin' && (
                                        <div className="mt-5 flex items-center gap-3">
                                            <button
                                                onClick={() => editProject(project)}
                                                aria-label="Edit Project"
                                                className="group/edit relative p-2 rounded-full bg-gray-800 hover:bg-purple-600 text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-purple-600 text-xs text-white px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition pointer-events-none">
                                                    Edit
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSubmit(project._id)}
                                                aria-label="Delete Project"
                                                className="group/delete relative p-2 rounded-full bg-gray-800 hover:bg-red-600 text-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-red-600 text-xs text-white px-2 py-1 rounded opacity-0 group-hover/delete:opacity-100 transition pointer-events-none">
                                                    Delete
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {(showForm || showFormEdit) && (
                    <div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-start overflow-y-auto pt-20 px-4 animate-fadeIn"
                        onKeyDown={(e) => e.key === 'Escape' && (setShowForm(false), setShowFormEdit(false))}
                        tabIndex={-1}
                    >
                        <div className="relative bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md mb-12 border border-green-600">
                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setShowFormEdit(false);
                                }}
                                aria-label="Close Modal"
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                            >
                                &times;
                            </button>

                            {/* Modal Header */}
                            <h2 className="text-2xl font-bold mb-6 text-green-400 text-center">
                                {showFormEdit ? 'Update Project' : 'Add New Project'}
                            </h2>

                            {/* Form Start */}
                            <form
                                onSubmit={showFormEdit ? handleEditSubmit : handleAddProject}
                                className="flex flex-col gap-5"
                            >
                                {/* Project Name */}
                                <label className="flex flex-col text-sm text-white gap-1">
                                    Project Name
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={newProject.projectName}
                                        onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                                        className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                                        required
                                        aria-label="Project Name"
                                    />
                                </label>

                                {/* Description */}
                                <label className="flex flex-col text-sm text-white gap-1">
                                    Description
                                    <textarea
                                        rows="4"
                                        placeholder="Enter project description"
                                        value={newProject.projectDes}
                                        onChange={(e) => setNewProject({ ...newProject, projectDes: e.target.value })}
                                        className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                                        required
                                        aria-label="Project Description"
                                    />
                                </label>

                                {/* Project Link */}
                                <label className="flex flex-col text-sm text-white gap-1">
                                    Project Link
                                    <input
                                        type="url"
                                        placeholder="https://example.com"
                                        value={newProject.projectLink}
                                        onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
                                        className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                                        required
                                        aria-label="Project Link"
                                    />
                                </label>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setShowFormEdit(false);
                                        }}
                                        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`px-5 py-2 rounded font-semibold text-black transition ${submitting ? 'bg-green-300 cursor-not-allowed' : 'bg-green-400 hover:bg-green-500'
                                            }`}
                                    >
                                        {submitting ? 'Processing...' : showFormEdit ? 'Update Project' : 'Add Project'}
                                    </button>
                                </div>
                            </form>
                        </div>
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

export default Projects;
