import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddressBox from "../components/AddressBox";
const NoAddressBox = styled.div`
  display: flex;
  height: 70vh;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  gap: 3rem;
  background-color: #f7f6f6;
  height: 90vh;
`;
const MainBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 551px) and (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 751px) and (max-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const AddressPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.userEmail).split("@")[0];
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const localStr = JSON.parse(localStorage.getItem("state"));
      if (localStr) {
        dispatch({ type: "reload", item: { ...localStr } });
      }
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/users/${email}/address.json`
      );
      const data = await res.json();
      const arr = [];
      for (const item in data) {
        arr.push(data[item]);
      }
      const finalArr = [];
      if (arr.length > 0) {
        finalArr[0] = arr[0];
      }
      let i = 0;
      const checker = (item) => {
        for (const add of finalArr) {
          if (
            add.streetaddress === item.streetaddress &&
            add.city === item.city &&
            add.phone === item.phone &&
            add.name === item.name
          ) {
            return false;
          }
        }
        return true;
      };
      if (arr.length > 0) {
        for (const item of arr) {
          if (checker(item)) {
            finalArr.push(item);
          }
        }
      }
      setAddress(finalArr);
    };
    fetcher();
  }, []);

  return (
    <>
      <OuterBox>
        <h4>Your Address</h4>
        {address.length < 1 && (
          <NoAddressBox>
            <p>No addresses stored yet!</p>
          </NoAddressBox>
        )}
        <MainBox>
          {address &&
            address.map((item) => {
              return <AddressBox key={item.pinCode + item.name} item={item} />;
            })}
        </MainBox>
      </OuterBox>
    </>
  );
};

export default AddressPage;
