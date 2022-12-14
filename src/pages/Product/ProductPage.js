import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import ProductInformationBox from "../../components/ProductInformationBox";
import ProductPageSlider from "../../components/ProductPageSlider";
const MainBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  overflow: auto;
  padding: 1rem 0;
  @media only screen and (min-width: 100px) and (max-width: 1020px) {
    display: flex;
    flex-direction: column;
  }
`;
const LoaderDiv = styled.div`
  display: block;
  margin: auto;
`;
const SliderBox = styled.div``;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 2rem;
  gap: 1rem;
  h4 {
  }
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/${pathname}.json`
      );
      const data = await res.json();
      setProduct([data]);
      setImages(data["productimg"].split(","));
      setIsLoading(false);
      const localStr = JSON.parse(localStorage.getItem("state"));
      if (localStr) {
        dispatch({ type: "reload", item: { ...localStr } });
      }
    };
    fetcher();
  }, []);
  const productColorChanger = (e) => {
    if (e.target.value.trim().length > 0) {
      setImages(product[0]["images"][`${e.target.value.trim()}`].split(","));
    }
  };
  return (
    <>
      <MainBox>
        {isLoading && (
          <LoaderDiv>
            <Loader />
          </LoaderDiv>
        )}
        {product.length > 0 && (
          <SliderBox>
            {images && <ProductPageSlider images={images} />}
          </SliderBox>
        )}
        {product.length > 0 && (
          <ContentBox>
            {product.length > 0 && (
              <ProductInformationBox
                image={images}
                colorOpt={productColorChanger}
                product={product[0]}
              />
            )}
          </ContentBox>
        )}
      </MainBox>
      <Footer />
    </>
  );
};

export default ProductPage;
