import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const BreadcrumbWrapper = ({ activeItem }) => {
  const { deckId, cardId } = useParams();

  return <Breadcrumb deckId={deckId} cardId={cardId} activeItem={activeItem} />;
};

export default BreadcrumbWrapper;
