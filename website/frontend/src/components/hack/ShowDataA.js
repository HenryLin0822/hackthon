import React, { useState, useContext , useEffect} from "react";
import axios from "../axios";
import { Typography } from "@mui/material";

const ShowDataA = () => {
    const [data, setData] = useState(-1);

    useEffect(() => {
        axios
          .get("/getDataA")
          .then((res) => {
            setData(res.data.number);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

  return (
    <div>
      <Typography variant="body1">
        {data}
      </Typography>
    </div>
  );
};

export default ShowDataA;
