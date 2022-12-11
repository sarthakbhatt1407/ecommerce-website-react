import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import OrderDetails from "../components/OrderDetails";
import OrderSummary from "../components/OrderSummary";
const OuterBox = styled.div`
  h3 {
    text-align: center;
  }
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.5rem;
`;
const InfoBox = styled.div`
  display: grid;
  padding: 1rem 0;
  gap: 2rem;
  &:not(:first-child) {
    border-top: 1px solid rgb(172, 172, 172);
  }
  grid-template-columns: 1fr 1.6fr;
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const YourOrders = () => {
  const email = useSelector((state) => state.userEmail).split("@")[0];
  const [orders, setOrders] = useState("");
  useEffect(() => {
    const arr = [];
    const fetcher = async () => {
      const resp = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/orders/${email}.json`
      );
      const data = await resp.json();
      for (const item in data) {
        arr.push(data[item]);
      }
      //   console.log(arr);
      setOrders(arr);
    };
    fetcher();
  }, []);
  return (
    <OuterBox>
      <h3>Your Orders</h3>
      <MainBox>
        {orders &&
          orders.map((item) => {
            return (
              <InfoBox>
                <OrderDetails
                  address={item["address"]}
                  orderNo={item["orderno"]}
                  time={item["time"]}
                />
                <OrderSummary
                  item={item["items"]}
                  totalAmount={item["totalAmount"]}
                />
              </InfoBox>
            );
          })}
      </MainBox>
    </OuterBox>
  );
};

export default YourOrders;
