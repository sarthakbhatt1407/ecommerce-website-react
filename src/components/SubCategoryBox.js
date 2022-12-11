import React, { useEffect } from "react";
import styled from "styled-components";
const MainBox = styled.div`
  border: 1px solid red;
  height: 20vh;
  display: flex;
  justify-content: center;
  border-radius: 0.4rem;
  align-items: center;
  border: 1px solid #eeeeee;
  animation: fadeIn;
  animation-duration: 1s;
  box-shadow: 0.2rem 0.2rem 0.4rem #cccccc;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.02);
  }
  @media (max-width: 450px) {
    flex-direction: column;
    padding-bottom: 1rem;
  }
  @media (max-height: 600px) {
    height: 30vh;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
  }
  h3 {
    text-transform: capitalize;
    display: inline-block;
    @media (max-width: 450px) {
    }
    @media only screen and (min-width: 451px) and (max-width: 1020px) {
    }
  }
`;

const SubCategoryBox = (props) => {
  const pathname = props.pathname;
  const item = props.item;
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
    };
    fetcher();
  }, []);
  return (
    <MainBox>
      <h3>{item}</h3>
    </MainBox>
  );
};

export default SubCategoryBox;
