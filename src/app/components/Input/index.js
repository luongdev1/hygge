import { useState } from "react";
import styles from "./input.module.css";
import { NAME_TK, NAME_TND, NAME_EMAIL, NAME_MK, NAME_DC, NAME_SDT } from "@/app/lib/constants";

const Input = (props) => {
  const { label, value, name, errorMessage, onChange, width, ...inputProps } = props;
  const [showError, setShowError] = useState();

  function validateInput(name, value) {
    switch (name) {
      case NAME_TK: {
        const re = /^[a-z0-9]{3,16}$/;
        return re.test(value).toString();
      }
      case NAME_TND: {
        const re1 = /^[a-zA-Z0-9\sÀ-ỹ]{8,50}$/;
        return re1.test(value).toString();
      }
      case NAME_EMAIL: {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value).toString();
      }
      case NAME_MK: {
        const re1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;
        return re1.test(value).toString();
      }
      case NAME_DC: {
        const re = /\S/;
        return re.test(value).toString();
      }
      case NAME_SDT: {
        const re1 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re1.test(value).toString();
      }
      case "": {
        return value === "" ? "false" : "true";
      }
    }
  }

  validateInput(name, value);
  return (
    <div className={`${styles.formInput} flex flex-col flex-grow ${width}`}>
      <label htmlFor="email">{label}</label>
      <input
        name={name}
        value={value}
        className="outline-main-100 border-2 border-gray-200 py-3 px-4  rounded-full text-xl"
        onChange={onChange}
        onBlur={() => setShowError(true)}
        show={showError ? validateInput(name, value) : false}
        {...inputProps}
      />
      <span className="text-red-500">{errorMessage}</span>
    </div>
  );
};

export default Input;
