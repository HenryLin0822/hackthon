import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Grid, Paper, InputBase, Divider, TextField } from "@mui/material";
import ShowData from "./ShowData";
import GoogleMap from "./GoogleMap";
import ShowDataA from "./ShowDataA";
import ShowDataB from "./ShowDataB";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Chatbot from "./ChatBot";
import TaipeiMRTMap from "./TaipeiMRTMap";

const MrtStation = () => {
  const [data, setData] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (selectedStation) {
      setSearchQuery(selectedStation.name);
    }
  }, [selectedStation]);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container component="main" disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h2" gutterBottom
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          MrtStation
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
                    backgroundColor: 'background.paper', // 使用调色板中的背景颜色
                    borderRadius: '12px', // 圆角
                    boxShadow: 3, // 阴影效果
                    transition: 'transform 0.3s ease-in-out', // 鼠标悬停时的过渡效果
                    '&:hover': {
                      transform: 'scale(1.05)', // 鼠标悬停时放大
                      boxShadow: 10, // 增加阴影
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
                    backgroundColor: 'background.paper', // 使用调色板中的背景颜色
                    borderRadius: '12px', // 圆角
                    boxShadow: 3, // 阴影效果
                    transition: 'transform 0.3s ease-in-out', // 鼠标悬停时的过渡效果
                    '&:hover': {
                      transform: 'scale(1.05)', // 鼠标悬停时放大
                      boxShadow: 10, // 增加阴影
                    },
                  }}
                >
                  <ShowDataB />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <Chatbot />
            </Box>
          </Grid>
        </Grid>

        <img
          src="/banner.jpg"
          alt="Avengers"
          style={{
            maxWidth: "100%",
            userSelect: "none",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
      </Box>
    </Container>
  );
};

export default MrtStation;
