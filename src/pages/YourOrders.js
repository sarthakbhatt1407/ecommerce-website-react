import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import OrderDetails from "../components/OrderDetails";
import OrderSummary from "../components/OrderSummary";
const NoOrderBox = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-transform: capitalize;
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
  }
`;
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
  const dispatch = useDispatch();
  const [orders, setOrders] = useState("");
  useEffect(() => {
    const arr = [];
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
    const fetcher = async () => {
      const resp = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/orders/${email}.json`
      );
      const data = await resp.json();
      for (const item in data) {
        arr.push(data[item]);
      }
      setOrders(arr);
    };
    fetcher();
  }, []);
  return (
    <>
      <OuterBox>
        <h3>Your Orders</h3>
        {orders.length < 1 && (
          <NoOrderBox>
            <p>No Orders Yet!</p>
          </NoOrderBox>
        )}
        <MainBox>
          {orders &&
            orders.map((item) => {
              return (
                <InfoBox>
                  <OrderDetails
                    address={item["address"]}
                    orderNo={item["orderno"]}
                    time={item["time"]}
                    key={item["time"] + item["address"]}
                  />
                  <OrderSummary
                    item={item["items"]}
                    totalAmount={item["totalAmount"]}
                    key={item["time"] + item["totalAmount"]}
                  />
                </InfoBox>
              );
            })}
        </MainBox>
      </OuterBox>
      <Footer />
    </>
  );
};

export default YourOrders;
