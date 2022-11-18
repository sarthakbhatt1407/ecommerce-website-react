import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const SliderBox = styled.div`
  position: relative;
`;
const MainBox = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  margin: auto;
  @media (max-width: 450px) {
    height: 35vh;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    height: 40vh;
  }
`;
const SwicthBtn = styled.button`
  position: absolute;
  font-size: 1.5rem;
  top: 44%;
  left: ${(props) => (props.btnName === "prev" ? "0.5%" : "")};
  right: ${(props) => (props.btnName === "next" ? "0.5%" : "")};
  z-index: 2;
  border: none;
  background-color: transparent;
  color: black;
  opacity: 0.5;
  width: 40px;
  height: 40px;
  padding: 0 0.2rem;
  text-align: center;
  @media (max-width: 450px) {
    top: 40%;
  }
`;
const SlideBox = styled.div`
  display: flex;
  gap: 1rem;

  /* justify-content: center; */
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 1s;

  @media (max-width: 450px) {
    height: 30vh;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  h1 {
    font-size: 2.4rem;
    @media (max-width: 450px) {
      font-size: 1.1rem;
    }
    @media only screen and (min-width: 451px) and (max-width: 1020px) {
      font-size: 1.7rem;
    }
  }
  p {
    font-size: 1.5rem;
    @media (max-width: 450px) {
      font-size: 0.8rem;
    }
    @media only screen and (min-width: 451px) and (max-width: 1020px) {
      font-size: 0.6rem;
    }
  }
`;

const ImgBox = styled.div`
  width: 50%;
  padding: 3rem;
  display: flex;
  justify-content: center;
  @media (max-width: 450px) {
    width: 58%;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    width: 60%;
  }
`;
const SlideBoxImg = styled.img``;

const Slider = () => {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/slider.json"
      );
      const data = await res.json();
      const arr = [];
      for (const item in data) {
        arr.push(data[item]);
      }
      setSlides(arr);
    };
    fetcher();
  }, []);

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
    const images = document.querySelectorAll(".slide");
    if (current < images.length - 1) {
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
    const images = document.querySelectorAll(".slide");
    if (current > 0) {
      current--;
      slider();
    } else {
      current = images.length - 1;
      slider();
    }
  };

  const next = () => {
    const images = document.querySelectorAll(".slide");

    if (current < images.length - 1) {
      current++;
      slider();
    } else {
      current = 0;
      slider();
    }
    clearInterval(intv);
  };

  return (
    <>
      <SliderBox>
        <SwicthBtn btnName="prev" onClick={prev}>
          <ArrowBackIosNewIcon />
        </SwicthBtn>
        <SwicthBtn btnName="next" onClick={next}>
          <ArrowForwardIosIcon />
        </SwicthBtn>
        <MainBox>
          {slides.map((item) => {
            const { desc, heading, id, imgUrl } = item;
            return (
              <SlideBox key={id} className="slide">
                <ImgBox>
                  <SlideBoxImg src={imgUrl} />
                </ImgBox>
                <TextBox>
                  <h1>{heading}</h1>
                  <p>{desc}</p>
                </TextBox>
              </SlideBox>
            );
          })}
        </MainBox>
      </SliderBox>
    </>
  );
};

export default Slider;
