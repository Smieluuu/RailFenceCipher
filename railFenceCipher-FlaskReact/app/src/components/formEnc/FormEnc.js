import React, { useState } from "react";
import axios from "axios";

const FormEnc = () => {
  const [state, setState] = useState({
    message: "",
    height: 2,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmitEnc = (event) => {
    event.preventDefault();
    const { messageEnc, heightEnc } = state;

    axios
      .post("/api/send-encode-message", { messageEnc, heightEnc })
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
      <form onSubmit={handleSubmitEnc}>
        <label>
          Wiadomość:
          <input
            type="text"
            name="messageEnc"
            value={state.message}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Liczba:
          <select name="heightEnc" value={state.height} onChange={handleChange}>
            {options}
          </select>
        </label>
        <br />
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
};

export default FormEnc;
