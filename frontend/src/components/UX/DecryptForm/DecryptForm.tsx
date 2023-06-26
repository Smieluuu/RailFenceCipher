import React, { useState, FormEvent } from "react";
import requestToApi from "../.././axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CopyOnClick from "../../Functional/CopyOnClick/CopyOnClick";

const DecryptForm: React.FC = () => {
  const [ciphertext, setCiphertext] = useState("");
  const [key, setKey] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const decryptMessage = async () => {
      try {
        const response = await requestToApi.post("decrypt", {
          message: ciphertext,
          height: key,
        });
        setDecryptedMessage(response.data.decrypted_message);
      } catch (error) {
        console.log(error);
      }
    };
    decryptMessage();
  };

  return (
    <div className="text-center mt-10">
      <h1 className="font-semibold text-lg mb-5">Odszyfruj tutaj!</h1>
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
          <h2 className="font-semibold text-base mt-[50px] mb-5">
            Odszyfrowana wiadomść:
          </h2>
          <Button variant="text">
            <CopyOnClick messageToCopy={decryptedMessage} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DecryptForm;
