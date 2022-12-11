import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import SubCategoryBox from "../../components/SubCategoryBox";
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
  /* padding: 0.2rem 1rem; */
`;

const ProductSubCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const [products, setProducts] = useState([]);
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
      setProducts(arr);
      setIsLoading(false);
    };
    fetcher();
  }, []);
  return (
    <OuterBox>
      <PageMainHeading>Shop By Category</PageMainHeading>
      <MainBox>
        {isLoading && <Loader />}

        {products.map((item) => {
          return (
            <Link key={item} to={`${pathname}/${item}`}>
              <SubCategoryBox pathname={pathname} item={item} />
            </Link>
          );
        })}
      </MainBox>
    </OuterBox>
  );
};

export default ProductSubCategory;
