import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./Auth/AdminLogin";
import About from "./Components/About";
import Adminprojects from './Components/Adminprojects';
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Navbar from "./Pages/Navbar";
import Queries from './Pages/Queries';
const App = () => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return (
        <>
            <ToastContainer />
            <Toaster position="top-right" reverseOrder={false} />
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<AdminLogin />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path='/adminProject' element={<Adminprojects />} />
                    <Route path="/query" element={<Queries />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;