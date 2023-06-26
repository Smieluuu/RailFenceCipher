import React, { useState } from "react";
import CopyOnClickProps from "../../../interfaces";

const CopyOnClick: React.FC<CopyOnClickProps> = ({ messageToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(messageToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div>
      <button className="text-base" onClick={handleCopyClick}>
        {copied ? "Skopiowano!" : messageToCopy}
      </button>
    </div>
  );
};

export default CopyOnClick;
