import React, { useRef } from "react";
import axios from "axios";
import AnimatedContent from "../blocks/Animations/AnimatedContent/AnimatedContent";
import "./Canvas.css";

const Canvas = () => {
    const fileInputRef = useRef(null); // ✅ Reference to hidden file input

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("audio", file);

        try {
            const response = await axios.post("http://localhost:8000/api/audiofile/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Upload success:", response.data);
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // ✅ Open file picker when button is clicked
    };

    return (
        <div
            style={{
                backgroundColor: "#000",
                color: "#fff",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                <input
                    type="file"
                    accept="audio/*"
                    ref={fileInputRef}
                    style={{ display: "none" }} // ✅ Hidden input field
                    onChange={handleFileSelect}
                />

                <div className="tooltip-container">
                    <button className="button" onClick={handleButtonClick}>+</button>
                    <div className="tooltip-content">Click to select and upload an audio file</div>
                </div>
            </AnimatedContent>
        </div>
    );
};

export default Canvas;
