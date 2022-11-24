import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  width: 100%;
  height: 70vh;
  margin: auto;
  position: relative;
  overflow: hidden;
  border: 1px solid #ebebeb;
  @media (max-width: 450px) {
    width: 100%;
    height: 30vh;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    height: 35vh;
  }
`;

const ImgBox = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.5s;
`;
const ArrowLeft = styled.button`
  text-align: center;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 40%;
  opacity: 0.6;
  left: 0;
  font-size: 1.9rem;
`;
const ArrowRight = styled.button`
  text-align: center;
  border: none;
  background-color: transparent;
  position: absolute;
  right: 0;
  font-size: 1.9rem;
  top: 40%;
  opacity: 0.6;
`;

const ProductPageSlider = (props) => {
  const images = props.images;
  const imageLeft = () => {
    const images = document.querySelectorAll(".image");

    images.forEach((slide, ind) => {
      slide.style.left = `${ind * 100}%`;
    });
  };
  setTimeout(() => {
    imageLeft();
  }, 1);
  const slider = () => {
    const images = document.querySelectorAll(".image");
    images.forEach((slide) => {
      slide.style.transform = `translateX(-${current * 100}%)`;
    });
  };
  let current = 0;
  const prev = () => {
    const images = document.querySelectorAll(".image");
    if (current > 0) {
      current--;
      slider();
    } else {
      current = images.length - 1;
      slider();
    }
  };

  const next = () => {
    const images = document.querySelectorAll(".image");

    if (current < images.length - 1) {
      current++;
      slider();
    } else {
      current = 0;
      slider();
    }
  };
  return (
    <>
      <MainBox>
        {images.map((item) => {
          return <ImgBox key={item} img={item} className="image"></ImgBox>;
        })}
        <ArrowLeft onClick={prev}> &#60;</ArrowLeft>
        <ArrowRight onClick={next}>&#62;</ArrowRight>
      </MainBox>
    </>
  );
};

export default ProductPageSlider;
