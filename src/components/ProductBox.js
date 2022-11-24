import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
const MainBox = styled.div`
  display: grid;
  border-bottom: 1px solid #dedede;
  grid-template-columns: 1fr 3fr;
  padding: 2rem 1rem;
  justify-content: center;
  @media (max-width: 450px) {
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
  }
`;

const ImgBox = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const TextBox = styled.div`
  display: flex;
  padding: 1rem 2rem;
  @media (max-width: 450px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
  }

  h4 {
    span {
      color: #c4c4c4;
      text-decoration: line-through;
      display: none;
      @media (max-width: 450px) {
        display: inline;
      }
    }
    @media (max-width: 450px) {
      font-size: 1rem;
    }
  }

  p {
    font-weight: 500;
    display: flex;
    flex-direction: column;
    letter-spacing: 0.04rem;
    margin-right: auto;
    font-size: 1.2rem;
    gap: 2rem;
    span {
      color: #c4c4c4;
      font-size: 1rem;
      letter-spacing: 0.03rem;
      @media (max-width: 450px) {
        display: none;
      }
      @media only screen and (min-width: 451px) and (max-width: 1020px) {
      }
    }
    @media (max-width: 450px) {
      font-size: 0.9rem;
    }
  }
`;
const ProductBox = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { name, id, storage, ram, productimg, price, desc, images, processor } =
    props.item;
  console.log(productimg);
  const imagesarr = productimg.split(",");

  return (
    <Link to={`${pathname}/${id}`}>
      <MainBox id={id}>
        <ImgBox img={imagesarr[0]}></ImgBox>
        <TextBox>
          <p>
            {`${name} ${processor} (${ram}, ${storage})`}
            <span>{desc}</span>
          </p>
          <h4>
            <span>
              {" "}
              {parseInt(Math.random() * price + price).toLocaleString("en-IN")}
            </span>{" "}
            &#8377;
            {price.toLocaleString("en-IN")}
          </h4>
        </TextBox>
      </MainBox>
    </Link>
  );
};

export default ProductBox;
