import React from "react";

function OverlayBackground({ Overlay, setBackButton }) {
  return (
    <button
      className={
        Overlay
          ? "w-screen h-screen bg-black opacity-20 absolute z-10 top-0 left-0"
          : "hidden"
      }
      onClick={() => setBackButton(false)}
    ></button>
  );
}

export default OverlayBackground;
