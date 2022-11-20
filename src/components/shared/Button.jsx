import React from "react";
import globalStyles from '../../styles/components/shared/button.module.css'

const Button = (props) => {

  const inlineStyles = {
    button: {
      color: `${props.color}`,
      backgroundColor: `${props.bgColor}`,
    },
    other: props.style
  }

  return (
    <button
      className={`${globalStyles.button} ${props.class}`}
      style={{...inlineStyles.button, ...inlineStyles.other}}
      onClick={props.onClick}
      type={props.type ? props.type : 'button'}
    >
      {props.text}
    </button>
  );
};

export default Button;
