// src/Canvas.jsx
import React, { useRef, useState } from 'react';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import './Canvas.css';

function Canvas() {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            setUploading(true);
            // Simulate an upload delay (3 seconds)
            setTimeout(() => {
                setUploading(false);
            }, 3000);
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
                {uploading ? (
                    <div className="upload-status">
                        <div className="spinner"></div>
                        <div className="upload-message">
                            Uploading {uploadedFileName}...
                        </div>
                    </div>
                ) : uploadedFileName ? (
                    <div className="file-selected">
                        File Selected: {uploadedFileName}
                    </div>
                ) : (
                    <div className="tooltip-container">
                        <button onClick={handleButtonClick} className="button">
                            +
                        </button>
                        <div className="tooltip-content">
                            Click to upload a file
                        </div>
                    </div>
                )}
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
