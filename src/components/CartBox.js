import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const MainBox = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  padding: 0.5rem 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid #e1e1e1;
  }
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: 451px) and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const ImgTextBox = styled.div`
  display: flex;
  @media (max-width: 450px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  @media only screen and (min-width: 451px) and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;
const ImageBox = styled.div`
  background-image: url(${(props) => props.img});
  width: 20vw;
  height: 20vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-weight: 400;
    letter-spacing: 0.05rem;
    @media (max-width: 450px) {
      font-size: 1.1rem;
    }
    @media only screen and (min-width: 451px) and (max-width: 720px) {
      font-size: 1.3rem;
    }
  }
  h5 {
    @media (max-width: 450px) {
      font-size: 1.1rem;
    }
    @media only screen and (min-width: 451px) and (max-width: 720px) {
      font-size: 1.2rem;
    }
    span {
      color: #c4c4c4;
      text-decoration: line-through;
      @media (max-width: 450px) {
        display: inline;
      }
    }
    @media (max-width: 450px) {
    }
  }
  p {
    text-transform: capitalize;
    @media (max-width: 450px) {
      font-size: 0.85rem;
    }
    @media only screen and (min-width: 451px) and (max-width: 720px) {
      font-size: 0.9rem;
    }
  }
`;

const QuantityRemoveBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
  }
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    flex-direction: row;
    justify-content: center;
  }
`;
const QuantityBox = styled.div`
  display: flex;
  gap: 1rem;
  button {
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    border: 1px solid #d2cece;
    border-radius: 0.3rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const RemoveBtn = styled.button`
  width: 50%;
  border: none;
  background-color: #fb641b;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.4rem;
`;

const CartBox = (props) => {
  const item = props.item;
  const {
    name,
    price,
    processor,
    ram,
    storage,
    color,
    quantity,
    os,
    befprice,
    audio,
    design,
  } = item;
  const image = item.productimg[0];
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const dispatch = useDispatch();
  const quantityHandler = (e) => {
    const btnClass = e.target.className;
    const singlerPrice = item.price / item.quantity;
    if (btnClass === "add") {
      dispatch({
        type: "quantityadd",
        quantity: 1,
        item: { ...item },
        itemPrice: singlerPrice,
      });
    } else {
      dispatch({
        type: "quantityremove",
        quantity: 1,
        item: { ...item },
        itemPrice: singlerPrice,
      });
    }
  };

  const removeHanlder = () => {
    dispatch({ type: "remove", item: { ...item } });
  };
  return (
    <MainBox>
      <ImgTextBox>
        <ImageBox img={image}></ImageBox>
        <TextBox>
          {storage && (
            <h4>{`${name} (${capitalizeFirstLetter(color)}, ${storage})`}</h4>
          )}
          {audio && <h4>{`${name} `}</h4>}
          {ram && <p>{`${processor}, ${ram} RAM, ${os}`}</p>}
          {audio && <p>{`${color}, ${audio} , ${design}`}</p>}
          <h5>
            <span>{(befprice * quantity).toLocaleString("en-IN")}</span> &#8377;{" "}
            {price.toLocaleString("en-IN")}
          </h5>
        </TextBox>
      </ImgTextBox>
      <QuantityRemoveBox>
        <QuantityBox>
          <button className="add" onClick={quantityHandler}>
            +
          </button>
          <div>{quantity}</div>
          <button className="minus" onClick={quantityHandler}>
            -
          </button>
        </QuantityBox>
        <RemoveBtn onClick={removeHanlder}>Remove</RemoveBtn>
      </QuantityRemoveBox>
    </MainBox>
  );
};

export default CartBox;
