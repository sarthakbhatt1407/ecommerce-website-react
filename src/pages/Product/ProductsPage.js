import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Loader";
import ProductBox from "../../components/ProductBox";
const OuterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProuctsMainBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  background-color: #ffffff;
  border: 1px solid #c6c6c6;
  padding: 0.5rem 0.4rem;
  display: block;
  border-radius: 0.3rem;
  width: 50%;
  @media (max-width: 450px) {
    width: 70%;
  }
  margin: 0.4rem 0;
`;
const EmptyPara = styled.p`
  margin-top: 5rem;
  color: #9a9090;
  font-size: 1.2rem;
  letter-spacing: 0.17rem;
`;
const ProductsPage = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const onChangeHanlder = (e) => {
    setIsLoading(false);
    const val = e.target.value.toLowerCase();
    const arr = products.filter((item) => {
      return item.name.toLowerCase().includes(val);
    });
    setFilteredProducts(arr);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/${pathname}.json`
      );
      const data = await res.json();

      const arr = [];
      let obj = {};
      for (const item in data) {
        obj = { ...data[item], id: item };
        arr.push(obj);
      }
      const localStr = JSON.parse(localStorage.getItem("state"));
      if (localStr) {
        dispatch({ type: "reload", item: { ...localStr } });
      }
      setProducts(arr);
      setFilteredProducts(arr);
      setIsLoading(false);
    };
    fetcher();
  }, []);
  return (
    <OuterBox>
      <Input
        type="text"
        onChange={onChangeHanlder}
        placeholder="Search Product"
      />
      {!isLoading && filteredProducts.length === 0 && (
        <EmptyPara>Oopss! No Product Found</EmptyPara>
      )}
      <ProuctsMainBox>
        {isLoading && <Loader />}
        {filteredProducts.map((item) => {
          return <ProductBox key={item.id} item={item} />;
        })}
      </ProuctsMainBox>
    </OuterBox>
  );
};

export default ProductsPage;
