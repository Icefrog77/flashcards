import React from "react";
import { useState, useEffect } from "react";
import { deleteDeck, readDeck } from "../utils/api";
import { useParams, Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CardDisplay from "../Cards/CardDisplay"
import NewCard from "../Cards/NewCard";
import EditCard from "../Cards/EditCard";

function DeckScreen(){
    const navigate = useNavigate();
    const location = useLocation();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({cards:[]})

    function fetchDeck() {
        readDeck(deckId).then(data => setDeck(data));
    }

    useEffect(fetchDeck, [deckId]);

    const cardList = deck.id ? deck.cards : [];

    const deckDeleteHandler = () => {
        if(window.confirm("Delete this deck?\n You will not be able to recover it")){
            deleteDeck(deck.id)
            .then(() => navigate("/"))
        }
    }

    if(!deck.id) return "Loading...";

    return (
    <div>
        <Routes> 
            <Route path="" element={
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>                
                        </ol>
                    </nav>
                    <div className="mb-4">
                        <h3>{deck.name}</h3>
                        <p>{deck.description}</p>
                        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mx-2">Edit</Link>
                        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-2">Add Cards</Link>
                        <button className="btn btn-danger mr-4 float-right" onClick={deckDeleteHandler}>Delete</button>
                    </div>
                    {cardList.map((card) => <CardDisplay key={card.id} card={card} deck={deck} fetchDeck={fetchDeck}/>)}
                </div>
            } />
            <Route path="cards/new" element={<NewCard deck={deck} fetchDeck={fetchDeck} />} />
            <Route path="cards/:cardId/edit" element={<EditCard deck={deck} fetchDeck={fetchDeck}/>} />
        </Routes>
    </div>
    );
}

export default DeckScreen;
