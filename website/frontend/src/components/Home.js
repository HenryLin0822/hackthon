import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Grid, Paper, InputBase, Divider, TextField } from "@mui/material";
import ShowData from "./hack/ShowData";
import GoogleMap from "./hack/GoogleMap";
import ShowDataA from "./hack/ShowDataA";
import ShowDataB from "./hack/ShowDataB";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Chatbot from "./hack/ChatBot";
import TaipeiMRTMap from "./hack/TaipeiMRTMap";

const Home = () => {
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
          roaMRT
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: "32px",
                margin: "30px 40px",
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search MRT Station"
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: '32px',
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '32px',
                  },
                }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
                height: "350px",
              }}
            >
              <GoogleMap />
            </Box>
          </Grid>

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
                    background: "#7edaf7",
                    marginTop: "5px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    height: "190px",
                    width: "auto",
                    maxWidth: "100%",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none"
                    },
                    borderRadius: "8px",
                  }}
                >
                  <ShowDataA />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    background: "#7edaf7",
                    marginTop: "5px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    height: "190px",
                    width: "auto",
                    maxWidth: "100%",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none"
                    },
                    borderRadius: "8px",
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

export default Home;
