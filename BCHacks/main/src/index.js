// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dock from './blocks/Components/Dock/Dock';
import { HiOutlineHome, HiOutlineCog, HiOutlineFolder, HiOutlineDocument } from "react-icons/hi";
import LandingPage from "./LandingPage";
import Canvas from "./Canvas";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

// Replace your Go() function with one that navigates by updating the URL
function Go(path) {
    window.history.pushState({}, '', path);
    // Dispatch a popstate event so that React Router picks up the URL change
    window.dispatchEvent(new PopStateEvent('popstate'));
}

// Define the dock items. For Home and Canvas, call Go() with the desired path.
const items = [
    { icon: <HiOutlineHome color={'white'} size={28} />, label: 'Home', onClick: () => Go('/') },
    { icon: <HiOutlineDocument color={"white"} size={28} />, label: 'Canvas', onClick: () => Go('/canvas') },
    { icon: <HiOutlineFolder color={"white"} size={28} />, label: 'Gallery', onClick: () => alert('Profile!') },
    { icon: <HiOutlineCog color={"white"} size={28} />, label: 'Settings', onClick: () => alert('Settings!') },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            {/* Define the routes for your pages */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/canvas" element={<Canvas />} />
            </Routes>
            {/* Render the Dock outside the Routes so that it always appears */}
            <Dock
                items={items}
                panelHeight={25}
                baseItemSize={50}
                magnification={70}
            />
        </Router>
    </React.StrictMode>
);
