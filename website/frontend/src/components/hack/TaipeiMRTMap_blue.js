import { blue } from '@mui/material/colors';
import React, { useState } from 'react';

const stations = [
    { name: '頂埔', x: 50, y: 490 },
    { name: '永寧', x: 50, y: 450 },
    { name: '土城', x: 50, y: 410 },
    { name: '海山', x: 50, y: 370 },
    { name: '亞東醫院', x: 50, y: 330 },
    { name: '府中', x: 50, y: 290 },
    { name: '板橋', x: 50, y: 250 },
    { name: '新埔', x: 50, y: 210 },
    { name: '江子翠', x: 50, y: 170 },
    { name: '龍山寺', x: 100, y: 170 },
    { name: '西門', x: 150, y: 170 },
    { name: '台北車站', x: 200, y: 170 },
    { name: '善導寺', x: 250, y: 170 },
    { name: '忠孝新生', x: 300, y: 170 },
    { name: '忠孝復興', x: 350, y: 170 },
    { name: '忠孝敦化', x: 400, y: 170 },
    { name: '國父紀念館', x: 450, y: 170 },
    { name: '市政府', x: 500, y: 170 },
    { name: '永春', x: 550, y: 170 },
    { name: '後山埤', x: 600, y: 170 },
    { name: '昆陽', x: 650, y: 170 },
    { name: '南港', x: 700, y: 170 },
    { name: '南港展覽館', x: 750, y: 170 },
];

const TaipeiMRTBlueLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station);
        onStationSelect(station);
    };

    return (
        <div className="relative w-full h-full bg-blue-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 800 540">
                <path
                    d="M50 490 V170 H750"
                    fill="none"
                    stroke="#0070bd"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {stations.map((station, index) => {
                    const isSelected = selectedStation?.name === station.name;

                    return (
                        <g
                            key={index}
                            onClick={() => handleStationClick(station)}
                        >
                            <circle
                                cx={station.x}
                                cy={station.y}
                                r="18"
                                fill={isSelected ? blue[500] : '#0070bd'}
                                stroke="white"
                                strokeWidth="2"
                                className="cursor-pointer hover:stroke-yellow-300 transition-all duration-200"
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
                    );
                })}
            </svg>
        </div>
    );
};

export default TaipeiMRTBlueLineMap;