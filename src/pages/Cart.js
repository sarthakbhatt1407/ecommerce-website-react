import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartBox from "../components/CartBox";
import PriceBox from "../components/PriceBox";
import StoreLoader from "../components/StoreLoader";
const MainBox = styled.div`
  background-color: #f6f6f6;
  padding: 1rem 0;
  h2 {
    text-align: center;
    margin: 1rem 0;
  }
`;
const EmptyMsg = styled.p`
  padding: 3rem 0;
  text-align: center;
  font-size: 1.6rem;
  letter-spacing: 0.09rem;
  font-weight: 600;
  color: #959595;
  @media (max-width: 450px) {
    font-size: 1.2rem;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    font-size: 1.4rem;
  }
`;
const ItemPriceBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  padding: 0 1rem;
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    display: flex;
    flex-direction: column;
  }
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: white;
  padding: 1rem 0;
  box-shadow: 0.01rem 0.01rem 0.1rem black;
  border-radius: 0.4rem;
  max-height: 85vh;
  overflow: auto;
`;

const Cart = () => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
  }, []);

  const email = useSelector((state) => state.userEmail);

  return (
    <MainBox>
      <h2>Your Cart</h2>
      {!items.length > 0 && <EmptyMsg>Your cart is empty!</EmptyMsg>}
      {items.length > 0 && (
        <ItemPriceBox>
          <ItemBox>
            {items.map((item) => {
              return (
                <CartBox
                  display={true}
                  item={item}
                  key={item.productimg}
                  id={item.id}
                />
              );
            })}
          </ItemBox>
          <PriceBox dis={true} BtnLinkAdd={`/checkout`} />
        </ItemPriceBox>
      )}
    </MainBox>
  );
};

export default Cart;
