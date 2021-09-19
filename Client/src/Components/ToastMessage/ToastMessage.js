import React from "react";
import "./ToastMessage.css";
const ToastMessage = ({ toast }) => {
  if (toast) {
    return (
      <div className="modal-wrapper">
        <div className="toast-modal">
          <p>Template Saved!</p>
        </div>
      </div>
    );
  } else return null;
};

export default ToastMessage;
