import React from "react";
import "./Home.css";

const Home = ()=>{
    return (
        <div className="menu-container">
            <h1>Tetris</h1>
            <div className="menu-options-container">
                <button>Play</button>
                <button>Leaderboard</button>
                <button>Settings</button>
            </div>
        </div>
    );
};

export default Home;
