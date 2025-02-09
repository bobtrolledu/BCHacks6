import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dock from './blocks/Components/Dock/Dock';
import Orb from "./blocks/Backgrounds/Orb/Orb";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { HiOutlineFolder } from "react-icons/hi";
import { HiOutlineDocument } from "react-icons/hi";



const items = [
        { icon: <HiOutlineHome color={'white'} size={28}/>, label: 'Home', onClick: () => alert('Home!') },
        { icon: <HiOutlineDocument color={"white"} size={28}/>, label: 'Canvas', onClick: () => alert('Archive!') },
        { icon: <HiOutlineFolder color={"white"} size={28}/>, label: 'Gallery', onClick: () => alert('Profile!') },
        { icon: <HiOutlineCog color={"white"} size={28}/>, label: 'Settings', onClick: () => alert('Settings!') },
    ];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <div style={{width: '100%', height: '100vh', position: 'relative'}}>
            <Orb
                hoverIntensity={3}
                rotateOnHover={true}
                hue={254}
                forceHoverState={false}
            />
        </div>
        <Dock
            items={items}
            panelHeight={40}
            baseItemSize={80}
            magnification={100}
        />
    </React.StrictMode>
);
