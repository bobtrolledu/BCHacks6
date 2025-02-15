import React, { useState, useEffect } from 'react';
import TiltedCard from './blocks/Components/TiltedCard/TiltedCard';

const App = () => {
  const [data, setData] = useState([]);
  const [img, setImg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/slates/');
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{
    display: "flex", // Use Flexbox instead of <ul>
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  }}>
        {data.map((item) => (
            <div>
              <TiltedCard
                imageSrc={ item.image }
                altText=""
                captionText= {item.description}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                  </p>
                }
              />
            </div>
        ))}
      </div>
    </div>
  );
};

export default App;
