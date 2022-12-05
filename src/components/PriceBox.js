import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PriceBoxDiv = styled.div`
  padding: 1rem 2rem 0 0;
  border: 1px solid #c7c4c4;
  background-color: white;
  box-shadow: 0.01rem 0.01rem 0.1rem black;
  border-radius: 0.4rem;
  height: fit-content;
  p {
    border-bottom: 1px solid #d4d4d4;
    font-weight: 500;
    letter-spacing: 0.04rem;
    font-size: 1.1rem;
  }
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem 0 0;
  }
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem 0 0;
  }
  ul {
    margin-top: 1rem;
    h5 {
      display: flex;
      gap: 2rem;
      padding: 0.5rem 0;
      border-top: 1px dashed #c7c4c4;
      border-bottom: 1px dashed #c7c4c4;
      justify-content: space-around;
    }
    li {
      display: flex;
      justify-content: space-between;
      p {
        color: #4abd4a;
        font-weight: 600;
        letter-spacing: 0.05rem;
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-top: 1px dashed #d4d4d4;
        border-bottom: 1px dashed #d4d4d4;
        padding: 0.2rem 0;
        h6 {
          margin-bottom: 0;
        }
      }
    }
  }
`;
const CheckeoutAmountBox = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  padding: 1rem 0;
  margin: 0.5rem 0;

  align-items: center;
  background-color: white;
  border-radius: 0.4rem;
  @media (max-width: 450px) {
    grid-template-columns: 0fr 1fr;
    gap: 1rem;
  }
  @media only screen and (min-width: 1021px) and (max-width: 1320px) {
    grid-template-columns: 0.13fr 1fr;
  }
  @media only screen and (min-width: 650px) and (max-width: 1021px) {
    grid-template-columns: 1fr 1fr;
  }

  div {
    display: flex;
    justify-content: space-around;
    @media (max-width: 450px) {
    }
    @media only screen and (min-width: 451px) and (max-width: 615px) {
    }
    button {
      border: none;
      background-color: #fb641b;
      color: white;
      padding: 0.5rem 0.5rem;
      border-radius: 0.4rem;
      font-weight: 700;
      letter-spacing: 0.06rem;
      font-size: 0.9rem;
      @media (max-width: 450px) {
      }
      @media only screen and (min-width: 451px) and (max-width: 615px) {
      }
    }
  }
`;

const PriceBox = () => {
  const items = useSelector((state) => state.items);

  const totalAmount = useSelector((state) => state.totalAmount);
  return (
    <PriceBoxDiv>
      <ul>
        <p>Price Details</p>
        <li>
          <span>
            Price(
            {`${items.length} ${items.length > 1 ? "items" : "item"}`})
          </span>
          <p>&#8377; {totalAmount.toLocaleString("en-IN")}</p>
        </li>
        <li>
          <span>Delivery Charge</span>
          <p>Free</p>
        </li>
        <li>
          <div>
            <h6>Total Amount</h6>
            <h6> &#8377; {totalAmount.toLocaleString("en-IN")}</h6>
          </div>
        </li>
      </ul>
      <CheckeoutAmountBox>
        <div></div>
        <div>
          <Link to="/">
            <button>Continue Shopping</button>
          </Link>
          <Link to="/checkout">
            <button>Checkout</button>
          </Link>
        </div>
      </CheckeoutAmountBox>
    </PriceBoxDiv>
  );
};

export default PriceBox;
