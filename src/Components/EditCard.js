import { useNavigate, useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import BreadcrumbWrapper from "./BreadcrumbWrapper";

/* EditCard component to edit existing card */
const EditCard = () => {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({ front: "", back: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(formData, abortController.signal)
      .then((response) => {
        console.log(response);
        navigate(`/decks/${deckId}`);
      })
      .catch(console.error);
    return () => abortController.abort();
  };

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then(setFormData)
      .catch(console.log);
    return () => abortController.abort();
  }, [cardId]);

  return (
    <Fragment>
      <BreadcrumbWrapper activeItem={`Edit Card ` + cardId} />
      <h2>Edit Card</h2>
      <CardForm
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        formData={formData}
      />
    </Fragment>
  );
};

export default EditCard;
