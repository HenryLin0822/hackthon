import React, { useState, useContext , useEffect} from "react";
import axios from "./axios";

const ShowData = () => {
    const [data, setData] = useState(-1);

    useEffect(() => {
        axios
          .get("/getData")
          .then((res) => {
            setData(res.data.number);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

  return (
    <div>
      <h1>Current Number: {data}</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
};

export default ShowData;
