import React, { useState, useContext , useEffect} from "react";
import axios from "../axios";
import { Typography } from "@mui/material";

const ShowDataA = () => {
    const [data, setData] = useState(-1);

    useEffect(() => {
        axios
          .get("/getDataG")
          .then((res) => {
            setData(res.data.number);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

  return (
    <div>
      <Typography
        variant="body"
        gutterBottom
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "white", // 设置字体颜色为白色
          fontWeight: "bold", // 设置字体为粗体
        }}
      >
        站點介紹：
      </Typography>
      <br/>
      <Typography
        variant="body"
        gutterBottom
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "white", // 设置字体颜色为白色
        }}
      >
        {data}
      </Typography>
    </div>
  );
};

export default ShowDataA;
