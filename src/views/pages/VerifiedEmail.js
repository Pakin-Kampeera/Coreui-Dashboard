import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios-data";

const VerifiedEmail = () => {
  const [data, setData] = useState("");

  const params = useParams();

  useEffect(() => {
    try {
      try {
        const verifiedToken = async () => {
          const { data } = await axios.put(
            `api/auth/verifiedEmail/${params.token}`
          );
          setData(data.data);
        };

        verifiedToken();
      } catch (error) {
        setData(data.data);
      }
    } catch (error) {
      console.log("Can not connect to database");
    }
  }, [data, params.token]);

  return (
    <>
      <h1>{data}</h1>
    </>
  );
};

export default VerifiedEmail;
