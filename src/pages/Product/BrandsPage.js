import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import BrandBox from "../../components/BrandBox";
const PageMainHeading = styled.h2`
  text-align: center;
`;
const MainBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  a {
    display: block;
    width: 400px;
  }
  /* padding: 0.2rem 1rem; */
`;

const BrandsPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/${pathname}.json`
      );
      const data = await res.json();
      // console.log(data);
      const arr = [];
      for (const item in data) {
        arr.push(item);
      }
      setBrands(arr);
    };
    fetcher();
  }, []);
  return (
    <>
      <PageMainHeading>Shop By Brand</PageMainHeading>
      <MainBox>
        {brands.map((item) => {
          return (
            <Link key={item} to={`${pathname}/${item}`}>
              <BrandBox pathname={pathname} item={item} />
            </Link>
          );
        })}
      </MainBox>
    </>
  );
};

export default BrandsPage;
// https://i.ibb.co/5cV2Gt6/apple.png
// https://i.ibb.co/GdNR935/samsung.png
