import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CardForm({formData, setFormData, onSubmit, submitButtonText, cancelButtonText, deck}){
    const navigate = useNavigate();
    
    // tracks the input for when the submit occurs
    function handleInput(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        onSubmit(formData)
        
        }

    return (
    <div class="w-100">
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="front">
                Front
            </label>
            <textarea 
                id="front" 
                className="form-control" 
                name="front" 
                rows={5} 
                onChange={handleInput}
                value={formData.front}
                placeholder="Front side of card" /> 
            </div>
            <div className="form-group">
            <label htmlFor="back">
                Back
            </label>
            <textarea 
                id="back" 
                className="form-control" 
                name="back" 
                rows={5} 
                onChange={handleInput}
                value={formData.back}
                placeholder="Back side of card" />            
            </div>
            {/* the cancel button always sends you back to the deckScreen */}
            <button type="button" className="btn btn-secondary mr-3" onClick={()=>navigate.push(`/decks/${deck.id}`)}>{cancelButtonText}</button>
            {/* submit will be handled by EditCard or NewCard */}
            <button type="submit" className="btn btn-primary" >{submitButtonText}</button>           
        </form>
    </div>)
}

export default CardForm;
