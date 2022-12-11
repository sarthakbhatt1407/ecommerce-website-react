import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import ProfileBox from "../components/ProfileBox";
const OuterBox = styled.div`
  background-color: #f7f6f6;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  @media (max-width: 450px) {
  }
`;
const MainBox = styled.div`
  display: flex;
  gap: 3rem;
  @media (max-width: 850px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 851px) and (max-width: 1095px) {
    gap: 1rem;
  }
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const obj = [
    {
      id: 1,
      title: "Your Orders",
      desc: "View your recent orders",
      img: "https://i.ibb.co/z7TDD7V/order.jpg",
      link: "/profile/orders",
    },
    {
      id: 2,
      title: "Login & Security",
      desc: "Edit your account password",
      img: "https://i.ibb.co/0BqJb11/sec.webp",
      link: "/profile/security",
    },
    {
      id: 3,
      title: "Your Address",
      desc: "Your recent addresses",
      img: " https://i.ibb.co/rMnqC8M/address.jpg",
      link: "/profile/address",
    },
  ];

  useEffect(() => {
    // setTimeout(() => {
    //   if (!email.length > 0) {
    //     history.push("/");
    //   }
    // }, 500);
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
  }, []);
  const logOut = () => {
    dispatch({ type: "logout" });
    history.push("/");
  };
  return (
    <OuterBox>
      <h3>Your Profile</h3>
      {/* <button onClick={logOut}>LogOut</button> */}
      <MainBox>
        {obj.map((item) => {
          return <ProfileBox key={item.id} item={item} />;
        })}
      </MainBox>
    </OuterBox>
  );
};

export default ProfilePage;
