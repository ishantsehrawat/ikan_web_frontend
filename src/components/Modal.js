import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "15px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ open, children, onClose, modalName }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div
        style={MODAL_STYLES}
        className="rounded-lg flex flex-col items-center"
      >
        {children}
        {modalName === "date" ? (
          <></>
        ) : (
          <button
            onClick={onClose}
            className="bg-saffron text-white rounded-lg w-[270px] md:w-40 h-12 mt-4"
          >
            Submit
          </button>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}
