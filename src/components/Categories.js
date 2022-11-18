import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "animate.css";
const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  position: relative;
  height: 40vh;
  transition: all 0.4s;
  animation: fadeIn;
  animation-duration: 1s;
  @media (max-width: 450px) {
    width: 94%;
    margin: auto;
    height: 27vh;
  }
  @media only screen and (min-width: 970px) and (max-width: 1020px) {
    height: 25vh;
    width: 32%;
  }
  @media only screen and (min-width: 1021px) and (max-width: 1320px) {
    height: 31vh;
    width: 32%;
  }
  @media only screen and (min-width: 1321px) and (max-width: 1560px) {
    height: 40vh;
    width: 30%;
  }
  @media only screen and (min-width: 700px) and (max-width: 969px) {
    height: 30vh;
    width: 49%;
  }
  @media only screen and (min-width: 651px) and (max-width: 699px) {
    height: 27vh;
    width: 49%;
  }
  @media only screen and (min-width: 451px) and (max-width: 650px) {
    height: 22vh;
    width: 49%;
  }
  &::before {
    content: "";
    position: absolute;
    background-image: url(${(props) => props.imgUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    top: 0;
    left: 0;
    border-radius: 0.4rem;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.9;
  }
  &:hover {
    transform: scale(1.05);
    button {
      background-color: black;
      color: white;
    }

    &::before {
      opacity: 0.8;
    }
  }
  h3 {
    color: white;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: 0.15rem;
  }
`;
const ShopNowBtn = styled.button`
  background-color: white;
  padding: 0.17rem 0.7rem;
  color: black;
  border: none;
  border-radius: 0.3rem;
  font-weight: 600;
`;

const Categories = (props) => {
  const { category, imgUrl } = props.item;
  return (
    <CategoryBox imgUrl={imgUrl}>
      <h3>{category}</h3>

      <Link to={`/products/${category}`}>
        <ShopNowBtn>Shop Now</ShopNowBtn>
      </Link>
    </CategoryBox>
  );
};

export default Categories;
