import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 3rem 0;
  @media (max-width: 450px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    gap: 0.5rem;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/categories.json"
      );
      const data = await res.json();
      const arr = [];
      for (const item in data) {
        arr.push(data[item]);
      }
      setCategories(arr);
      const localStr = JSON.parse(localStorage.getItem("state"));
      if (localStr) {
        dispatch({ type: "reload", item: { ...localStr } });
      }
    };
    fetcher();
  }, []);
  return (
    <>
      <Slider />
      <CategoryBox>
        {categories.map((item) => {
          return <Categories key={item.category} item={item} />;
        })}
      </CategoryBox>
      {categories.length > 0 && <Footer />}
    </>
  );
};

export default Home;
