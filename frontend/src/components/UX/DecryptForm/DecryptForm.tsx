import React, { useState, FormEvent } from "react";
import requestToApi from "../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface EncryptResponse {
  encrypted_message: string;
}

const DecryptForm: React.FC = () => {
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const DecryptMessage = async () => {
      const response = await requestToApi.post<EncryptResponse>("/decrypt", {
        ciphertext,
        key,
      });
      setDecryptedMessage(response.data.encrypted_message);
    };
    DecryptMessage();
  };

  return (
    <div className="text-center mt-10">
      <h1 className="font-semibold text-lg mb-5">Decrypt Here!</h1>
      <form
        className="flex flex-col justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="ciphertext"
            label="Ciphertext"
            variant="outlined"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
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
            Odszyfruj
          </Button>
        </div>
      </form>
      {decryptedMessage && (
        <div className="mt-5">
          <h2>Decrypted Message:</h2>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DecryptForm;
