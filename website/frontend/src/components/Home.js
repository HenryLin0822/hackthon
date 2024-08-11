import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
// import image from "../banner.jpg";
//put an great made after effect intro video!!
import axios from "axios";
import { useState } from "react";
import ShowData from "./ShowData";


const Home = () => {
  return (
    <Container component="main">
      <Box
        sx={{
          height: "100px",
          marginTop: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      />

      <ShowData />

      <img
        src="/banner.jpg"
        alt="Avengers"
        style={{
          maxWidth: "100%",
          userSelect: "none",
        }}
      />
    </Container>
  );
};

export default Home;
