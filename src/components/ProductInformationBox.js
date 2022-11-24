import {
  Battery0Bar,
  Camera,
  Memory,
  MemoryRounded,
  Power,
  PublishedWithChangesOutlined,
  SmartDisplay,
  Store,
} from "@mui/icons-material";
import React, { useState } from "react";
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
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const ProductInformationBox = (props) => {
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
  } = props.product;
  color = color.split(",");

  const [quantity, setQuantity] = useState(1);
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

  return (
    <>
      <h4>
        {name} ({ram} RAM/{storage} ROM/{processor})
      </h4>
      {price && <h3>&#8377; {price.toLocaleString("en-IN")}</h3>}
      <OptionBox>
        <label htmlFor="color">Color</label>
        <select id="color" onChange={optionHandler}>
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
      <SpecsBox>
        <h6>Specs</h6>
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
