import React from "react";
import "./Home.css";
import Header from './Header';
import { Link } from "react-router-dom";

let width = window.innerWidth;

const tetrisShapes = [
    // T-shape
    [[1, 0], [0, 1], [1, 1], [2, 1]],
    // L-shape
    [[0, 0], [0, 1], [0, 2], [1, 2]],
    // Z-shape
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    // Square
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    // Line
    [[0, 0], [0, 1], [0, 2], [0, 3]]
];


const generateBlocks = () => {
    const blocks = [];
    const colors=[
        "03A9F4",
        "FFFF33",
        "9C27B0",
        "F44336",
        "3F51B5",
        "FFC107",
        "4CAF50"
    ];

    let number_of_blocks;
    if(width < 500){
        number_of_blocks = 5;
    }else if(width < 1000 && width > 500){
        number_of_blocks = 15;
    }else{
        number_of_blocks = 20;
    }

    console.log("Current number of blocks:" + number_of_blocks);
    for (let i = 0; i < number_of_blocks; i++) {
        const shape = tetrisShapes[Math.floor(Math.random() * tetrisShapes.length)];
        const left = Math.random() * 100; // percentage
        const delay = Math.random() * 10; // seconds
        const duration = 3 + Math.random() * 5; // seconds
        const picked_color = Math.floor(Math.random() * colors.length);
        

        blocks.push(
            <div
                key={i}
                className="tetris-shape"
                style={{
                    left: `${left}vw`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`
                    
                }}
            >
                {shape.map(([x, y], j) => (
                    <div
                        key={j}
                        className="cell"
                        style={{
                            left: `${x * 20}px`,
                            top: `${y * 20}px`,
                            backgroundColor: `#${colors[picked_color]}`
                        }}
                    />
                ))}
            </div>
        );
    }

    return blocks;
};

const Home = ()=>{
    return (
        <>
        <Header />
        <div className="container col">
            <div className="background">{generateBlocks()}</div>

            <div className="menu-container">
                <div className="menu-options-container">
                    <Link to="/play"><button>Play</button></Link>
                    <button>Leaderboard</button>
                    <button>Settings</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;
