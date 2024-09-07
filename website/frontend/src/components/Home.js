import React from "react";
import { Container, Box, Typography, Grid, Paper} from "@mui/material";
import ShowData from "./hack/ShowData";
import GoogleMap from "./hack/GoogleMap";

const Home = () => {
  return (
    <Container component="main" disableGutters>
      <Box
        sx={{
          // height: "100vh", // Full viewport height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #7edaf7, #FFFFFF)",
        }}
      >

        <Typography variant="h2" gutterBottom>
          EAT SHIT
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                background: "#ADD8E6", // Light blue background
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",          // Text color inside the box
                fontSize: "24px",       // Font size
                borderRadius: "16px",   // Rounded corners
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow effect
                margin: "20px 0",      // Margin to create space around the Box
              }}
            >
              <GoogleMap/>
            </Box>

          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                background: "#ADD8E6", // Light blue background
              }}
            >
              Content inside the Box
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
                sx={{
                  background: "#abc324", // Light blue background
                }}
              >
                Content inside the Box
              </Box>
          </Grid>
        </Grid>
        
        <ShowData />
        <img
          src="/banner.jpg"
          alt="Avengers"
          style={{
            maxWidth: "100%",
            userSelect: "none",
            marginTop: "20px",
          }}
        />
        <img
          src="/banner.jpg"
          alt="Avengers"
          style={{
            maxWidth: "100%",
            userSelect: "none",
            marginTop: "20px",
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
