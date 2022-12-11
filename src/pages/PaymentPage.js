import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CheckMark from "../components/CheckMark";
import OrderSummary from "../components/OrderSummary";
import "animate.css";
import { useHistory } from "react-router-dom";

const MainBox = styled.div`
  animation: zoomIn;
  animation-duration: 1s;
`;
const MsgBox = styled.div`
  background-color: #395547;
  height: 37vh;
  clip-path: polygon(0 0, 100% 0%, 100% 85%, 0% 100%);
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  @media (max-width: 450px) {
    height: 33vh;
    justify-content: start;
    gap: 0.4rem;
  }
  @media only screen and (min-width: 451px) and (max-width: 599px) {
  }
  @media only screen and (min-width: 600px) and (max-width: 1020px) {
  }
  h4 {
    @media (max-width: 450px) {
      font-size: 1rem;
    }
  }
  h3 {
    letter-spacing: 0.1rem;
    @media (max-width: 450px) {
      font-size: 1.5rem;
    }
  }
  p {
    background-color: #ffd336;
    display: inline;
    width: fit-content;
    padding: 0.1rem 0.5rem;
    border-radius: 0.4rem;
    color: black;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: bold;
    }
    @media (max-width: 450px) {
    }
    @media only screen and (min-width: 451px) and (max-width: 599px) {
    }
    @media only screen and (min-width: 600px) and (max-width: 1020px) {
    }
  }
`;
const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.4rem 0.6rem;

  @media (max-width: 1020px) {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
`;

const OrderDetailsBox = styled.div`
  table {
    width: 100%;
    text-align: center;
    thead {
      tr {
        td {
          font-size: 1.3rem;
          padding: 1rem;
          font-weight: 600;
          color: #8d8d8d;

          @media (max-width: 551px) {
            font-size: 1rem;
            padding: 0;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          text-transform: capitalize;
          color: black;
          font-weight: 400;
          padding: 0.5rem 0.2rem;
          font-weight: 450;
          letter-spacing: 0.02rem;
          /* border: 1px solid #e9e9e9; */
          @media (max-width: 450px) {
            font-size: 1rem;
            letter-spacing: 0;
            padding: 0.3rem 0.4rem;
          }
        }
      }
    }
  }
`;
const SummaryBox = styled.div``;
const PaymentPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userEmail.split("@")[0].trim());
  const [order, setOrder] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setOrder("");
      const fetcher = async () => {
        const res = await fetch(
          `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/orders.json`
        );
        const data = await res.json();

        const arr = [];
        if (data) {
          for (const item in data) {
            if (item === email) {
              for (const i in data[item]) {
                arr.push(data[item][i]);
              }
            }
          }
          setOrder(arr[arr.length - 1]);
        }
      };
      fetcher();
    }, 500);
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
  }, []);
  const items = useSelector((state) => state.items);
  const name = useSelector((state) => state.userEmail);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const history = useHistory();
  if (order) {
  }

  return (
    <Fragment>
      {order && (
        <MainBox>
          <MsgBox>
            <CheckMark />
            <h4>{`Hii ${order["address"]["name"]},`}</h4>
            <h3>Thanks for your Order!</h3>
            <p>
              Order No: <span>#{order["orderno"]}</span>
            </p>
          </MsgBox>
          <InfoBox>
            <OrderDetailsBox>
              <table>
                <thead>
                  <tr key="">
                    <td>Date</td>
                    <td>Billing address</td>
                    <td>Payment Method</td>
                  </tr>
                </thead>
                <tbody>
                  <tr key="">
                    <td>
                      {`${
                        monthNames[
                          order["time"].split(",")[0].split("/")[1] - 1
                        ]
                      } ${order["time"].split(",")[0].split("/")[0]}, ${
                        order["time"].split(",")[0].split("/")[2]
                      }`}
                    </td>
                    <td>{order["address"]["streetaddress"]}</td>
                    <td>Cash On Delivery</td>
                  </tr>
                </tbody>
              </table>
            </OrderDetailsBox>
            <SummaryBox>
              <h4>Order Summary</h4>
              {order && (
                <OrderSummary
                  item={order["items"]}
                  totalAmount={order["totalAmount"]}
                />
              )}
            </SummaryBox>
          </InfoBox>
        </MainBox>
      )}
    </Fragment>
  );
};

export default PaymentPage;
