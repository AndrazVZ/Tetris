import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";
import { Link } from "react-router-dom";

const GameOverModal = ({ onClose,score }) => {

    return (
        <>
            <div className="overlay" onClick={onClose}></div> {}
            <div className="modal">
                <h2>Game Over!</h2>
                <p>Your score :<b>{score}</b></p>
                <div className="game-over-button-container">
                    <Link to="/"><button>Home</button></Link>
                    <button onClick={()=>{window.location.reload();}}>Play Again</button>
                </div>
                <span id='small_message'>*Your highest score will automatically be saved*</span>
            </div>
        </>
    );
};

export default GameOverModal;
