import React from "react";
import styles from "./customButton.module.css";

const CustomButton = ({ label, onClick, disabled = false, style }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
      style={style}
    >
      {label}
    </button>
  );
};

export default CustomButton;
