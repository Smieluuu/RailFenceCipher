import React, { useState, FormEvent } from "react";
import requestToApi from "../../axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface EncryptResponse {
  encrypted_message: string;
}

const EncryptForm: React.FC = () => {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<EncryptResponse>(
        "http://127.0.0.1:5000/encrypt", // Update the URL to include the full endpoint
        {
          plaintext,
          key,
        },
        { withCredentials: true } // Add this option to enable sending credentials
      );

      setEncryptedMessage(response.data.encrypted_message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="font-semibold text-lg mb-5">Encrypt Here!</h1>
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
            Odszyfruj
          </Button>
        </div>
      </form>
      {encryptedMessage && (
        <div className="mt-5">
          <h2>Encrypted Message:</h2>
          <p>{encryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EncryptForm;
