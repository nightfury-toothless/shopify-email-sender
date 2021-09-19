import React, { useState, useRef, useEffect } from "react";
import "./SaveTemplateModal.css";
import { useParams } from "react-router-dom";
import { updateTemplate, fetchUser } from "../../helpers/apicalls";

const SaveTemplateModal = ({ emailEditorRef, setCloseModal, setToast }) => {
  const [templateName, setTemplateName] = useState("");

  const { store } = useParams();
  const inputRef = useRef();

  const saveTemplate = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      const template = {
        templateName: templateName,
        templateJson: design,
      };
      updateTemplate(store, template);
      fetchUser(store);
      setTemplateName("");
      setCloseModal();
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <input
          ref={inputRef}
          className="modal-input"
          type="text"
          placeholder="Enter template name"
          required
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        {templateName && <button onClick={saveTemplate}>Save</button>}
        <button onClick={setCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default SaveTemplateModal;
