import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import "animate.css";
import { useHistory } from "react-router-dom";
import register from "../assets/register.svg";
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
const MainBox = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  @media (max-width: 450px) {
    height: 80vh;
  }
  @media only screen and (min-width: 451px) and (max-width: 599px) {
  }
`;

const FormBox = styled.div`
  height: 40vh;
  width: 40vw;
  display: flex;
  z-index: 2;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.2rem 0.5rem #a5a5a5;
  gap: 1rem;
  @media (max-width: 650px) {
    width: 90vw;
    height: 35vh;
  }
  @media only screen and (min-width: 651px) and (max-width: 1020px) {
    width: 80vw;
  }
  p {
    color: #bbbbbb;
    font-size: 1.1rem;
    letter-spacing: 0.03rem;
  }
  input {
    padding: 0.6rem 2rem;
    border: 1px solid #e8e8e8;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
    width: 70%;
  }
  button {
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

const EmailInput = styled.input`
  animation: fadeIn 2s;
`;
const PasswordInput = styled.input`
  animation: fadeIn 2s;
`;
const ResetButton = styled.button`
  animation: fadeIn 2s;
`;
const SubmitButton = styled.button`
  animation: fadeIn 2s;
`;

const SecurityPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", item: { ...localStr } });
    }
  }, []);
  const email = useSelector((state) => state.userEmail);
  const idToken = useSelector((state) => state.userToken);
  const demoEmail = email.split("@")[0];
  const len = demoEmail.length;
  let finalDemoEmail = "";
  finalDemoEmail = demoEmail.slice(0, 3);
  for (let i = 0; i < len - 4; i++) {
    finalDemoEmail = finalDemoEmail + "*";
  }
  finalDemoEmail = finalDemoEmail + demoEmail.slice(len - 1, len);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const defaultFields = {
    email: "",
    password: "",
  };
  const [inpFields, SetInpFields] = useState(defaultFields);

  const emailSubmitter = () => {
    if (email === inpFields.email) {
      const email = document.getElementById("email");
      const submit = document.getElementById("submit");
      email.style.animation = "fadeOut 1s";
      submit.style.animation = "fadeOut 1s";
      setEmailIsValid(true);
    } else {
      alert("Invalid Email");
    }
  };
  const history = useHistory();
  const resetHandler = async () => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC9VvVUPAPZVocuPxjAAi7UdjQdJ1l-knE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: `${idToken}`,
          password: inpFields.password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      alert(data.error.message);
    }
    if (res.ok) {
      alert("Password Successfully Changed, Kindly Login Again!");
      dispatch({ type: "logout" });
      history.push("/login");
    }
  };
  const onChangeHandler = (e) => {
    const val = e.target.value;
    const id = e.target.id;
    SetInpFields({ ...inpFields, [id]: val });
  };
  return (
    <OuterBox img={register}>
      <MainBox>
        <FormBox>
          <h3>Reset Your Password</h3>
          {!emailIsValid && <p>Kindly verify yor email : {finalDemoEmail}</p>}
          {!emailIsValid && (
            <EmailInput
              type="email"
              placeholder="Enter Your Email"
              id="email"
              onChange={onChangeHandler}
            />
          )}
          {!emailIsValid && (
            <SubmitButton id="submit" onClick={emailSubmitter}>
              Submit
            </SubmitButton>
          )}
          {emailIsValid && (
            <PasswordInput
              type="password"
              placeholder="Enter New Password"
              id="password"
              onChange={onChangeHandler}
            />
          )}
          {emailIsValid && (
            <ResetButton onClick={resetHandler}>Reset</ResetButton>
          )}
        </FormBox>
      </MainBox>
    </OuterBox>
  );
};

export default SecurityPage;
