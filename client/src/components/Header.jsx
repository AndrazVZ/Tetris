import React, { useState } from "react";
import "./Header.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import axios from "axios";


const Header = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [user, setUser] = useState(null);

    const toggleSettings = () => {
        setShowSettings(prev => {
            const newState = !prev;
            if (newState) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
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

    const handleLoginSuccess = (userInfo) => {
        setUser(userInfo);
        setShowLogin(false);
    };

    const handleLogout = () => {
        setUser(null);
        setShowProfile(false);
    };

    const handleChangePicture = async () => {
        if (!user || !user._id) {
            console.error("User ID is missing, cannot update profile picture.");
            alert("You're not properly logged in.");
            return;
        }

        const newUrl = prompt("Enter new profile picture URL:");
        if (!newUrl) return;

        try {
            console.log("Sending update to:", `http://localhost:3000/api/users/update-profile-picture/${user._id}`);

            const res = await axios.put(`http://localhost:3000/api/users/update-profile-picture/${user._id}`, {
                profilePicture: newUrl,
            });

            console.log("Updated user:", res.data);
            setUser(res.data); // update local user state with new profile picture
        } catch (error) {
            console.error("Error updating profile picture:", error);
            alert("Failed to update profile picture.");
        }
    };


    return (
        <>
            <div className="header">
                <div className="icon-button">&#8592;</div>

                <h1 className="header-title">TETRIS</h1>

                {user ? (
                    <img
                        src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="Profile"
                        className="header-profile-pic"
                        onClick={toggleProfile}
                    />
                ) : (
                    <div className="icon-button" onClick={toggleProfile}>
                        &#128100;
                    </div>
                )}

                <div className="icon-button" onClick={toggleSettings}>
                    &#9881;
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <>
                    <div className="overlay" onClick={toggleSettings}></div>
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

            {/* Profile Modal */}
            {showProfile && (
                <>
                    <div className="overlay" onClick={toggleProfile}></div>
                    <div className="profile-modal">
                        {user ? (
                            <>
                                <img
                                    src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt="Profile"
                                    className="profile-picture"
                                    onClick={handleChangePicture}
                                    style={{ cursor: "pointer" }}
                                />

                                <h2 className="profile-name">{user.name}</h2>
                                <button className="save-button" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <h2>Welcome!</h2>
                                <button className="save-button" onClick={() => { setShowLogin(true); setShowProfile(false); }}>
                                    Login
                                </button>
                                <br></br>
                                <button className="save-button" onClick={() => { setShowRegister(true); setShowProfile(false); }}>
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}

            {/* Login Modal */}
            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {/* Register Modal */}
            {showRegister && (
                <RegisterModal
                    onClose={() => setShowRegister(false)}
                />
            )}
        </>
    );
};

export default Header;
