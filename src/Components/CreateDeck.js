import React, { Fragment, useState } from "react";
import DeckForm from "./DeckForm";
import BreadcrumbWrapper from "./BreadcrumbWrapper";

const CreateDeck = ({ handleNewDeck }) => {
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewDeck(formData);
  };

  return (
    <Fragment>
      <BreadcrumbWrapper activeItem="Create Deck" />
      <h2>Create Deck</h2>
      <DeckForm
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        formData={formData}
      />
    </Fragment>
  );
};

export default CreateDeck;
