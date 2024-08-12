import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import {useParams, Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Study(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({cards:[]})
    function fetchDeck() {
        readDeck(deckId).then(data => setDeck(data));
      }
      useEffect(fetchDeck, []);

    const [cardText, setCardText]= useState("");
    const [cardIndex, setCardIndex] = useState(0);    
    const [isBack, setIsBack] = useState(false);
    
    const cardList = deck.cards;
    
    const navigate = useNavigate();      
    
    const clickHandler=()=> {
        if((cardIndex+1) ===cardList.length){
          if  (window.confirm("Restart cards?\nClick 'cancel' to return to the home page.")){
            setIsBack(!isBack)
            setCardIndex(0); 
          }
          else{
            navigate.push("/")
          }
        }
        else{
        setIsBack(!isBack)
        setCardIndex(cardIndex + 1)
        }}



    return (
    <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>  
        <h1>Study: {deck.name}</h1>
        { cardList.length>2 ? 
       ( <div className="card"> 
            <div className="card-body">
                <h4 className="card-title">Card {cardIndex +1} of {cardList.length}</h4>
                <p className="card-text">
                {deck.id && (isBack ? deck.cards[cardIndex].back : deck.cards[cardIndex].front)}
                </p>
                <button className="btn btn-primary mx-2" onClick={()=> setIsBack(!isBack)}>Flip</button>
                {isBack && <button className="btn btn-secondary" onClick={clickHandler}>Next</button>}
            </div>
        </div>)
: 
    (<div>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
        <Link to= {`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
    </div>)}
    </div>
    )
}

export default Study;