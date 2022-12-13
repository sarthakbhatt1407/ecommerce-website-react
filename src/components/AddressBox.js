import { Pinch } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
const MainBox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  box-shadow: 0.1rem 0.1rem 0.9rem #e2e2e2;
  border-radius: 0.5rem;
  padding: 1rem;
  text-transform: capitalize;
  p {
    span {
      font-weight: 500;
    }
  }
`;
const AddressBox = (props) => {
  const item = props.item;
  const { city, name, phone, pinCode, state, streetaddress } = item;
  return (
    <MainBox>
      <h5>{name}</h5>
      <span>
        {streetaddress}, {city}, {state} {pinCode}
      </span>
      <span>India</span>
      <p>
        <span>phone number: </span> {phone}
      </p>
    </MainBox>
  );
};

export default AddressBox;
