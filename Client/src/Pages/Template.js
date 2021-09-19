import React, { useRef, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import EmailEditor from "react-email-editor";
import { fetchUser } from "../helpers/apicalls";
import { newTemplate } from "../constants";
import ExistingTemplateModal from "../Components/ExistingTemplateModal/ExistingTemplateModal";
import SaveTemplateModal from "../Components/SaveTemplateModal/SaveTemplateModal";
import ToastMessage from "../Components/ToastMessage/ToastMessage";

const Template = () => {
  const shopifyUser = JSON.parse(localStorage.getItem("shopify-user"));
  const { store } = useParams();
  const [templates, setTemplates] = useState();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [toast, setToast] = useState(false);
  const emailEditorRef = useRef(null);

  const createTemplate = () => {
    emailEditorRef.current.editor.loadDesign(newTemplate);
  };

  const getTemplates = () => {
    fetchUser(store).then((data) => {
      setTemplates(data[0].templates);
    });
  };

  useEffect(() => {
    if (store === shopifyUser?.store.split(".")[0] || shopifyUser === null) {
      fetchUser(store);
      getTemplates();
    }
  }, [showTemplates]);

  if (shopifyUser?.store.split(".")[0] !== store && shopifyUser) {
    return <Redirect to={`${shopifyUser?.store.split(".")[0]}`} />;
  }

  return (
    <div className="emaileditor-wrapper">
      <EmailEditor
        style={{ height: "calc(100vh - 100px)" }}
        ref={emailEditorRef}
      />
      <div className="emaileditor-button-wrapper">
        <button onClick={createTemplate}>Create New Template</button>
        <button
          onClick={() => {
            setShowTemplates(!showTemplates);
          }}
        >
          Edit Existing Templates
        </button>
        <button
          onClick={() => {
            setShowSaveModal(!showSaveModal);
          }}
        >
          Save Template
        </button>
      </div>
      {showTemplates && (
        <ExistingTemplateModal
          templates={templates}
          emailEditorRef={emailEditorRef}
          setCloseModal={() => {
            setShowTemplates(!showTemplates);
          }}
        />
      )}
      {showSaveModal && (
        <SaveTemplateModal
          emailEditorRef={emailEditorRef}
          setCloseModal={() => {
            setShowSaveModal(!showSaveModal);
          }}
          setToast={setToast}
        />
      )}
      {toast && <ToastMessage toast={toast} />}
    </div>
  );
};

export default Template;
