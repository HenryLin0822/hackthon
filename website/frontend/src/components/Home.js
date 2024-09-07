import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Box, Typography, Grid, Paper, TextField, IconButton, List, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TaipeiMRTMap from "./hack/TaipeiMRTMap_red";
import MRTMapMerge from "./hack/MRTMapMerge";
import "./Home.css";
import ChartA from "./hack/ChartA";

// Define your MRT stations list
const MRT_STATIONS = [
  "淡水", "紅樹林", "竹圍", "關渡", "忠義", "復興崗", "北投", "新北投", "奇岩", "唭哩岸", "石牌", "明德", "芝山", "士林", "劍潭", "圓山", "民權西路", "雙連", "中山", "台北車站", "台大醫院", "中正紀念堂", "東門", "大安森林公園", "大安", "信義安和", "台北101/世貿", "象山",

  "頂埔", "永寧", "土城", "海山", "亞東醫院", "府中", "板橋", "新埔", "江子翠", "龍山寺", "西門", "台北車站", "善導寺", "忠孝新生", "忠孝復興", "忠孝敦化", "國父紀念館", "市政府", "永春", "後山埤", "昆陽", "南港", "南港展覽館",

  "新店", "新店區公所", "七張", "大坪林", "景美", "萬隆", "公館", "台電大樓", "古亭", "中正紀念堂", "小南門", "西門", "北門", "中山", "松江南京", "南京復興", "台北小巨蛋", "南京三民", "松山",
  "蘆洲", "三民高中", "徐匯中學", "三和國中", "三重國小", "菜寮", "台北橋", "大橋頭", "中山國小", "行天宮", "松江南京", "南京復興", "忠孝新生", "東門", "古亭", "台電大樓", "公館", "萬隆", "景美", "大坪林", "七張", "新店區公所", "新店",

  "南港展覽館", "南港軟體園區", "東湖", "葫洲", "大湖公園", "內湖", "文德", "港墘", "西湖", "劍南路", "大直", "松山機場", "中山國中", "南京復興", "忠孝復興", "大安", "科技大樓", "六張犁", "麟光", "辛亥", "萬芳醫院", "萬芳社區", "木柵", "動物園"
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
            animation: `typing 4s , blink-caret 0.75s step-end infinite`,
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
            '@keyframes typing': {
              from: { width: "0%" },
              to: { width: "65%" }
            },
            '@keyframes blink-caret': {
              '50%': { borderColor: "transparent" }
            }
          }}
        >
          roaMRT
        </Typography>

        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={6}>
            <ChartA />
          </Grid> */}
          <Grid item xs={12}>
            <Paper
              component="form"
              className="search-bar" // Apply fade-in animation
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
              className="mrt-map" // Apply fade-in animation
              sx={{
                marginRight: "10px",
                marginLeft: "10px",
                height: "400px",
              }}
            >
              <MRTMapMerge onStationSelect={handleStationSelect} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
