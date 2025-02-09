import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import AnimatedContent from "../blocks/Animations/AnimatedContent/AnimatedContent";
import "./Canvas.css";
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard";

const Canvas = () => {
    const fileInputRef = useRef(null); // ✅ Reference to hidden file input

    const [latestSlate, setLatestSlate] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchLatestSlate = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/slates/');
        const result = await response.json();
        if (result.length > 0) {
          setLatestSlate(result[result.length - 1]); // Get the latest slate
        }
      } catch (error) {
        console.error('Error fetching latest slate:', error);
      }
    };
    fetchLatestSlate();
  }, [refreshTrigger]);


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
            setRefreshTrigger(prev => prev + 1);

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
            {latestSlate && (
        <TiltedCard
          imageSrc={latestSlate.image}
          altText=""
          captionText={latestSlate.description}
          containerHeight="60vh"
          containerWidth="60vh"
          imageHeight="60vh"
          imageWidth="60vh"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={<p className="tilted-card-demo-text"></p>}
        />
      )}
            <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
                refreshTrigger={refreshTrigger}
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
