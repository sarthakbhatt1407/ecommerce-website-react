import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BrandProductsPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [cmpny, setCmpny] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/${pathname}.json`
      );
      const data = await res.json();
      const arr = [];
      for (const item in data) {
        arr.push(data[item]);
      }
      console.log(arr);
    };
    fetcher();
  }, []);
  return <div></div>;
};

export default BrandProductsPage;
