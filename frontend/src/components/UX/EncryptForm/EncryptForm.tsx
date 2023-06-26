import React, { useState, FormEvent } from "react";
import requestToApi from "../.././axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CopyOnClick from "../../Functional/CopyOnClick/CopyOnClick";

const EecryptForm: React.FC = () => {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await requestToApi.post("encrypt", {
        message: plaintext,
        height: key,
      });
      setEncryptedMessage(response.data.encrypted_message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="font-semibold text-lg mb-5">Zaszyfruj tutaj!</h1>
      <form
        className="flex flex-col justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="plaintext"
            label="Plaintext"
            variant="outlined"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="key"
            label="Key"
            variant="outlined"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="text-center p-30">
          <Button className="text-center p-30" variant="outlined" type="submit">
            Zaszyfruj
          </Button>
        </div>
      </form>
      {encryptedMessage && (
        <div className="mt-5">
          <h2 className="font-semibold text-base mt-[50px] mb-5">
            Zaszyfrowana Wiadomość:
          </h2>
          <Button variant="text">
            <CopyOnClick messageToCopy={encryptedMessage} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EecryptForm;
