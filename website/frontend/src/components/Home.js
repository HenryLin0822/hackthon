import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Box, Typography, Grid, Paper, TextField, IconButton, List, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TaipeiMRTMap from "./hack/TaipeiMRTMap";
import "./Home.css";

// Define your MRT stations list
const MRT_STATIONS = [
  "淡水", "紅樹林", "竹圍", "關渡", "忠義", "復興崗", "北投", "新北投", "奇岩", "唭哩岸",
  "石牌", "明德", "芝山", "士林", "劍潭", "圓山", "民權西路", "雙連", "中山", "台北車站",
  "台大醫院", "中正紀念堂", "東門", "大安森林公園", "大安", "信義安和", "台北101/世貿", "象山",
  "松山", "南京三民", "中華", "行天宮", "劍南路", "台電大樓", "公館", "江子翠", "三峽", "永和",
  "中和", "輔大", "板橋", "台北市政府", "古亭", "雙和", "南港", "南港展覽館", "大坪林", "景美",
  "七張", "木柵", "萬芳醫院", "萬芳社區", "萬芳", "貓空", "九份子", "蘆洲", "三民", "三和",
  "國父紀念館", "內湖", "東湖", "頂埔", "土城", "捷運永和", "新店", "小碧潭", "新埔",
  "丹鳳", "迴龍", "三重", "菜寮", "台北橋", "大橋頭", "中山國小", "三民高中", "徐匯中學",
  "三重國小", "新店區公所", "萬隆"
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const [borderColor, setBorderColor] = useState("#ccc");
  const [selectedStation, setSelectedStation] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (searchQuery) {
      const matches = MRT_STATIONS.filter(station => station.includes(searchQuery));
      setFilteredStations(matches);
      // setBorderColor(matches.includes(searchQuery) ? "#ccc" : "red");
    } else {
      setFilteredStations([]);
      // setBorderColor("#ccc");
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStationSelect = (station) => {
    setSearchQuery(station);
    setSelectedStation(station);
    setFilteredStations([]);
    // setBorderColor("#ccc");
    // navigate(`/mrtstation/${station}`); // Navigate to /mrtstation with the station name
  };

  const naviToPage = (station) => {
    //if the mrt station is in the list, navigate to the page
    if (MRT_STATIONS.includes(station)) {
      navigate(`/mrtstation/${station}`);
    }
    else{
      alert("Invalid MRT Station");
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
            color: "#FFFFFF",
            marginTop: "40px",
            marginBottom: "1px",
            fontSize: "4rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "fit-content",
            animation: `typing 5s , blink-caret 0.75s step-end infinite`,
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
            '@keyframes typing': {
              from: { width: "1%" },
              to: { width: "75%" }
            },
            '@keyframes blink-caret': {
              '50%': { borderColor: "transparent" }
            }
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
                margin: "30px 30px",
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                zIndex: 2,
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
                  zIndex: 3,
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '32px',
                  },
                }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon
                  onClick={() => naviToPage(searchQuery)} 
                />
              </IconButton>
            </Paper>

            {filteredStations.length > 0 && (
              <Box
                sx={{
                  borderRadius: "24px",
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  maxWidth: "100%",
                  marginRight: "30px",
                  marginLeft: "30px",
                  marginTop: "-20px",
                  backgroundColor: 'white',
                }}
              >
                <List>
                  {filteredStations.map((station, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleStationSelect(station)}
                    >
                      {station}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
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
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
