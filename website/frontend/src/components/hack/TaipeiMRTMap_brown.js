import React, { useState } from 'react';

const stations = [
    // Top side (left to right)
    { name: '南港展覽館', x: 50, y: 50 },
    { name: '南港軟體園區', x: 100, y: 50 },
    { name: '東湖', x: 150, y: 50 },
    { name: '葫洲', x: 200, y: 50 },
    { name: '大湖公園', x: 250, y: 50 },
    { name: '內湖', x: 300, y: 50 },
    { name: '文德', x: 350, y: 50 },
    { name: '港墘', x: 400, y: 50 },
    // Right side (top to bottom)
    { name: '西湖', x: 400, y: 100 },
    { name: '劍南路', x: 400, y: 150 },
    { name: '大直', x: 400, y: 200 },
    { name: '松山機場', x: 400, y: 250 },
    { name: '中山國中', x: 400, y: 300 },
    { name: '南京復興', x: 400, y: 350 },
    { name: '忠孝復興', x: 400, y: 400 },
    // Bottom side (right to left)
    { name: '大安', x: 350, y: 400 },
    { name: '科技大樓', x: 300, y: 400 },
    { name: '六張犁', x: 250, y: 400 },
    { name: '麟光', x: 200, y: 400 },
    { name: '辛亥', x: 150, y: 400 },
    { name: '萬芳醫院', x: 100, y: 400 },
    { name: '萬芳社區', x: 50, y: 400 },
    // Left side (bottom to top)
    { name: '木柵', x: 50, y: 350 },
    { name: '動物園', x: 50, y: 300 },
];

const TaipeiMRTBrownLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station);
        onStationSelect(station.name);
    };

    return (
        <div className="relative w-full h-full bg-yellow-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 450 450">
                <path
                    d="M50 50 H400 V400 H50 V300"
                    fill="none"
                    stroke="#996600"
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
                            fill={selectedStation?.name === station.name ? '#664400' : '#996600'}
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

export default TaipeiMRTBrownLineMap;