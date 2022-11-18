import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.jpg";
import "animate.css";
// Styling
const Nav = styled.nav``;
const NavbarBox = styled.div`
  padding: 0.3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 450px) {
    padding: 0.3rem 0.5rem;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    flex-direction: column;
  }
`;
const LogoBox = styled.div`
  display: flex;
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    justify-content: center;
  }
`;
const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const PcTabLinksBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 450px) {
    display: none;
  }
`;
const TogglerBtn = styled.button`
  border: none;
  background-color: transparent;
  display: none;
  div {
    width: 1.2rem;
    background-color: black;
    height: 0.2rem;
    margin: 0.2rem 0;
  }
  @media (max-width: 450px) {
    display: block;
  }
`;
const TogglerBtnCross = styled.button``;
const MobLinksBox = styled.div`
  animation: fadeInLeft;
  animation-duration: 0.2s;
`;
const Navbar = () => {
  const togglerHandler = () => {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.toggle("hidden");
    mobileNav.classList.toggle("activeNav");
  };
  return (
    <Nav>
      <NavbarBox>
        <LogoBox>
          <LogoImg src={logo} />
        </LogoBox>
        <PcTabLinksBox>
          <NavLink to="/">Home</NavLink>

          <NavLink to="/">Profile</NavLink>
          <NavLink to="/">Login</NavLink>
        </PcTabLinksBox>
        <TogglerBtn id="lineBtn" onClick={togglerHandler}>
          <div></div>
          <div></div>
          <div></div>
        </TogglerBtn>
      </NavbarBox>
      <MobLinksBox className="hidden" id="mobileNav">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/">Profile</NavLink>
        <NavLink to="/">Login</NavLink>
      </MobLinksBox>
    </Nav>
  );
};

export default Navbar;
