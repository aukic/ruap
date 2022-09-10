import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">{"Please enter image URL for face detection."}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <button
            className="w-20 bg-black white br3 grow hover-red"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
