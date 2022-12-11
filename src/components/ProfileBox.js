import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const MainBox = styled.div`
  display: flex;
  background-color: white;
  padding: 1rem;
  gap: 1rem;
  border-radius: 0.5rem;
  align-items: center;
`;
const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const TextBox = styled.div``;
const ProfileBox = (props) => {
  const item = props.item;
  const { title, desc, img, link } = item;
  return (
    <Link to={link}>
      <MainBox>
        <ImgBox img={img}></ImgBox>
        <TextBox>
          <h4>{title}</h4>
          <p>{desc}</p>
        </TextBox>
      </MainBox>
    </Link>
  );
};

export default ProfileBox;
