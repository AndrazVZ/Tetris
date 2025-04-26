import React, { useState } from "react";
import "./Header.css";

const Header = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const toggleSettings = () => {
        setShowSettings(prev => {
            const newState = !prev;
            if (newState) {
                document.body.style.overflow = "hidden"; // disable scroll
            } else {
                document.body.style.overflow = "auto"; // re-enable scroll
            }
            return newState;
        });
    };

    const toggleProfile = () => {
        setShowProfile(prev => {
            const newState = !prev;
            if (newState) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            return newState;
        });
    };

    return (
        <>
            <div className="header">
                <div className="icon-button">&#8592;</div>

                <h1 className="header-title">TETRIS</h1>

                <div className="icon-button" onClick={toggleProfile}>
                    &#128100;
                </div>

                <div className="icon-button" onClick={toggleSettings}>
                    &#9881;
                    <i className="fa-solid fa-gear"></i>
                </div>

            </div>

            {showSettings && (
                <>
                    <div className="overlay" onClick={toggleSettings}></div> {/* New overlay */}
                    <div className="settings-modal">
                        <h2>SETTINGS</h2>
                        <div className="volume-control">
                            <span role="img" aria-label="volume">🔈</span>
                            <input type="range" min="0" max="100" />
                        </div>

                        <div className="control-keys">
                            <div><span>Hold</span> <span>⬆️</span></div>
                            <div><span>Down</span> <span>⬇️</span></div>
                            <div><span>Left</span> <span>⬅️</span></div>
                            <div><span>Right</span> <span>➡️</span></div>
                        </div>

                        <button className="save-button" onClick={toggleSettings}>Save</button>
                    </div>
                </>
            )}

            {showProfile && (
                <>
                    <div className="overlay" onClick={toggleProfile}></div>
                    <div className="profile-modal">
                        <img
                            src="https://volleybox.net/media/upload/players/17196706037q9hv.png"
                            alt="Profile"
                            className="profile-picture"
                        />
                        <h2 className="profile-name">Username123</h2>
                        <button className="save-button" onClick={toggleProfile}>Close</button>
                    </div>
                </>
            )}

        </>
    );
};

export default Header;
