import React, { useState, useEffect } from 'react';
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import DeckScreen from "../Deck/DeckScreen";
import Study from "../Study/Study";
import NewDeck from "../Deck/NewDeck";
import EditDeck from "../Deck/EditDeck";
import NewCard from "../Cards/NewCard";
import EditCard from "../Cards/EditCard";


function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/new" element={<NewDeck />} />          
          <Route path="/decks/:deckId/*" element={<DeckScreen />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
