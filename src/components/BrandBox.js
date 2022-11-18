import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "animate.css";
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
  &:hover {
    box-shadow: 0.2rem 0.2rem 0.4rem #b40e0e;
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
  img {
    width: 25%;
    display: inline-block;
    @media (max-width: 450px) {
      width: 30%;
    }
    @media (max-height: 550px) {
      width: 15%;
    }
    @media only screen and (min-width: 451px) and (max-width: 1020px) {
      /* width: 35%; */
      /* width: 35%; */
    }
  }
`;

const BrandBox = (props) => {
  const item = props.item;
  const [brandLogo, setBrandLogo] = useState("");
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com${props.pathname}/${item}.json`
      );
      const data = await res.json();
      for (const item in data) {
        setBrandLogo(data[item]["logo"]);
      }
    };
    fetcher();
  }, []);
  return (
    <>
      <MainBox>
        <img src={brandLogo} alt="" />
        <h3>{item}</h3>
      </MainBox>
    </>
  );
};

export default BrandBox;
