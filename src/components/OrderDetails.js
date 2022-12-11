import React from "react";
import styled from "styled-components";
const MainBox = styled.div`
  /* display: flex; */

  h6 {
    text-align: center;
    font-size: 1.2rem;
    background-color: #ffd336;
    letter-spacing: 0.05rem;
    padding: 0.4rem 0;
  }
`;
const AddressBox = styled.div`
  p {
    text-transform: capitalize;
    span {
      font-weight: 600;
    }
  }
`;

const OrderDetails = (props) => {
  const time = props.time;
  const orderNo = props.orderNo;
  const address = props.address;
  return (
    <MainBox>
      <h6>
        <span>Order No. </span> {orderNo}
      </h6>
      <AddressBox>
        <h5>{address.name}</h5>
        <p>
          {address.streetaddress + ", " + address.city}-
          {address.pinCode + ", " + address.state}
        </p>
        <p>
          <span>Phone Number -</span>
          {" " + address.phone}
        </p>
        <p>
          <span>Date & Time :</span> {time}
        </p>
        <p>
          <span>Payment : </span> Cash On Delivery
        </p>
      </AddressBox>
    </MainBox>
  );
};

export default OrderDetails;
