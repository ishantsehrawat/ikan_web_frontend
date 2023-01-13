import React from "react";

function OverlayBackground({ Overlay, setBackButton }) {
  return (
    <button
      className={
        Overlay
          ? "w-full h-full bg-black opacity-20 z-10 top-0 left-0 fixed"
          : "hidden"
      }
      onClick={() => setBackButton(false)}
    ></button>
  );
}

export default OverlayBackground;
