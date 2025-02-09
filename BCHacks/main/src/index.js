import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dock from './blocks/Components/Dock/Dock';
import Orb from "./blocks/Backgrounds/Orb/Orb";
import GradientText from "./blocks/TextAnimations/GradientText/GradientText";
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
        <div
            style={{
                backgroundColor: '#000',
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {/* Top section: Orb with centered gradient text */}
            <div style={{ width: '100%', height: '90vh', position: 'relative' }}>
                <Orb
                    hoverIntensity={3.0}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1, // Ensures the text is on top of the orb
                    }}
                >
                    <GradientText
                        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                        animationSpeed={3}
                        showBorder={false}
                        className="custom-class"
                    >
                        chromesthesia
                    </GradientText>
                </div>
            </div>

            {/* Bottom section: Dock */}



        </div>
        <Dock
            items={items}
            panelHeight={25}
            baseItemSize={50}
            magnification={70}
        />
    </React.StrictMode>
);
