import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import CartBox from "../components/CartBox";
import PriceBox from "../components/PriceBox";
const OuterBox = styled.div`
  background-color: #f6f6f6;
  height: 80vh;
  width: 100%;
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
  height: fit-content;
  padding: 0.8rem 0.6rem;
  border: 1px solid #c7c4c4;
  border-radius: 0.4rem;
  box-shadow: 0.01rem 0.01rem 0.1rem black;
  background-color: white;
  h3 {
    text-align: center;
  }
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    display: flex;
    flex-direction: column;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 0.2rem 0.5rem;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c7c4c4;
  border-radius: 0.4rem;
  box-shadow: 0.01rem 0.01rem 0.1rem black;
  background-color: white;
  padding: 0.8rem 0rem;
  h3 {
    text-align: center;
    margin: 1rem 0;
  }
`;
const ItemAddressBox = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;

  max-height: 75vh;
  overflow: auto;
  gap: 2rem;
`;
const LabelInpBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  input {
    border: 1px solid #cbcbcb;
    padding: 0.4rem 0;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
  @media only screen and (min-width: 451px) and (max-width: 599px) {
    width: 200px;
  }
  @media only screen and (min-width: 600px) and (max-width: 1020px) {
    width: 250px;
  }
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    city: "",
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

  const items = useSelector((state) => state.items);
  const email = useSelector((state) => state.userEmail).split("@")[0];
  // console.log(email);
  const totalAmount = useSelector((state) => state.totalAmount);
  const addressSubmitter = async () => {
    const obj = {
      ...address,
    };
    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hour24 = dateObj.getHours();
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
    const min = dateObj.getMinutes();
    const sec = dateObj.getSeconds();
    const orderDateAndTime = `${date}/${month}/${year}, ${hour12}:${min}:${sec}`;
    const res = await fetch(
      `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/users/${email}/address.json`,
      {
        method: "POST",
        body: JSON.stringify(obj),
      }
    );
    const orderObj = {
      items: items,
      totalAmount: totalAmount,
      time: orderDateAndTime,
      address: { ...address },
      orderno: parseInt(Math.random() * 5000 + 1),
    };
    const resp = await fetch(
      `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/orders/${
        email.split("@")[0]
      }.json`,
      {
        method: "POST",
        body: JSON.stringify(orderObj),
      }
    );
    setTimeout(() => {
      history.push("/");
    }, 6000);
    setTimeout(() => {
      dispatch({ type: "ordered" });
    }, 500);
  };
  const addOrder = async () => {
    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hour24 = dateObj.getHours();
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24;
    const min = dateObj.getMinutes();
    const sec = dateObj.getSeconds();
    const orderDateAndTime = `${date}/${month}/${year}, ${hour12}:${min}:${sec}`;

    const obj = {
      items: items,
      totalAmount: totalAmount,
      time: orderDateAndTime,
    };
    const res = await fetch(
      `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/orders/${
        email.split("@")[0]
      }.json`,
      {
        method: "POST",
        body: JSON.stringify(obj),
      }
    );
  };
  console.log();
  return (
    <OuterBox>
      <MainBox>
        <ItemAddressBox>
          <AddressFormBox>
            <h3>Address</h3>
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
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
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
          <ItemBox>
            <h3>Items</h3>
            {items.map((item) => {
              return (
                <CartBox
                  item={item}
                  key={item.productimg}
                  id={item.id}
                  display={false}
                />
              );
            })}
          </ItemBox>
        </ItemAddressBox>
        <PriceBox BtnLinkAdd={`/payment`} onClick={addressSubmitter} />
      </MainBox>
    </OuterBox>
  );
};

export default CheckoutPage;
