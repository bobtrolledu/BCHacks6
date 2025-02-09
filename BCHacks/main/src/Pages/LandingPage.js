import Orb from "../blocks/Backgrounds/Orb/Orb";
import GradientText from "../blocks/TextAnimations/GradientText/GradientText";
import React from "react";
import './LandingPage.css';


function LandingPage() {
    return (
        <div
            className="HeroSplash"
            style={{
                backgroundColor: '#000',
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {/* Top section: Orb with centered gradient text */}
            <div style={{width: '100%', height: '90vh', position: 'relative'}}>
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
                        className="hero-text"
                    >
                        chromesthesia.
                    </GradientText>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;