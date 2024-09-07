import React, { useState } from "react";
import { Container, Box, Typography, Grid, Paper, InputBase, Divider } from "@mui/material";
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

  return (
    <Container component="main" disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7edaf7, #FFFFFF)",
          minHeight: "100vh", // Ensure full viewport height
        }}
      >
        <Typography variant="h2" gutterBottom
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          EAT SHIT
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                marginRight: "40px",
                marginLeft: "40px",
                borderRadius: "32px",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
                height: "300px", // Reduced height
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
              <TaipeiMRTMap />
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