import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";

const Breadcrumb = ({ deckId, cardId, activeItem }) => {
  const [deck, setDeck] = useState({ name: "" });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.error);
    return () => abortController.abort();
  }, [deckId]);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {activeItem !== deck.name && deckId && (
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
        )}

        <li className="breadcrumb-item active" aria-current="page">
          {activeItem}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
