import React, { useState } from 'react';

const stations = [
    { name: '松山', x: 700, y: 50 },
    { name: '南京三民', x: 650, y: 50 },
    { name: '台北小巨蛋', x: 600, y: 50 },
    { name: '南京復興', x: 550, y: 50 },
    { name: '松江南京', x: 500, y: 50 },
    { name: '北門', x: 450, y: 50 },
    { name: '西門', x: 400, y: 50 },
    { name: '小南門', x: 350, y: 50 },
    { name: '中正紀念堂', x: 300, y: 50 },
    { name: '古亭', x: 250, y: 100 },
    { name: '台電大樓', x: 200, y: 150 },
    { name: '公館', x: 150, y: 200 },
    { name: '萬隆', x: 100, y: 250 },
    { name: '景美', x: 50, y: 300 },
    { name: '大坪林', x: 50, y: 350 },
    { name: '七張', x: 50, y: 400 },
    { name: '新店區公所', x: 100, y: 450 },
    { name: '新店', x: 150, y: 450 },
];

const TaipeiMRTGreenLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station);
        onStationSelect(station);
    };

    return (
        <div className="relative w-full h-full bg-green-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 750 500">
                <path
                    d="M700 50 H250 Q50 50 50 300 V450 H150"
                    fill="none"
                    stroke="#008c00"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {stations.map((station, index) => (
                    <g key={index} onClick={() => handleStationClick(station)}>
                        <circle
                            cx={station.x}
                            cy={station.y}
                            r="8"
                            fill={selectedStation?.name === station.name ? '#006600' : '#008c00'}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={station.x}
                            y={station.y + 20}
                            fontSize="10"
                            textAnchor="middle"
                            fill="black"
                        >
                            {station.name}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default TaipeiMRTGreenLineMap;