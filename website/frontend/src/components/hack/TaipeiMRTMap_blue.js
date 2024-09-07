import { blue } from '@mui/material/colors';
import React, { useState } from 'react';

const stations = [
    { name: '頂埔', x: 30, y: 440 },
    { name: '永寧', x: 30, y: 400 },
    { name: '土城', x: 30, y: 360 },
    { name: '海山', x: 30, y: 320 },
    { name: '亞東醫院', x: 30, y: 280 },
    { name: '府中', x: 30, y: 240 },
    { name: '板橋', x: 30, y: 200 },
    { name: '新埔', x: 30, y: 160 },
    { name: '江子翠', x: 30, y: 120 },
    { name: '龍山寺', x: 80, y: 120 },
    { name: '西門', x: 130, y: 120 },
    { name: '台北車站', x: 180, y: 120 },
    { name: '善導寺', x: 230, y: 120 },
    { name: '忠孝新生', x: 280, y: 120 },
    { name: '忠孝復興', x: 330, y: 120 },
    { name: '忠孝敦化', x: 380, y: 120 },
    { name: '國父紀念館', x: 380, y: 160 },
    { name: '市政府', x: 380, y: 200 },
    { name: '永春', x: 380, y: 240 },
    { name: '後山埤', x: 380, y: 280 },
    { name: '昆陽', x: 380, y: 320 },
    { name: '南港', x: 380, y: 360 },
    { name: '南港展覽館', x: 380, y: 400 },
];

const TaipeiMRTBlueLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station.name);
        onStationSelect(station.name);
    };

    return (
        <div className="relative w-full h-full bg-blue-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 450 490">
                <path
                    d={`M30 440 V120 H380 V400`}
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