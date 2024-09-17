import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClinicaList from './components/ClinicaList';
import ClinicaForm from './components/ClinicaForm';
import ClinicaDetail from './components/ClinicaDetail';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<ClinicaList/>} />
                    <Route path="/add" element={<ClinicaForm/>} />
                    <Route path="/edit/:id" element={<ClinicaForm/>} />
                    <Route path="/detail/:id" element={<ClinicaDetail/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
