// src/Canvas.jsx
import React, { useRef } from 'react';

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
            <div>
                <button
                    onClick={handleButtonClick}
                    style={{ fontSize: '2rem', padding: '1rem 2rem' }}
                >
                    Upload File
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
}

export default Canvas;
