import React from "react";
import { readCard, updateCard } from "../utils/api";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard({ deck, fetchDeck }) {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [card, setCard] = useState();

  function fetchCard() {
    readCard(cardId).then(data => setCard(data));
  }

  useEffect(fetchCard, [cardId]);

  const onSubmit = (editedCard) => {
    updateCard(editedCard)
      .then(fetchDeck)
      .then(() => navigate.push(`/decks/${deck.id}`));
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit card {cardId}</li>
        </ol>
      </nav>
      {card && card.id && (
        <CardForm
          deck={deck}
          onSubmit={onSubmit}
          submitButtonText="Submit"
          cancelButtonText="Cancel"
          formData={card}
          setFormData={setCard}
        />
      )}
    </div>
  );
}

export default EditCard;