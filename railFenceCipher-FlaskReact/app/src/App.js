import React, { useState, useEffect } from "react";
import FormEnc from "./components/formEnc/FormEnc";
import FromDec from "./components/formDec/FormDec";

const App = () => {
  return (
    <div>
      <FormEnc />
      <FromDec />
    </div>
  );
};

export default App;
