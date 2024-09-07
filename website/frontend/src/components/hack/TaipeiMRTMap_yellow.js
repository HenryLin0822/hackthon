import React, { useState } from 'react';

const stations = [
    // Left side (top to bottom)
    { name: '大橋頭', x: 50, y: 50 },
    { name: '中山國小', x: 50, y: 100 },
    { name: '行天宮', x: 50, y: 150 },
    { name: '松江南京', x: 50, y: 200 },
    { name: '忠孝新生', x: 50, y: 250 },
    { name: '東門', x: 50, y: 300 },
    { name: '古亭', x: 50, y: 350 },
    { name: '頂溪', x: 50, y: 400 },
    // Bottom side (left to right)
    { name: '永安市場', x: 100, y: 400 },
    { name: '景安', x: 150, y: 400 },
    { name: '南勢角', x: 200, y: 400 },
    { name: '輔大', x: 250, y: 400 },
    { name: '丹鳳', x: 300, y: 400 },
    { name: '迴龍', x: 350, y: 400 },
    // Right side (bottom to top)
    { name: '新莊', x: 350, y: 350 },
    { name: '頭前庄', x: 350, y: 300 },
    { name: '先嗇宮', x: 350, y: 250 },
    { name: '三重', x: 350, y: 200 },
    { name: '菜寮', x: 350, y: 150 },
    { name: '台北橋', x: 350, y: 100 },
    // Top side (right to left)
    { name: '三重國小', x: 300, y: 50 },
    { name: '三和國中', x: 250, y: 50 },
    { name: '徐匯中學', x: 200, y: 50 },
    { name: '三民高中', x: 150, y: 50 },
    { name: '蘆洲', x: 100, y: 50 },
];

const TaipeiMRTYellowLineMap = ({ onStationSelect }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationClick = (station) => {
        setSelectedStation(station.name);
        onStationSelect(station.name);
    };

    // Generate path data based on stations
    const generatePathData = () => {
        let pathData = `M${stations[0].x} ${stations[0].y}`;
        for (let i = 1; i < stations.length; i++) {
            pathData += ` L${stations[i].x} ${stations[i].y}`;
        }
        return pathData;
    };

    return (
        <div className="relative w-full h-full bg-yellow-100 p-4 rounded-lg">
            <svg width="100%" height="100%" viewBox="0 0 400 450">
                {/* Main line */}
                <path
                    d={generatePathData()}
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
                            r="18"
                            fill={selectedStation?.name === station.name ? '#cca000' : '#ffd800'}
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

export default TaipeiMRTYellowLineMap;
