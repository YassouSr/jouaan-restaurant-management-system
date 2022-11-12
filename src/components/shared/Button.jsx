import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate()

  return (
    <button
      className={props.className}
      style={{
        color: `${props.color}`,
        backgroundColor: `${props.bgColor}`,
        padding: "8px 16px",
        border: "none",
        borderRadius: "8px",
        width: "105px",
        cursor: "pointer",
        fontWeight: isHovering ? "bold" : "normal",
      }}
      onClick={() => {navigate(props.to)}}
      onMouseEnter={() => {setIsHovering(true)}}
      onMouseLeave={() => {setIsHovering(false)}}
    >
      {props.text}
    </button>
  );
};

export default Button;
