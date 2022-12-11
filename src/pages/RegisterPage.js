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
  button {
    border: none;
  }
`;
const Input = styled.input`
  padding: 0.3rem 0.7rem;
`;

const RegisterPage = () => {
  const APIKEY = "AIzaSyC9VvVUPAPZVocuPxjAAi7UdjQdJ1l-knE";
  const dispatch = useDispatch();
  const defaultFields = {
    email: "",
    password: "",
  };
  const [inpFields, setInputFields] = useState(defaultFields);
  const history = useHistory();
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
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,
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
      alert("Sign Up Succesfull, Kindly Login Now");
      const userObj = {
        email: inpFields.email,
      };
      const resp = await fetch(
        `https://ecommerce-website-react-e0fe3-default-rtdb.firebaseio.com/users/${
          inpFields.email.split("@")[0]
        }/email.json`,
        {
          method: "POST",
          body: JSON.stringify(userObj),
        }
      );
      setInputFields(defaultFields);
      history.push("/login");
    }
  };

  return (
    <OuterBox>
      <LoginBox>
        <h3>Register</h3>
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
          <button onClick={onClickHandler}>Register</button>

          <Link to="/login">
            <p>Already Have Account? Login Now</p>
          </Link>
        </FormBox>
      </LoginBox>
    </OuterBox>
  );
};

export default RegisterPage;
