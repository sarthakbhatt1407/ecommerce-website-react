import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import login from "../assets/login.png";

const spin = keyframes`
0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const BtnLoad = styled.div`
  border: 3px solid white; /* Light grey */
  border-top: 3px solid black; /* Blue */
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: ${spin} 2s linear infinite;
`;
const OuterBox = styled.div`
  height: 100vh;
  position: relative;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 750px) {
    background-size: cover;
  }
`;
const LoginBox = styled.div`
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  position: absolute;
  top: 45%;
  left: 50%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #a5a5a5;
  transform: translate(-47%, -50%);
  @media (max-width: 750px) {
    left: 47%;
    height: 50vh;
    padding: 2rem 3rem;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
  }
  h2 {
    font-size: 1.6rem;
  }
`;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  a {
    p {
      font-weight: 700;
      text-align: center;
      letter-spacing: 0.12rem;
      font-size: 1.1rem;
      @media (max-width: 750px) {
        letter-spacing: 0.09rem;
      }
    }
  }
  button {
    display: flex;
    justify-content: center;
    border: none;
    padding: 0.5rem 1rem;
    background-color: #4b74d9;
    color: white;
    font-size: 1.1rem;
    letter-spacing: 0.16rem;
    border-radius: 2rem;
    font-weight: 600;
  }
`;
const Input = styled.input`
  padding: 0.6rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
`;

const LoginPage = () => {
  const defaultFields = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const APIKEY = "AIzaSyC9VvVUPAPZVocuPxjAAi7UdjQdJ1l-knE";
  const [inpFields, setInputFields] = useState(defaultFields);
  const onChangeHandler = (e) => {
    const val = e.target.value;
    const id = e.target.id;
    const obj = {
      ...inpFields,
      [id]: val,
    };
    setInputFields(obj);
  };
  const onClickHandler = async () => {
    setBtnLoading(true);
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: inpFields.email,
          password: inpFields.password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const msg = await data.error.message;
      setBtnLoading(false);
      setTimeout(() => {
        alert(msg);
      }, 200);
    }
    if (res.ok) {
      setBtnLoading(false);
      alert("Login Succesfull");
      setInputFields(defaultFields);
      history.push("/");
      const idToken = data.idToken;
      dispatch({ type: "login", email: inpFields.email, idToken: idToken });
    }
  };
  const btnLoader = <BtnLoad></BtnLoad>;
  return (
    <OuterBox img={login}>
      <LoginBox>
        <h2>Welcome Back</h2>
        <FormBox>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            onChange={onChangeHandler}
            value={inpFields.email}
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            onChange={onChangeHandler}
            value={inpFields.password}
          />
          <button onClick={onClickHandler}>
            {btnLoading ? btnLoader : "Login"}
          </button>

          <Link to="/register">
            <p>New User? Register Now</p>
          </Link>
        </FormBox>
      </LoginBox>
    </OuterBox>
  );
};

export default LoginPage;
