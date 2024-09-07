import React, { useState } from 'react';

const stations = [
    { name: '淡水', x: 50, y: 50, line: '#ff6b6b' },
    { name: '紅樹林', x: 100, y: 50, line: '#ff6b6b' },
    { name: '竹圍', x: 150, y: 50, line: '#ff6b6b' },
    { name: '關渡', x: 200, y: 50, line: '#ff6b6b' },
    { name: '忠義', x: 250, y: 50, line: '#ff6b6b' },
    { name: '復興崗', x: 300, y: 50, line: '#ff6b6b' },
    { name: '北投', x: 350, y: 50, line: '#ff6b6b' },
    { name: '新北投', x: 400, y: 40, line: '#ff6b6b' },
    { name: '奇岩', x: 400, y: 90, line: '#ff6b6b' },
    { name: '唭哩岸', x: 400, y: 140, line: '#ff6b6b' },
    { name: '石牌', x: 400, y: 190, line: '#ff6b6b' },
    { name: '明德', x: 400, y: 240, line: '#ff6b6b' },
    { name: '芝山', x: 400, y: 290, line: '#ff6b6b' },
    { name: '士林', x: 400, y: 340, line: '#ff6b6b' },
    { name: '劍潭', x: 400, y: 390, line: '#ff6b6b' },
    { name: '圓山', x: 400, y: 440, line: '#ff6b6b' },
    { name: '民權西路', x: 350, y: 440, line: '#ff6b6b' },
    { name: '雙連', x: 300, y: 440, line: '#ff6b6b' },
    { name: '中山', x: 250, y: 440, line: '#ff6b6b' },
    { name: '台北車站', x: 200, y: 440, line: '#ff6b6b' },
    { name: '台大醫院', x: 150, y: 440, line: '#ff6b6b' },
    { name: '中正紀念堂', x: 100, y: 440, line: '#ff6b6b' },
    { name: '東門', x: 50, y: 440, line: '#ff6b6b' },
    { name: '大安森林公園', x: 50, y: 390, line: '#ff6b6b' },
    { name: '大安', x: 50, y: 340, line: '#ff6b6b' },
    { name: '信義安和', x: 50, y: 290, line: '#ff6b6b' },
    { name: '台北101/世貿', x: 50, y: 240, line: '#ff6b6b' },
    { name: '象山', x: 50, y: 190, line: '#ff6b6b' },
];

const TaipeiMRTMap = () => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station);
    };

    return (
        <div className="relative w-full h-full bg-blue-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 450 490">
                {/* Draw the line first, behind the stations */}
                <path
                    d="M50 50 H350 Q400 50 400 100 V440 H50 V190"
                    fill="none"
                    stroke="#ff6b6b"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {stations.map((station, index) => (
                    <g key={index} onClick={() => handleStationClick(station)}>
                        <circle
                            cx={station.x}
                            cy={station.y}
                            r="30"
                            fill={station.line}
                            stroke="white"
                            strokeWidth="3"
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
                ))}
            </svg>
            {selectedStation && (
                <div className="absolute top-4 left-4 bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-bold">{selectedStation.name}</h2>
                    <p>Line: Red Line</p>
                </div>
            )}
        </div>
    );
};

export default TaipeiMRTMap;