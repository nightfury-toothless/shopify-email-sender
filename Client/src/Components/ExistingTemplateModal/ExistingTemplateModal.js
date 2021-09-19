import React, { useState } from "react";
import "./ExistingTemplateModal.css";

const ExistingTemplateModal = ({
  templates,
  emailEditorRef,
  setCloseModal,
}) => {
  const [template, setTemplate] = useState();

  const loadTemplate = () => {
    if (template) {
      emailEditorRef.current.editor.loadDesign(JSON.parse(template));
      setCloseModal();
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <select
          name="selectTemplates"
          className="modal-select"
          value={template}
          onChange={(e) => {
            setTemplate(e.target.value);
          }}
        >
          <option value="">Select a template</option>
          {templates.map((temp, i) => {
            return (
              <option value={JSON.stringify(temp.templateJson)} key={i}>
                {temp.templateName}
              </option>
            );
          })}
        </select>
        {template && <button onClick={loadTemplate}>Load</button>}
        <button onClick={setCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default ExistingTemplateModal;
