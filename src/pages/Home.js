import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import styled from "styled-components";

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: 450px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    gap: 0.5rem;
  }
`;

const Home = () => {
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
    </>
  );
};

export default Home;
