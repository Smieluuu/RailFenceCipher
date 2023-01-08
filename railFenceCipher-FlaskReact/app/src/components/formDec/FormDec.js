import React, { useState } from "react";
import axios from "axios";

const FormDec = () => {
  const [state, setState] = useState({
    message: "",
    height: 2,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmitDec = (event) => {
    event.preventDefault();
    const { messageDec, heightDec } = state;

    axios
      .post("/api/send-decode-message", { messageDec, heightDec })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const options = [];
  for (let i = 2; i <= 10; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmitDec}>
        <label>
          Wiadomość:
          <input
            type="text"
            name="messageDec"
            value={state.message}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Liczba:
          <select name="heightDec" value={state.height} onChange={handleChange}>
            {options}
          </select>
        </label>
        <br />
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default FormDec;
