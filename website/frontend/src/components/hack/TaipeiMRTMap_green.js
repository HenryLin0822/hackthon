import React, { useState } from 'react';

const stations = [
    { name: '松山', x: 400, y: 50 },
    { name: '南京三民', x: 350, y: 50 },
    { name: '台北小巨蛋', x: 300, y: 50 },
    { name: '南京復興', x: 250, y: 50 },
    { name: '松江南京', x: 200, y: 50 },
    { name: '北門', x: 150, y: 50 },
    { name: '西門', x: 100, y: 50 },
    { name: '小南門', x: 50, y: 50 },
    { name: '中正紀念堂', x: 50, y: 100 },
    { name: '古亭', x: 50, y: 150 },
    { name: '台電大樓', x: 50, y: 200 },
    { name: '公館', x: 50, y: 250 },
    { name: '萬隆', x: 50, y: 300 },
    { name: '景美', x: 50, y: 350 },
    { name: '大坪林', x: 50, y: 400 },
    { name: '七張', x: 100, y: 440 },
    { name: '新店區公所', x: 150, y: 440 },
    { name: '新店', x: 200, y: 440 },
];

const TaipeiMRTGreenLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station.name);
        onStationSelect(station.name);
    };

    return (
        <div className="relative w-full h-full bg-green-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 450 490">
                <path
                    d="M400 50 H50 V350 Q50 400 100 440 H200"
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
                            r="18"
                            fill={selectedStation === station.name ? '#006600' : '#008c00'}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={station.x}
                            y={station.y}
                            fontSize="10"
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontWeight="bold"
                            className="pointer-events-none"
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
