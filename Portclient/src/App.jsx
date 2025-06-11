import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Auth/AdminLogin";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Navbar from "./Pages/Navbar";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/project" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<AdminLogin />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;