import React from "react";

const SubmitButton = ({ text }) => (
  <div className="d-flex justify-content-center mt-4">
    <button type="submit" className="btn btn-danger px-4 py-2 fs-5">
      {text}
    </button>
  </div>
);

export default SubmitButton;
