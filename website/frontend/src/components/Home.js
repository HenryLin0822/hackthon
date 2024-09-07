import React, { useState } from "react";
import { Container, Box, Typography, Grid, Paper, InputBase, Divider } from "@mui/material";
import ShowDataA from "./hack/ShowDataA";
import GoogleMap from "./hack/GoogleMap";
import ShowDataB from "./hack/ShowDataB";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Chatbot from "./hack/ChatBot";

const Home = () => {
  const [data, setData] = useState("");

  // Handler for input changes
  const handleInputChange = (event) => {
    setData(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("Search value:", data);
    alert("Search value: " + data);
    // Perform the search or other actions
  };

  return (
    <Container component="main" disableGutters>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // background: "linear-gradient(135deg, #7edaf7, #FFFFFF)",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
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
              onSubmit={handleSubmit} // Handle form submission
              sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                marginRight: "40px",
                marginLeft: "40px",
                borderRadius: "32px",
                marginTop: "30px",
                marginBottom: "50px", 
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={data} // Controlled input value
                onChange={handleInputChange} // Update state on change
              />
              <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search" 
                onClick={() => handleSubmit({ preventDefault: () => {} })} // Call search function
              >
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
              }}
            >
              <GoogleMap/>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                background: "#7edaf7",
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
                background: "#7edaf7",
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

          <Grid item xs={12}>
            <Chatbot/>
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
