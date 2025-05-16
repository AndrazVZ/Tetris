import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const GameOverModal = ({ onClose }) => {

    return (
        <>
            <div className="overlay" onClick={onClose}></div> {}
            <div className="modal">
                
            </div>
        </>
    );
};

export default GameOverModal;
