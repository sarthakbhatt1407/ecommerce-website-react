import React from "react";
import styled from "styled-components";
const SliderBox = styled.div`
  position: relative;
`;
const MainBox = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  margin: auto;
  @media (max-width: 450px) {
    height: 35vh;
  }
`;
const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 1s;
  opacity: 0.8;
`;
const SwicthBtn = styled.button`
  position: absolute;
  font-size: 1.5rem;
  top: 45%;
  left: ${(props) => (props.btnName === "prev" ? "0.5%" : "")};
  right: ${(props) => (props.btnName === "next" ? "0.5%" : "")};
  z-index: 2;
  border: none;
  background-color: grey;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  @media (max-width: 450px) {
    top: 40%;
  }
`;

const Slider = () => {
  const imageLeft = () => {
    const images = document.querySelectorAll(".slide");
    images.forEach((slide, ind) => {
      slide.style.left = `${ind * 100}%`;
    });
  };
  setTimeout(() => {
    imageLeft();
  }, 100);
  const slider = () => {
    const images = document.querySelectorAll(".slide");
    images.forEach((slide) => {
      slide.style.transform = `translateX(-${current * 100}%)`;
    });
  };
  const intv = setInterval(() => {
    if (current < 3) {
      current++;
      slider();
    } else {
      current = 0;
      slider();
      clearInterval(intv);
    }
  }, 3000);

  let current = 0;
  const prev = () => {
    if (current > 0) {
      current--;
      slider();
    } else {
      current = 3;
      slider();
    }
  };

  const next = () => {
    if (current < 3) {
      current++;
      slider();
    } else {
      current = 0;
      slider();
    }
  };

  return (
    <>
      <SliderBox>
        <SwicthBtn btnName="prev" onClick={prev}>
          &#60;
        </SwicthBtn>
        <SwicthBtn btnName="next" onClick={next}>
          &#62;
        </SwicthBtn>
        <MainBox>
          <img
            src="https://picsum.photos/id/220/1000/400"
            className="slide"
            alt=""
          />
          <img
            src="https://picsum.photos/id/222/1000/400"
            className="slide"
            alt=""
          />
          <img
            src="https://picsum.photos/id/256/1000/400"
            className="slide"
            alt=""
          />
          <img
            src="https://picsum.photos/id/275/1000/400"
            className="slide"
            alt=""
          />
        </MainBox>
      </SliderBox>
    </>
  );
};

export default Slider;
