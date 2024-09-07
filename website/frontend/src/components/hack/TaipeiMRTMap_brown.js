import React, { useState } from 'react';

const stations = [
    { name: '南港展覽館', x: 400, y: 50 },
    { name: '南港軟體園區', x: 350, y: 50 },
    { name: '東湖', x: 300, y: 50 },
    { name: '葫洲', x: 250, y: 50 },
    { name: '大湖公園', x: 200, y: 50 },
    { name: '內湖', x: 150, y: 50 },
    { name: '文德', x: 100, y: 50 },
    { name: '港墘', x: 50, y: 50 },
    { name: '西湖', x: 50, y: 100 },
    { name: '劍南路', x: 50, y: 150 },
    { name: '大直', x: 50, y: 200 },
    { name: '松山機場', x: 50, y: 250 },
    { name: '中山國中', x: 50, y: 300 },
    { name: '南京復興', x: 100, y: 350 },
    { name: '忠孝復興', x: 150, y: 350 },
    { name: '大安', x: 200, y: 350 },
    { name: '科技大樓', x: 250, y: 350 },
    { name: '六張犁', x: 300, y: 400 },
    { name: '麟光', x: 350, y: 400 },
    { name: '辛亥', x: 400, y: 400 },
    { name: '萬芳醫院', x: 450, y: 400 },
    { name: '萬芳社區', x: 450, y: 450 },
    { name: '木柵', x: 400, y: 450 },
    { name: '動物園', x: 350, y: 450 },
];

const TaipeiMRTBrownLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station.name);
        onStationSelect(station.name);
    };

    return (
        <div className="relative w-full h-full bg-yellow-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 450 490">
                <path
                    d="M400 50 H50 V350 Q50 400 100 450 H450"
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
                            fill={selectedStation === station.name ? '#664400' : '#996600'}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <text
                            x={station.x}
                            y={station.y + 20}
                            fontSize="10"
                            textAnchor="middle"
                            fill="white"
                            dominantBaseline="middle"
                            fontWeight="bold"
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
