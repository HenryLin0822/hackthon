import React, { useState } from 'react';

const stations = [
    { name: '南勢角', x: 50, y: 450 },
    { name: '景安', x: 100, y: 450 },
    { name: '永安市場', x: 150, y: 450 },
    { name: '頂溪', x: 200, y: 450 },
    { name: '古亭', x: 250, y: 400 },
    { name: '東門', x: 300, y: 350 },
    { name: '忠孝新生', x: 350, y: 300 },
    { name: '松江南京', x: 400, y: 250 },
    { name: '行天宮', x: 450, y: 200 },
    { name: '中山國小', x: 500, y: 150 },
    { name: '大橋頭', x: 550, y: 100 },
    { name: '台北橋', x: 600, y: 50 },
    { name: '菜寮', x: 650, y: 50 },
    { name: '三重', x: 700, y: 50 },
    { name: '先嗇宮', x: 750, y: 50 },
    // Branch point
    { name: '頭前庄', x: 750, y: 100 },
    // Luzhou branch
    { name: '新莊', x: 700, y: 100 },
    { name: '輔大', x: 650, y: 100 },
    { name: '丹鳳', x: 600, y: 100 },
    { name: '迴龍', x: 550, y: 100 },
    // Xinzhuang branch
    { name: '三重國小', x: 750, y: 150 },
    { name: '三和國中', x: 750, y: 200 },
    { name: '徐匯中學', x: 750, y: 250 },
    { name: '三民高中', x: 750, y: 300 },
    { name: '蘆洲', x: 750, y: 350 },
];

const TaipeiMRTYellowLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station);
        onStationSelect(station);
    };

    return (
        <div className="relative w-full h-full bg-yellow-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 800 500">
                <path
                    d="M50 450 H200 Q250 450 250 400 Q250 300 350 300 Q450 300 550 100 H750"
                    fill="none"
                    stroke="#ffd800"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Luzhou branch */}
                <path
                    d="M750 50 V100 H550"
                    fill="none"
                    stroke="#ffd800"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Xinzhuang branch */}
                <path
                    d="M750 100 V350"
                    fill="none"
                    stroke="#ffd800"
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
                            fill={selectedStation?.name === station.name ? '#cca000' : '#ffd800'}
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

export default TaipeiMRTYellowLineMap;