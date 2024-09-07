import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get route params
import { Container, Box, Typography, Grid } from "@mui/material";
import ShowDataA from "./ShowDataA";
import ShowDataB from "./ShowDataB";
import Chatbot from "./ChatBot";
import TaipeiMRTMap from "./TaipeiMRTMap_red";

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
            animation: `typing 5s , blink-caret 0.75s step-end infinite`,
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Add shadow to the text
            '@keyframes typing': {
              from: { width: "1%" },
              to: { width: "70%" }
            },
            '@keyframes blink-caret': {
              '50%': { borderColor: "transparent" }
            }
          }}
        >
          MrtStation
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ marginTop: "20px", marginBottom: "20px" }}>
          {selectedStation ? `${selectedStation} MRT Station` : "MRT Station"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
                height: "400px",
              }}
            >
              <TaipeiMRTMap onStationSelect={handleStationSelect} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "200px",
                    width: "auto",
                    maxWidth: "100%",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none"
                    },
                    margin: '20px auto',
                    padding: '20px',
                    backgroundColor: 'background.paper', 
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

              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "200px",
                    width: "auto",
                    maxWidth: "100%",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none"
                    },
                    margin: '20px auto',
                    padding: '20px',
                    backgroundColor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 10,
                    },
                  }}
                >
                  <ShowDataB />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px", marginRight: "10px" }}>
              <Chatbot />
            </Box>
          </Grid>
        </Grid>

      </Box>
    </Container>
  );
};

export default MrtStation;
