import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { listDecks, createDeck, deleteDeck } from "../utils/api";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import EditDeck from "../Components/EditDeck";
import Deck from "../Components/Deck";
import AddCard from "../Components/AddCard";
import EditCard from "../Components/EditCard";
import StudyScreen from "../Components/Study";

const Layout = () => {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  const handleNewDeck = (newDeck) => {
    const abortController = new AbortController();
    createDeck(newDeck, abortController.signal)
      .then(() => {
        console.log("newDeck", newDeck);
        setDecks((currentDecks) => [
          ...currentDecks,
          { ...newDeck, id: decks.length + 1 },
        ]);
        navigate("/");
      })
      .catch((err) => console.error(err));
    return () => abortController.abort();
  };

  const handleDeckDelete = (indexToDelete) => {
    const abortController = new AbortController();
    deleteDeck(indexToDelete, abortController.signal)
      .then(() => {
        setDecks((currentDecks) =>
          currentDecks.filter((deck) => deck.id !== indexToDelete)
        );
        navigate("/");
      })
      .catch((err) => console.error(err));
    return () => abortController.abort();
  };

  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(console.error);
    return () => abortController.abort();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home decks={decks} handleDeckDelete={handleDeckDelete} />}
          />
          <Route
            path="/decks/new"
            element={<CreateDeck handleNewDeck={handleNewDeck} />}
          />
          <Route
            path="/decks/:deckId"
            element={<Deck handleDeckDelete={handleDeckDelete} />}
          />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCard />}
          />
          <Route path="/decks/:deckId/study" element={<StudyScreen />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default Layout;
