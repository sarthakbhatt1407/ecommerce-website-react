import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PriceBox from "../components/PriceBox";
const OuterBox = styled.div`
  background-color: #f6f6f6;
  height: 80vh;
`;

const MainBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 1rem 0.6rem;
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    display: flex;
    flex-direction: column;
  }
`;
const AddressFormBox = styled.div`
  border: 1px solid #c7c4c4;
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: 0.01rem 0.01rem 0.1rem black;
  h3 {
    text-align: center;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 0.2rem 0.5rem;
`;

const LabelInpBox = styled.div`
  width: 170px;
  display: flex;
  flex-direction: column;

  input {
    border: 1px solid #cbcbcb;
  }
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
  }, []);
  const defaultField = {
    name: "",
    phone: "",
    streetaddress: "",
    pinCode: "",
    state: "",
  };
  const [address, setAddress] = useState(defaultField);
  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.getElementById(id);
    if (e.target.value.trim().length > 1) {
      ele.style.border = "1px solid #cbcbcb";
      ele.placeholder = "";
    }

    setAddress({ ...address, [id]: val });
  };
  const fieldsChecker = () => {
    console.log("clik");
    const { name, phone, streetaddress, pinCode, state } = address;
    if (
      name.trim().length > 1 &&
      phone.length > 9 &&
      streetaddress.trim().length > 5 &&
      pinCode.trim().length < 6 &&
      pinCode.trim().length > 5 &&
      state.trim().length > 2
    ) {
      return true;
    } else {
      if (!name.trim().length > 1) {
        const ele = document.getElementById("name");
        ele.style.border = "1px solid red";
        ele.placeholder = "Enter Name";
      }
    }
  };
  const onBlurhandler = (e) => {
    const id = e.target.id;
    const ele = document.getElementById(id);
    if (e.target.value.trim().length < 1) {
      ele.style.border = "1px solid red";
      let placeholder = e.target.id;
      ele.placeholder = "Enter valid " + placeholder;
    }
  };
  return (
    <OuterBox>
      <MainBox>
        <AddressFormBox>
          <h3>Address</h3>
          <button
            onClick={() => {
              fieldsChecker();
            }}
          >
            Submit
          </button>
          <FormBox>
            <LabelInpBox>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={onChangeHandler}
                onBlur={onBlurhandler}
              />
            </LabelInpBox>
            <LabelInpBox>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                id="phone"
                onChange={onChangeHandler}
                onBlur={onBlurhandler}
              />
            </LabelInpBox>
            <LabelInpBox>
              <label htmlFor="streetaddress">Address</label>
              <input
                type="text"
                id="streetaddress"
                onChange={onChangeHandler}
                onBlur={onBlurhandler}
              />
            </LabelInpBox>
            <LabelInpBox>
              <label htmlFor="pinCode">Pin Code</label>
              <input
                type="number"
                id="pinCode"
                onChange={onChangeHandler}
                onBlur={onBlurhandler}
              />
            </LabelInpBox>
            <LabelInpBox>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                onChange={onChangeHandler}
                onBlur={onBlurhandler}
              />
            </LabelInpBox>
          </FormBox>
        </AddressFormBox>
        <PriceBox />
      </MainBox>
    </OuterBox>
  );
};

export default CheckoutPage;
