import TaipeiMRTMap_blue from "./TaipeiMRTMap_blue";
import TaipeiMRTMap_brown from "./TaipeiMRTMap_brown";
import TaipeiMRTMap_green from "./TaipeiMRTMap_green";
import TaipeiMRTMap_yellow from "./TaipeiMRTMap_yellow";
import TaipeiMRTMap_red from "./TaipeiMRTMap_red";

const MRTMapMerge = ({ onStationSelect }) => {
    //merge all the MRT lines together and they can be displayed in a horizontally scrollable display
    return (
        <div style={{ display: "flex", overflowX: "auto", width: "100vw" }}>
            <div style={{ minWidth: "100vw", flexShrink: 0 }}>
                <TaipeiMRTMap_blue onStationSelect={onStationSelect} />
            </div>
            <div style={{ minWidth: "100vw", flexShrink: 0 }}>
                <TaipeiMRTMap_brown onStationSelect={onStationSelect} />
            </div>
            <div style={{ minWidth: "100vw", flexShrink: 0 }}>
                <TaipeiMRTMap_green onStationSelect={onStationSelect} />
            </div>
            <div style={{ minWidth: "100vw", flexShrink: 0 }}>
                <TaipeiMRTMap_yellow onStationSelect={onStationSelect} />
            </div>
            <div style={{ minWidth: "100vw", flexShrink: 0 }}>
                <TaipeiMRTMap_red onStationSelect={onStationSelect} />
            </div>
        </div>

    );
    
};

export default MRTMapMerge;