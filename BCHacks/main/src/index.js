import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dock from './blocks/Components/Dock/Dock';
import { HiOutlineHome, HiOutlineCog, HiOutlineFolder, HiOutlineDocument } from "react-icons/hi";
import LandingPage from "./LandingPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';



const items = [
        { icon: <HiOutlineHome color={'white'} size={28}/>, label: 'Home', onClick: () => Go(<LandingPage />) },
        { icon: <HiOutlineDocument color={"white"} size={28}/>, label: 'Canvas', onClick: () => alert('Archive!') },
        { icon: <HiOutlineFolder color={"white"} size={28}/>, label: 'Gallery', onClick: () => alert('Profile!') },
        { icon: <HiOutlineCog color={"white"} size={28}/>, label: 'Settings', onClick: () => alert('Settings!') },
    ];

function Go(element) {
    <Router>
        <Routes>
            <Route path="/" element={element}/>
        </Routes>
    </Router>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LandingPage/>
        <Dock
            items={items}
            panelHeight={25}
            baseItemSize={50}
            magnification={70}
        />
    </React.StrictMode>
);
