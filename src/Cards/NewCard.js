import React from "react";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function NewCard({deck, fetchDeck}){
    const [formData, setFormData]=useState({
        front: '',
        back: '',
        })

    const onSubmit=(newCard)=>{
        console.log(newCard);
        createCard(deck.id, newCard)
        .then((result)=>setFormData({
            front: '',
            back: '',
            }))
        .then(fetchDeck)}
    

    return(
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav> 
        <CardForm 
            deck={deck}
            onSubmit={onSubmit}
            submitButtonText="Save"
            cancelButtonText="Done"
            formData={formData}
            setFormData={setFormData}/>
    </div>
    )}

export default NewCard;