import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  table {
    text-align: center;
    width: 100%;

    thead {
      background-color: #edf2ec;
      border-radius: 0.4rem;
      tr {
        td {
          &:first-child {
            text-align: start;
          }
          padding: 0.4rem 1rem;
        }
      }
    }
    tbody {
      tr {
        td {
          &:last-child {
            font-weight: 620;
          }
          padding: 0.4rem 0.2rem;
          &:first-child {
            text-align: start;
          }
        }
      }
    }
  }
`;
const ImgTextBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0;
  gap: 1rem;
`;
const ImgBox = styled.div`
  background-image: url(${(props) => props.img});
  width: 5rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 5rem;
`;
const TextBox = styled.div``;
const OrderSummary = (props) => {
  const item = props.item;
  return (
    <MainBox>
      <table>
        <thead>
          <tr key="">
            <td>Product</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {item.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <ImgTextBox>
                    <ImgBox img={item.productimg[0]}></ImgBox>
                    <TextBox>
                      <h6>{item.name}</h6>
                      <p>
                        Color : <span>{item.color.toUpperCase()}</span>
                      </p>
                    </TextBox>
                  </ImgTextBox>
                </td>
                <td>x{item.quantity}</td>
                <td>&#8377; {item.price.toLocaleString("en-IN")}</td>
              </tr>
            );
          })}
          <tr key="" id="lastTableCol">
            <td></td>
            <td>Subtotal : </td>
            <td>&#8377;{props.totalAmount.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>
    </MainBox>
  );
};

export default OrderSummary;
