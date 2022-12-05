import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const OuterBox = styled.div`
  height: 100vh;
  position: relative;
`;
const LoginBox = styled.div`
  border: 1px solid black;
  padding: 1rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Input = styled.input``;

const LoginPage = () => {
  const defaultFields = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();

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
      alert(msg);
    }
    if (res.ok) {
      alert("Login Succesfull");
      setInputFields(defaultFields);
      history.push("/");
      const idToken = data.idToken;
      dispatch({ type: "login", email: inpFields.email, idToken: idToken });
    }
  };
  return (
    <OuterBox>
      <LoginBox>
        <h3>Login</h3>
        <FormBox>
          <Input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            onChange={onChangeHandler}
            value={inpFields.email}
          />
          <Input
            type="password"
            placeholder="Enter Password"
            id="password"
            onChange={onChangeHandler}
            value={inpFields.password}
          />
          <button onClick={onClickHandler}>Login</button>

          <Link to="/register">
            <p>New User? Register Now</p>
          </Link>
        </FormBox>
      </LoginBox>
    </OuterBox>
  );
};

export default LoginPage;
