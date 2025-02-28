import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("man");

  // const test = async () => {
  //   await fetch("http://localhost:3000/api/test", { credentials: "include" });
  // };

  return (
    <>
      <div className="homepage">
        <img src="/orbital.png" alt="" className="orbital" />
        <div className="left">
          <h1>Echo ai</h1>
          <h2>Supercharge your Creativity and Productivity.</h2>
          <h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            saepe sequi repudiandae. Repellat iste, quo nisi itaque quibusdam,
            laboriosam nulla autem voluptatem iusto voluptatibus impedit.
          </h3>
          <Link to="/dashboard">Get Started</Link>
          {/* <button onClick={test}>Test Backend auth </button> */}
        </div>
        <div className="right">
          <div className="imgContainer">
            <div className="bgContainer">
              <div className="bg"></div>
            </div>
            <img src="/bot.png" alt="" className="bot" />
            <div className="chat">
              <img
                src={
                  typingStatus === "man"
                    ? "/man.jpeg"
                    : typingStatus === "woman"
                    ? "/woman.jpeg"
                    : "/bot.png"
                }
                alt=""
                className="bot"
              />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Man : I'm having Anxiety",
                  2000,
                  () => {
                    setTypingStatus("bot");
                  },
                  "Echo : Sucks to be you",
                  2000,
                  () => {
                    setTypingStatus("woman");
                  },
                  "Woman : Am I really That Fat?",
                  2000,
                  () => {
                    setTypingStatus("bot");
                  },
                  "Echo : Yes, You are",
                  2000,
                  () => {
                    setTypingStatus("man");
                  },
                ]}
                wrapper="span"
                omitDeletionAnimation={true}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
        <div className="terms">
          <img src="/echo.webp" alt="" />
          <div className="links">
            <Link to="/">Terms of Service</Link>
            <span>|</span>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
