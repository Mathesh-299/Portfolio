import { BrushCleaning, Github, Link, Plus, Terminal } from 'lucide-react';
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
                    <div className="text-lg text-gray-300 animate-spin">Loading projects...</div>
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
                                </div>
                            ))
                        )}
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
