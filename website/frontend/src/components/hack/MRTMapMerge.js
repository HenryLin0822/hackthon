import { useRef, useEffect } from 'react';
import TaipeiMRTMap_blue from "./TaipeiMRTMap_blue";
import TaipeiMRTMap_brown from "./TaipeiMRTMap_brown";
import TaipeiMRTMap_green from "./TaipeiMRTMap_green";
import TaipeiMRTMap_yellow from "./TaipeiMRTMap_yellow";
import TaipeiMRTMap_red from "./TaipeiMRTMap_red";

const MRTMapMerge = ({ onStationSelect }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // No background color change functionality needed anymore
      });
    }, {
      root: container,
      threshold: 0.5 // Adjust this value to determine when a component is considered "visible"
    });

    const elements = container.querySelectorAll('.scroll-item');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div 
      ref={scrollContainerRef} 
      style={{ 
        display: "flex", 
        overflowX: "auto", 
        width: "90vw",
        scrollSnapType: "x mandatory", 
        scrollBehavior: "smooth",
        scrollbarWidth: "none", // Optional: Hide scrollbar for cleaner look
        msOverflowStyle: "none", // Optional: Hide scrollbar for IE/Edge
        // backdropFilter: "blur(3px)", // Apply blur effect to the background
        transition: "background-color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)",
        // border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <div id="red" className="scroll-item" style={{ minWidth: "90vw", flexShrink: 0, scrollSnapAlign: "start", transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)" }}>
        <TaipeiMRTMap_red onStationSelect={onStationSelect} />
      </div>
      <div id="blue" className="scroll-item" style={{ minWidth: "90vw", flexShrink: 0, scrollSnapAlign: "start", transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)" }}>
        <TaipeiMRTMap_blue onStationSelect={onStationSelect} />
      </div>
      <div id="brown" className="scroll-item" style={{ minWidth: "90vw", flexShrink: 0, scrollSnapAlign: "start", transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)" }}>
        <TaipeiMRTMap_brown onStationSelect={onStationSelect} />
      </div>
      <div id="green" className="scroll-item" style={{ minWidth: "90vw", flexShrink: 0, scrollSnapAlign: "start", transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)" }}>
        <TaipeiMRTMap_green onStationSelect={onStationSelect} />
      </div>
      <div id="yellow" className="scroll-item" style={{ minWidth: "90vw", flexShrink: 0, scrollSnapAlign: "start", transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)" }}>
        <TaipeiMRTMap_yellow onStationSelect={onStationSelect} />
      </div>
    </div>
  );
};

export default MRTMapMerge;
