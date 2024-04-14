import React, { useState } from "react";
import {
  Smiley,
  SmileyAngry,
  SmileyBlank,
  SmileyMeh,
  SmileyNervous,
  SmileySad,
} from "@phosphor-icons/react";

const SmileysContainer = () => {
  const [selectedSmiley, setSelectedSmiley] = useState<string | null>(null);

  const handleClick = (smiley: string) => {
    setSelectedSmiley(smiley === selectedSmiley ? null : smiley);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "300px",
        }}
      >
        <Smiley
          className="cursor-pointer"
          onClick={() => handleClick("smiley")}
          size={32}
          style={{ color: selectedSmiley === "smiley" ? "green" : "black" }}
        />

        <SmileyMeh
          className="cursor-pointer"
          onClick={() => handleClick("meh")}
          size={32}
          style={{ color: selectedSmiley === "meh" ? "blue" : "black" }}
        />

        <SmileySad
          className="cursor-pointer"
          onClick={() => handleClick("sad")}
          size={32}
          style={{ color: selectedSmiley === "sad" ? "red" : "black" }}
        />
        <SmileyBlank
          className="cursor-pointer"
          onClick={() => handleClick("blank")}
          size={32}
          style={{ color: selectedSmiley === "blank" ? "orange" : "black" }}
        />
      </div>
    </div>
  );
};

export default SmileysContainer;
