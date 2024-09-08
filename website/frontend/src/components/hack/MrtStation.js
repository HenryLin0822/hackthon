import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get route params
import { Container, Box, Typography, Grid } from "@mui/material";
import ShowDataA from "./ShowDataA";
import ShowDataB from "./ShowDataB";
import Chatbot from "./ChatBot";
import GoogleMap from "./GoogleMap";
import ChartA from "./ChartA";
import ChartA from "./ChartA";

const MRT_STATIONS = [
  "淡水", "紅樹林", "竹圍", "關渡", "忠義", "復興崗", "北投", "新北投", "奇岩", "唭哩岸",
  "石牌", "明德", "芝山", "士林", "劍潭", "圓山", "民權西路", "雙連", "中山", "台北車站",
  "台大醫院", "中正紀念堂", "東門", "大安森林公園", "大安", "信義安和", "台北101/世貿", "象山",
  // ... other MRT stations
];

const MrtStation = () => {
  const { stationName } = useParams(); // Get the MRT station name from the route parameter
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState(stationName || ""); // Initialize with stationName if it exists

  // Set the selected station based on the route param
  useEffect(() => {
    if (stationName && MRT_STATIONS.includes(stationName)) {
      setSelectedStation(stationName);
      setSearchQuery(stationName);
    } else {
      setSelectedStation(null); // Clear if not found
    }
  }, [stationName]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setSearchQuery(station); // Update the search query when a station is selected
  };

  const getStationText = (station) => {
    switch(station){
      case "中正紀念堂":
        return "今日進出站人次預測: 12764人 寬敞";
      case "動物園":
        return "今日進出站人次預測: 2917人 普通";
      case "北門":
        return "今日進出站人次預測: 8816人 普通";
      case "台北101世貿":
        return "今日進出站人次預測: 32045人 普通";
      case "國父紀念館":
        return "今日進出站人次預測: 17847人 寬敞";
      case "士林":
        return "今日進出站人次預測: 9618人 寬敞";
      case "大安森林公園":
        return "今日進出站人次預測: 5661人 寬敞";
      case "小南門":
        return "今日進出站人次預測: 5261人 普通";
      case "西門":
        return "今日進出站人次預測: 38469人 寬敞";
      case "龍山寺":
        return "今日進出站人次預測: 11914人 寬敞";
      
      default:
        return "請選擇一個站點以查看今日進出站人次預測"
    }
  }
  return (
    <Container component="main" disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "30vh",
        }}
      >
        <Typography variant="h1" gutterBottom
          sx={{
            color : "#FFFFFF",
            marginTop: "40px",
            marginBottom: "1px",
            fontSize: "4rem", // Adjust the font size as needed
            fontWeight: "bold", // Bold text
            whiteSpace: "nowrap", // Prevent text from wrapping
            overflow: "hidden", // Hide overflow during typing effect
            // borderRight: ".05em solid black", // Cursor effect
            width: "fit-content", // Ensure it only takes up the necessary width
            animation: `typing ${selectedStation? selectedStation.length * 0.5 : 5}s , blink-caret 0.75s step-end infinite`,
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Add shadow to the text
            '@keyframes typing': {
              from: { width: "0%" },
              to: { width: "75%" }
            },
            '@keyframes blink-caret': {
              '50%': { borderColor: "transparent" }
            }
          }}
        >
          {selectedStation ? `${selectedStation}站` : "MRT Station"}
        </Typography>
        <br/>
        <Typography 
          variant="h3" // MUI 中有效的 variant，如 body1 或 body2
          gutterBottom
          sx={{
            color: "#FFFFFF",
            fontSize: "1rem", // 根据需要调整字体大小
            fontWeight: "bold", // 粗体
            letterSpacing: "0.1rem",
            padding: "5px",
            animation: `fadeIn ${selectedStation? selectedStation.length * 0.5 : 5}s ease-in-out`, // 动画名称和持续时间
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // 添加文字阴影效果
            backdropFilter: "blur(5px)",
            "@keyframes fadeIn": {
              from: { opacity: 0 }, // 动画从透明开始
              to: { opacity: 1 }, // 动画结束时完全可见
            },
          }}
        >
          {getStationText(selectedStation)}
        </Typography>

        <Grid container spacing={2} direction="column">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
                // height: "400px",
              }}
            >
              <GoogleMap searchQuery={selectedStation}/>
            </Box>
          </Grid>

          {/* display is stationName == 大安森林公園 */}
          {selectedStation === "大安森林公園" && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  marginRight: "10px",
                  marginLeft: "10px",
                  // height: "400px",
                }}
              >
                <ChartA />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sx={{display: "flex",justifyContent: "center", alignItems: "center",}}>
            <Box
              sx={{
                height: "200px",
                width: "auto",
                maxWidth: "80%",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none"
                },
                padding: '20px',
                backgroundColor: "rgba(51, 51, 51, 0.5)",
                borderRadius: '12px', 
                boxShadow: 3, 
                transition: 'transform 0.3s ease-in-out', 
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 10, 
                },
              }}
            >
              <ShowDataA />
            </Box>
          </Grid>

          <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center",}}>
            <ChartA/>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px", marginRight: "10px" }}>
              <Chatbot stationName={stationName} />
            </Box>
          </Grid>
        </Grid>

      </Box>
    </Container>
  );
};

export default MrtStation;
