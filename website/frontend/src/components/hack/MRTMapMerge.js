import TaipeiMRTMap_blue from "./TaipeiMRTMap_blue";
import TaipeiMRTMap_brown from "./TaipeiMRTMap_brown";
import TaipeiMRTMap_green from "./TaipeiMRTMap_green";
import TaipeiMRTMap_yellow from "./TaipeiMRTMap_yellow";
import TaipeiMRTMap_red from "./TaipeiMRTMap_red";

const MRTMapMerge = ({ onStationSelect }) => {
    //merge all the MRT lines together and they can be displayed in a horizontally scrollable display
    return (
        <div style={{
            display: "flex", 
            overflowX: "auto", 
            width: "100vw", 
            scrollSnapType: "x mandatory", 
            scrollBehavior: "smooth",
            scrollbarWidth: "none", // Optional: Hide scrollbar for cleaner look
            msOverflowStyle: "none" // Optional: Hide scrollbar for IE/Edge
          }}>
            <div style={{
              minWidth: "90vw", 
              flexShrink: 0, 
              scrollSnapAlign: "start", 
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)"
            }}>
              <TaipeiMRTMap_blue onStationSelect={onStationSelect} />
            </div>
            <div style={{
              minWidth: "90vw", 
              flexShrink: 0, 
              scrollSnapAlign: "start", 
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)"
            }}>
              <TaipeiMRTMap_brown onStationSelect={onStationSelect} />
            </div>
            <div style={{
              minWidth: "90vw", 
              flexShrink: 0, 
              scrollSnapAlign: "start", 
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)"
            }}>
              <TaipeiMRTMap_green onStationSelect={onStationSelect} />
            </div>
            <div style={{
              minWidth: "90vw", 
              flexShrink: 0, 
              scrollSnapAlign: "start", 
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)"
            }}>
              <TaipeiMRTMap_yellow onStationSelect={onStationSelect} />
            </div>
            <div style={{
              minWidth: "90vw", 
              flexShrink: 0, 
              scrollSnapAlign: "start", 
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5)"
            }}>
              <TaipeiMRTMap_red onStationSelect={onStationSelect} />
            </div>
          </div>
          
          

    );
    
};

export default MRTMapMerge;