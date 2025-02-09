// src/Canvas.jsx
import React, { useRef } from 'react';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import './Canvas.css'; // Or include the CSS in your global CSS file

function Canvas() {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            alert(`File selected: ${file.name}`);
            // Add your file upload logic here.
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#000',
                color: '#fff',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
            >
                <div className="tooltip-container">
                    <button
                        onClick={handleButtonClick}
                        className="button"
                    >
                        +
                    </button>
                    <div className="tooltip-content">Click to upload a file</div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </AnimatedContent>
        </div>
    );
}

export default Canvas;
