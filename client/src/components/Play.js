import React from "react";
import "./Play.css";


const Play = ()=>{
    return(
        <div className="container col">
            <header className="game-page-header">
                <div className="left"><i className="fa-solid fa-arrow-left"></i></div>
                <div><h2>TETRIS</h2></div>
                <div className="right"><i className="fa-solid fa-gear"></i></div>
            </header>

            <div className="game-container">
                <div className="board"> 
                    {Array.from({ length: 200 }).map((_, i) => (
                        <div key={i} className="board-cell" />
                    ))}
                </div>
                <div className="sidebar">
                    <div className="next-block-container">
                        <p>Next</p>
                    </div>
                    <div className="hold-block-container">
                        <p>Hold</p>
                    </div>
                    <div className="score-container">
                        <p>Score</p>
                        <h2>0</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default Play;