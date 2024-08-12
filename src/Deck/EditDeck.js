import React from "react";
import { updateDeck, readDeck } from "../utils/api";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DeckForm from "./DeckForm";

function EditDeck(){
// pulls deck ID from params and uses it for the deck being edited
    const {deckId} = useParams();
    const [deck, setDeck] = useState({cards:[]})
    function fetchDeck() {
        readDeck(deckId).then(data => setDeck(data));
      }
      useEffect(fetchDeck, []);

    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        {/* first checks that the deck is loaded then sends the update call
        and the correct submit text with the formData filled out with the deck info */}
        {deck.id &&
        <DeckForm 
            onSubmit={updateDeck}
            submitButtonText="Save"
            initialFormData={deck}/>
        }
    </div>
    )
}

export default EditDeck;