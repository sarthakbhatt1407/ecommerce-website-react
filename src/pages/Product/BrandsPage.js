import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import BrandBox from "../../components/BrandBox";
import Loader from "../../components/Loader";
const OuterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
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
`;
const Input = styled.input`
  background-color: #ffffff;
  border: 1px solid #c6c6c6;
  padding: 0.5rem 0.4rem;
  display: block;
  border-radius: 0.3rem;
  width: 50%;
  @media (max-width: 450px) {
    width: 70%;
  }
  margin: 0.4rem 0;
`;
const EmptyPara = styled.p`
  color: #9a9090;
  font-size: 1.2rem;
  letter-spacing: 0.17rem;
`;
const BrandsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const [brands, setBrands] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState(brands);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/${pathname}.json`
      );
      const data = await res.json();
      const arr = [];
      for (const item in data) {
        arr.push(item);
      }
      const localStr = JSON.parse(localStorage.getItem("state"));
      if (localStr) {
        dispatch({ type: "reload", item: { ...localStr } });
      }
      setBrands(arr);
      setFilteredBrand(arr);
    };
    fetcher();
  }, []);
  const onChangeHanlder = (e) => {
    setIsLoading(false);
    const val = e.target.value.toLowerCase();
    const arr = brands.filter((item) => {
      return item.includes(val);
    });
    setFilteredBrand(arr);
  };
  return (
    <OuterBox>
      <PageMainHeading>Shop By Brand</PageMainHeading>
      <Input
        type="text"
        onChange={onChangeHanlder}
        placeholder="Search Brand Name"
      />
      <MainBox>
        {!isLoading && filteredBrand.length === 0 && (
          <EmptyPara>Oopss! No Brand Found</EmptyPara>
        )}
        {isLoading && filteredBrand.length === 0 && <Loader />}
        {filteredBrand.map((item) => {
          return (
            <Link key={item} to={`${pathname}/${item}`}>
              <BrandBox pathname={pathname} item={item} />
            </Link>
          );
        })}
      </MainBox>
    </OuterBox>
  );
};

export default BrandsPage;
