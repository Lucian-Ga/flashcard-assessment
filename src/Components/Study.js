import { useNavigate, useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { AddCardButton } from "../Layout/Common";
import BreadcrumbWrapper from "./BreadcrumbWrapper";

const StudyScreen = () => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ cards: [] });
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(console.error);
    return () => abortController.abort();
  }, [deckId]);

  const handleNextButtonClick = () => {
    if (cardIndex + 1 === deck.cards.length) {
      const shouldRestart = window.confirm("Restart deck?");
      if (shouldRestart) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    } else {
      setCardIndex(cardIndex + 1);
      setIsFlipped(false);
    }
  };

  return (
    <section>
      <BreadcrumbWrapper activeItem="Study" />
      <h2>{deck.name}: Study</h2>
      {deck.cards.length < 3 ? (
        <Fragment>
          <h2>Not enough cards.</h2>
          <p>
            The minimum is 3 cards to study. There are {deck.cards.length} cards
            in this deck
          </p>
          <AddCardButton deckId={deckId} />
        </Fragment>
      ) : (
        <Fragment>
          <div style={{ border: "1px solid black", padding: "10px" }}>
            <h4>
              Card {cardIndex + 1} of {deck.cards.length}
            </h4>
            <Fragment>
              {isFlipped ? (
                <div>{deck.cards[cardIndex].back}</div>
              ) : (
                <div>{deck.cards[cardIndex].front}</div>
              )}
              <button
                className="btn-lg m-2"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                Flip
              </button>
              {isFlipped && (
                <button
                  className="btn-lg btn-primary"
                  onClick={handleNextButtonClick}
                >
                  Next
                </button>
              )}
            </Fragment>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default StudyScreen;
