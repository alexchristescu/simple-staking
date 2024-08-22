"use client";

import React, { useState } from "react";
import "./BackgroundDot.css";

const BackgroundDot: React.FC = () => {
  const [dots] = useState([
    { top: "5%", left: "5%" },
    { top: "54%", left: "33%" },
    { top: "3%", left: "80%" },
    { top: "33%", left: "66%" },
    { top: "85%", left: "5%" },
    { top: "44%", left: "13%" },
    { top: "12%", left: "34%" },
    { top: "70%", left: "80%" },
    { top: "20%", left: "15%" },
    { top: "40%", left: "50%" },
    { top: "10%", left: "90%" },
    { top: "75%", left: "50%" },
    { top: "65%", left: "20%" },
    { top: "25%", left: "75%" },
    { top: "80%", left: "90%" },
    { top: "15%", left: "60%" },
  ]);

  return (
    <div>
      {dots.map((dot, index) => (
        <div
          key={`${index}_dot`}
          className="dot-style absolute"
          style={{ top: dot.top, left: dot.left }}
        ></div>
      ))}
    </div>
  );
};

export default BackgroundDot;
