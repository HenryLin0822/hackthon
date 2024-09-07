import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Typography, Box, CircularProgress } from "@mui/material";

const ShowData = ({ endpoint }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(endpoint)
      .then((res) => {
        setData(res.data.number);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Data from {endpoint}:
      </Typography>
      <Typography variant="body1">
        {data}
      </Typography>
    </Box>
  );
};

export default ShowData;