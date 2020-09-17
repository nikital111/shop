/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div id="kletka">
        <div className="f-links">
          <h3>Resourses:</h3>
          <ul>
            <li>
              <a href="#">product</a>
            </li>
            <li>
              <a href="#">product</a>
            </li>
            <li>
              <a href="#">product</a>
            </li>
            <li>
              <a href="#">product</a>
            </li>
            <li>
              <a href="#">product</a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="form-subscribe">
          <h3>Join us:</h3>
          <input placeholder="enter name" type="text" />
          <input placeholder="enter email" type="email" />
          <button>Subscribe</button>
        </div>
        <hr />
        <div id="div-icon">
          <h2 id="h-icon">Follow us:</h2>
          <ul>
            <li>
              <a href="#">
                <img
                  src={require("../../../image/instagram-icon.png")}
                  alt="instagram"
                  className="icon"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src={require("../../../image/facebook-icon.png")}
                  alt="facebook"
                  className="icon"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src={require("../../../image/youtube-icon.png")}
                  alt="youtube"
                  className="icon"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src={require("../../../image/twitter-icon.png")}
                  alt="twitter"
                  className="icon"
                />
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div id="d-info">
          <ul>
            <li>Днепр, №12. Харьковское шоссе</li>
            <li>+380950111010</li>
            <li>email@email.com</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
