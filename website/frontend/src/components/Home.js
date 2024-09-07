import React from "react";
import { Container, Box, Typography, Grid, Paper} from "@mui/material";
import ShowData from "./hack/ShowData";
import GoogleMap from "./hack/GoogleMap";
import ShowDataA from "./hack/ShowDataA";
import ShowDataB from "./hack/ShowDataB";

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
          background: "linear-gradient(135deg, #7edaf7, #FFFFFF)",
        }}
      >

        <Typography variant="h3" gutterBottom>
          EAT SHIT
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              <GoogleMap/>
            </Box>

          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #FFFFFF, #7edaf7)",
                marginTop: "5px",
                marginLeft: "10px",
                marginRight: "3px",
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Soft shadow
                height: "50vh",
                width: "auto", // Adjust width as needed
                maxWidth: "100%", // Prevent overflow beyond parent container
                overflowY: "scroll", // Enable vertical scrolling
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For Internet Explorer and Edge
                "&::-webkit-scrollbar": {
                  display: "none" // For WebKit browsers (Chrome, Safari)
                },
                borderRadius: "8px", // Rounded corners
              }}
            >
              <ShowDataA/>
            </Box>

          </Grid>
          <Grid item xs={6}>
            <Box
                sx={{
                  background: "linear-gradient(135deg, #FFFFFF, #7edaf7)",
                  marginTop: "5px",
                  marginLeft: "3px",
                  marginRight: "10px",
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Soft shadow
                  height: "50vh",
                  width: "auto", // Adjust width as needed
                  maxWidth: "100%", // Prevent overflow beyond parent container
                  overflowY: "scroll", // Enable vertical scrolling
                  scrollbarWidth: "none", // For Firefox
                  msOverflowStyle: "none", // For Internet Explorer and Edge
                  "&::-webkit-scrollbar": {
                    display: "none" // For WebKit browsers (Chrome, Safari)
                  },
                  borderRadius: "8px", // Rounded corners
                }}
              >
                <ShowDataB/>
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
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
