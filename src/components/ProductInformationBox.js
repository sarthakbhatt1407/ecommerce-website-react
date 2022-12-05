import {
  Battery0Bar,
  Camera,
  HeadphonesBatteryOutlined,
  HeadphonesOutlined,
  Headset,
  LinearScaleOutlined,
  Memory,
  MemoryRounded,
  Mic,
  Power,
  PublishedWithChangesOutlined,
  SmartDisplay,
  Store,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
const OptionBox = styled.div`
  display: flex;
  select {
    margin: 0 1rem;
    option {
      text-transform: capitalize;
    }
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

const SpecsBox = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  width: 55%;
  padding: 1rem 0.5rem;
  h6 {
    color: #878787;
  }
  ul {
    list-style-type: none;
    li {
      display: flex;
      align-items: center;
      margin: 0.4rem 0;
      gap: 0.5rem;
    }
    h6 {
      color: black;
      span {
        background-color: blue;
        color: white;
        border-radius: 0.6rem;
        padding: 0 0.2rem;
        margin: 0 0.3rem;
      }
    }
  }

  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
`;
const AddtoCartBtn = styled.button`
  border: none;
  width: 60%;
  padding: 0.4rem 0.2rem;
  border-radius: 0.5rem;
  background-color: #fb641b;
  color: white;
  font-weight: 700;
  letter-spacing: 0.09rem;
  margin: 1rem 0;
  @media (max-width: 450px) {
    width: 100%;
  }
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    width: 100%;
  }
`;
const ClrQuantityBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.7rem;
  @media (max-width: 450px) {
    flex-direction: row;
    align-items: center;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
  }
`;

const ProductInformationBox = (props) => {
  const dispatch = useDispatch();
  let {
    name,
    price,
    color,
    processor,
    ram,
    storage,
    display,
    camera,
    battery,
    charging,
    gpu,
    driver,
    mic,
    connector,
    iprating,
    audio,
    design,
    extra,
    productheading,
  } = props.product;
  const image = props.image;

  color = color.split(",");

  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const quantityHandler = (e) => {
    const btnClass = e.target.className;
    if (btnClass === "add") {
      if (quantity < 2) {
        setQuantity((prev) => {
          return prev + 1;
        });
      } else {
        alert("Maximum Limit 2");
      }
    } else {
      if (quantity >= 2) {
        setQuantity((prev) => {
          return prev - 1;
        });
      }
    }
  };
  const optionHandler = (e) => {
    props.colorOpt(e);
  };

  const buyHandler = () => {
    if (isLoggedIn) {
      const options = document.getElementsByClassName("options");
      const color = options["color"].value.trim();
      if (color.trim().length > 0) {
        const obj = {
          ...props.product,
          productimg: image,
          price: quantity * price,
          quantity: quantity,
          color: color,
          id: props.product.id + color + props.product.name,
        };
        dispatch({ type: "add", item: { ...obj } });
        alert("Item added to cart");
      } else {
        alert("Please Select Color");
      }
    } else {
      alert("Kindly Login");
    }
  };
  return (
    <>
      {ram && storage && (
        <h4>
          {name} ({ram} RAM/{storage} ROM/{processor})
        </h4>
      )}
      {mic && driver && connector && (
        <h4>
          {name} ({productheading})
        </h4>
      )}
      {price && <h3>&#8377; {price.toLocaleString("en-IN")}</h3>}
      <ClrQuantityBox>
        <OptionBox>
          <label htmlFor="color">Color</label>
          <select className="options" id="color" onChange={optionHandler}>
            <option value="" key="" defaultChecked></option>
            {color.map((color) => {
              return (
                <option value={color} key={color}>
                  {color}
                </option>
              );
            })}
          </select>
        </OptionBox>

        <QuantityBox>
          <button className="add" onClick={quantityHandler}>
            +
          </button>
          <div>{quantity}</div>
          <button className="minus" onClick={quantityHandler}>
            -
          </button>
        </QuantityBox>
      </ClrQuantityBox>

      <AddtoCartBtn onClick={buyHandler}>Add to Cart</AddtoCartBtn>

      <SpecsBox>
        <h6>Specs</h6>
        {camera && display && (
          <ul>
            <li>
              <SmartDisplay /> {display}
            </li>
            <li>
              <Memory /> {processor}
            </li>
            <li>
              <MemoryRounded /> {gpu}
            </li>
            <li>
              <Camera /> {camera}
            </li>
            <li>
              <Memory />
              {ram} RAM
            </li>
            <li>
              <Memory />
              {storage} ROM
            </li>
            <li>
              <Battery0Bar />
              {battery}
            </li>
            <li>
              <Power />
              {charging}
            </li>
            <li>
              <Store /> 1 Year Manufacturer Warranty{" "}
            </li>
          </ul>
        )}
        {driver && mic && connector && (
          <ul>
            <li>
              <HeadphonesOutlined /> {driver}
            </li>
            <li>
              <Mic /> {mic}
            </li>
            <li>
              <FontAwesomeIcon icon={faDroplet} />

              {iprating}
            </li>
            <li>
              <Headset /> {audio}
            </li>
            <li>
              {" "}
              <LinearScaleOutlined />
              {design}
            </li>
            <li>
              <HeadphonesBatteryOutlined /> {extra}
            </li>
          </ul>
        )}
      </SpecsBox>
      <SpecsBox>
        <h6>Seller</h6>
        <ul>
          <h6>
            React Online Store
            <span> 4.8 &#x2606;</span>
          </h6>
          <li>
            <PublishedWithChangesOutlined /> 7 Days Replacement Policy
          </li>
        </ul>
      </SpecsBox>
    </>
  );
};

export default ProductInformationBox;
