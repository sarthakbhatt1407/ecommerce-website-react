import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const userLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                A website that allows people to buy and sell physical goods,
                services, and digital products over the internet rather than at
                a brick-and-mortar location. Through an e-commerce website, a
                business can process orders, accept payments, manage shipping
                and logistics, and provide customer service.
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <Link to={`/products/smartphone`}>Smartphone</Link>
                </li>
                <li>
                  <Link to={`/products/laptop`}>Laptop</Link>
                </li>
                <li>
                  <Link to={`/products/headphone`}>Headphone</Link>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              {userLoggedIn && (
                <ul className="footer-links">
                  <li>
                    <Link to={`/profile`}>My Profile</Link>
                  </li>
                  <li>
                    <Link to={`/profile/orders`}>My Orders</Link>
                  </li>
                  <li>
                    <Link to={`/profile/address`}>My Address</Link>
                  </li>
                  <li>
                    <Link to={`/profile/security`}>Reset Password</Link>
                  </li>
                </ul>
              )}
              {!userLoggedIn && (
                <ul className="footer-links">
                  <li>
                    <Link to={`/login`}>Login</Link>
                  </li>
                  <li>
                    <Link to={`/register`}>Register Now</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2022 All Rights Reserved by
                <a href="#"> Sarthak Bhatt</a>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="#">
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <Twitter />
                  </a>
                </li>
                <li>
                  <a className="dribbble" href="#">
                    <Instagram />
                  </a>
                </li>
                <li>
                  <a className="linkedin" href="#">
                    <LinkedIn />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
