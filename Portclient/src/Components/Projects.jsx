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
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;

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
            <div className="min-h-screen bg-black/90 px-6 py-12 text-white flex flex-col items-center">
                <div className="w-full max-w-6xl flex justify-between items-center mb-6">
                    <h1 className={`text-4xl font-bold ${textAnimation}`}>My Projects</h1>
                    <button
                        aria-label="Add Project"
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

                {loading ? (
                    <div className="text-lg text-gray-300">Loading projects...</div>
                ) : (
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl ${textAnimation}`}>
                        {projects.length === 0 ? (
                            <p className='text-2xl font-bold text-white flex gap-3 items-center justify-center'>
                                <BrushCleaning /> No Projects...
                            </p>
                        ) : (
                            projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-xl transform hover:scale-[1.03] transition-all duration-300 ease-in-out group"
                                >
                                    {/* Project Title */}
                                    <h2 className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-200 mb-2">
                                        {project.projectName}
                                    </h2>

                                    {/* Project Description */}
                                    <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
                                        {project.projectDes}
                                    </p>

                                    {/* Project Link */}
                                    <a
                                        href={project.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-medium transition"
                                    >
                                        <Link className="w-4 h-4" />
                                        View Project
                                    </a>

                                    {/* Action Buttons */}
                                    <div className="mt-5 flex items-center gap-3">
                                        {/* Edit Button */}
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

                                        {/* Delete Button */}
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
                                </div>

                            ))
                        )}
                    </div>
                )}

                {/* Add/Edit Forms */}
                {(showForm || showFormEdit) && (
                    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold mb-4 text-green-400">
                                {showFormEdit ? 'Update Project' : 'Add New Project'}
                            </h2>
                            <form onSubmit={showFormEdit ? handleEditSubmit : handleAddProject} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    value={newProject.projectName}
                                    onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <textarea
                                    placeholder="Project Description"
                                    rows="3"
                                    value={newProject.projectDes}
                                    onChange={(e) => setNewProject({ ...newProject, projectDes: e.target.value })}
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                ></textarea>
                                <input
                                    type="url"
                                    placeholder="Project Link"
                                    value={newProject.projectLink}
                                    onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
                                    className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setShowFormEdit(false);
                                        }}
                                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`px-4 py-2 rounded font-semibold text-black ${submitting ? 'bg-green-300' : 'bg-green-400 hover:bg-green-500'}`}
                                    >
                                        {submitting ? "Processing..." : showFormEdit ? "Update" : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer (unchanged) */}
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
